import React, { useState, useEffect, useRef } from 'react';
import ExactTopHUD from './ExactTopHUD';
import SpinningGameBoard from './SpinningGameBoard';
import BettingControls from './BettingControls';
import GameResultModal from './GameResultModal';
import { toast } from '@/hooks/use-toast';

type GamePhase = 'betting' | 'spinning' | 'result';

const AutoSpinRouletteScreen = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('betting');
  const [timer, setTimer] = useState(50);
  const [balance, setBalance] = useState(10000);
  const [selectedChip, setSelectedChip] = useState(1000);
  const [selectedBets, setSelectedBets] = useState<Record<string, number>>({});
  const [winningFruit, setWinningFruit] = useState<string>('');
  const [lastWinAmount, setLastWinAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [gameHistory, setGameHistory] = useState<Array<{
    fruit: string;
    winAmount: number;
    isWin: boolean;
    timestamp: Date;
  }>>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Betting zones with multipliers
  const bettingZones = [
    { fruit: '🍊', multiplier: 38 },
    { fruit: '🍎', multiplier: 28 },
    { fruit: '🍇', multiplier: 18 },
    { fruit: '🍌', multiplier: 10 },
    { fruit: '🥝', multiplier: 5 }
  ];

  useEffect(() => {
    if (gamePhase === 'betting' && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (gamePhase === 'betting' && timer === 0) {
      // Start spinning phase
      setGamePhase('spinning');
      toast({
        title: "Spinning Started!",
        description: "Watch the fruits light up as the wheel spins!",
      });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gamePhase, timer]);

  const handleChipSelect = (value: number) => {
    if (gamePhase === 'betting' && value <= balance) {
      setSelectedChip(value);
      toast({
        title: "Chip Selected",
        description: `Selected $${value.toLocaleString()} chip`,
      });
    }
  };

  const handleFruitBet = (fruit: string) => {
    if (gamePhase !== 'betting' || selectedChip > balance) return;

    const newBets = { ...selectedBets };
    newBets[fruit] = (newBets[fruit] || 0) + selectedChip;
    
    setSelectedBets(newBets);
    setBalance(prev => prev - selectedChip);
    
    toast({
      title: "Bet Placed!",
      description: `$${selectedChip.toLocaleString()} on ${fruit}`,
    });
  };

  const calculateTotalBets = () => {
    return Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0);
  };

  const handleSpinComplete = (result: string) => {
    setWinningFruit(result);
    
    // Calculate winnings
    let totalWin = 0;
    const betOnWinningFruit = selectedBets[result] || 0;
    
    if (betOnWinningFruit > 0) {
      const zone = bettingZones.find(z => z.fruit === result);
      if (zone) {
        totalWin = betOnWinningFruit * zone.multiplier;
        setBalance(prev => prev + totalWin);
      }
    }
    
    setLastWinAmount(totalWin);
    setGamePhase('result');
    setShowResultModal(true);
    
    // Add to game history
    const newHistoryEntry = {
      fruit: result,
      winAmount: totalWin,
      isWin: totalWin > 0,
      timestamp: new Date()
    };
    setGameHistory(prev => [newHistoryEntry, ...prev.slice(0, 9)]); // Keep last 10 games
    
    // Show appropriate toast
    if (totalWin > 0) {
      toast({
        title: "🎉 YOU WIN! 🎉",
        description: `Won $${totalWin.toLocaleString()} with ${result}!`,
      });
    } else {
      toast({
        title: "Better luck next time!",
        description: `${result} was the winner. Try again!`,
      });
    }
  };

  const handleNewGame = () => {
    if (balance < 10) {
      // Game over - restart with initial balance
      setBalance(10000);
      toast({
        title: "Game Reset",
        description: "Starting fresh with $10,000!",
      });
    }
    
    setGamePhase('betting');
    setTimer(50);
    setSelectedBets({});
    setWinningFruit('');
    setLastWinAmount(0);
    setShowResultModal(false);
    
    toast({
      title: "New Game Started!",
      description: "Place your bets - 50 seconds remaining!",
    });
  };

  const handleManualSpin = () => {
    if (gamePhase === 'betting') {
      setTimer(0); // This will trigger the spin
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top HUD with updated balance */}
      <div className="h-[60px] bg-game-hud-bg flex items-center justify-between px-4 border-b border-game-button-dark">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-game-logo-blue rounded-sm flex items-center justify-center text-white font-bold">
            💠
          </div>
          <div className="bg-game-button-dark/80 px-4 py-2 rounded-lg">
            <span className="text-white font-mono text-lg font-bold">
              ${balance.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
            <span className="text-game-coin-gold text-lg">⓪</span>
          </button>
          <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
            <span className="text-yellow-400 text-base">🏆</span>
          </button>
          <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
            <span className="text-white text-base">🕐</span>
          </button>
          <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
            <span className="text-white text-base">🔊</span>
          </button>
        </div>
      </div>

      {/* Game Board */}
      <SpinningGameBoard
        gamePhase={gamePhase}
        timer={timer}
        selectedBets={selectedBets}
        winningFruit={winningFruit}
        onSpinComplete={handleSpinComplete}
      />

      {/* Betting Controls */}
      <BettingControls
        gamePhase={gamePhase}
        selectedChip={selectedChip}
        balance={balance}
        totalBets={calculateTotalBets()}
        onChipSelect={handleChipSelect}
        onFruitBet={handleFruitBet}
        onSpin={handleManualSpin}
        onNewGame={handleNewGame}
      />

      {/* Result Modal */}
      <GameResultModal
        isOpen={showResultModal}
        winAmount={lastWinAmount}
        winningFruit={winningFruit}
        isWin={lastWinAmount > 0}
        onClose={() => setShowResultModal(false)}
        onPlayAgain={handleNewGame}
      />

      {/* Game Over Warning */}
      {balance < 10 && gamePhase === 'betting' && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-4xl mb-4">💸</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-red-200 mb-6">
              You've run out of funds. Would you like to start a new game with $10,000?
            </p>
            <button
              onClick={handleNewGame}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              🎰 Start New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default AutoSpinRouletteScreen;
