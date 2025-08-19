import React from 'react';

interface BettingControlsProps {
  gamePhase: 'betting' | 'spinning' | 'result';
  selectedChip: number;
  balance: number;
  totalBets: number;
  onChipSelect: (value: number) => void;
  onFruitBet: (fruit: string) => void;
  onSpin: () => void;
  onNewGame: () => void;
}

const BettingControls = ({
  gamePhase,
  selectedChip,
  balance,
  totalBets,
  onChipSelect,
  onFruitBet,
  onSpin,
  onNewGame
}: BettingControlsProps) => {
  const fruits = ['🍊', '🍎', '🍇', '🍌', '🥝'];
  
  const chips = [
    { value: 10, bg: 'bg-chip-10', text: 'text-chip-10-text', border: 'border-gray-400' },
    { value: 100, bg: 'bg-chip-100', text: 'text-chip-100-text', border: 'border-orange-600' },
    { value: 1000, bg: 'bg-chip-1k', text: 'text-chip-1k-text', border: 'border-blue-600' },
    { value: 5000, bg: 'bg-chip-5k', text: 'text-chip-5k-text', border: 'border-green-600' },
    { value: 50000, bg: 'bg-chip-50k', text: 'text-chip-50k-text', border: 'border-red-600' },
  ];

  const getGamePhaseColor = () => {
    switch (gamePhase) {
      case 'betting': return 'bg-green-600';
      case 'spinning': return 'bg-yellow-600';
      case 'result': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getGamePhaseText = () => {
    switch (gamePhase) {
      case 'betting': return 'PLACE BETS';
      case 'spinning': return 'SPINNING...';
      case 'result': return 'GAME OVER';
      default: return 'READY';
    }
  };

  return (
    <div className="bg-game-hud-bg p-4 border-t border-game-button-dark/50">
      {/* Game Status Bar */}
      <div className="flex items-center justify-between mb-3 p-2 bg-game-button-dark/50 rounded-lg">
        <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getGamePhaseColor()}`}>
          {getGamePhaseText()}
        </div>
        <div className="text-white text-sm">
          Balance: <span className="font-mono font-bold text-green-400">${balance.toLocaleString()}</span>
        </div>
        <div className="text-white text-sm">
          Total Bets: <span className="font-mono font-bold text-yellow-400">${totalBets.toLocaleString()}</span>
        </div>
      </div>

      {/* Fruit Betting Row */}
      <div className="flex items-center justify-center gap-3 mb-4 p-3 bg-game-button-dark/30 rounded-lg">
        <span className="text-white text-sm font-bold">Bet on:</span>
        {fruits.map((fruit, index) => (
          <button
            key={index}
            onClick={() => onFruitBet(fruit)}
            disabled={gamePhase !== 'betting' || selectedChip > balance}
            className={`
              w-12 h-12 bg-black/40 rounded-full flex items-center justify-center 
              transition-all duration-200 border-2 border-transparent
              ${gamePhase === 'betting' && selectedChip <= balance 
                ? 'hover:bg-yellow-400/20 hover:border-yellow-400 hover:scale-110' 
                : 'opacity-50 cursor-not-allowed'
              }
            `}
          >
            <span className="text-2xl">{fruit}</span>
          </button>
        ))}
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center justify-between">
        {/* Action Button */}
        <button 
          onClick={gamePhase === 'result' ? onNewGame : onSpin}
          disabled={gamePhase === 'spinning'}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-200
            ${gamePhase === 'result' 
              ? 'bg-green-600 border-green-400 hover:bg-green-700' 
              : 'border-blue-400 hover:bg-blue-600/20'
            }
            ${gamePhase === 'spinning' ? 'opacity-50 cursor-not-allowed animate-spin' : ''}
          `}
          style={{
            background: gamePhase === 'result' 
              ? 'linear-gradient(135deg, hsl(120 61% 34%), hsl(120 61% 24%))' 
              : 'linear-gradient(135deg, hsl(225 73% 57%), hsl(225 73% 47%))'
          }}
        >
          <span className="text-white text-2xl">
            {gamePhase === 'result' ? '🔄' : gamePhase === 'spinning' ? '⏳' : '🎰'}
          </span>
        </button>

        {/* Chip Selection */}
        <div className="flex items-center gap-2">
          {chips.map((chip, index) => (
            <button
              key={index}
              onClick={() => onChipSelect(chip.value)}
              disabled={gamePhase !== 'betting'}
              className={`
                w-12 h-12 ${chip.bg} ${chip.text} rounded-full flex items-center justify-center 
                border-2 ${chip.border} font-bold text-sm transition-all duration-200
                ${selectedChip === chip.value && gamePhase === 'betting'
                  ? 'ring-4 ring-blue-400/50 shadow-lg shadow-blue-400/30 scale-110' 
                  : gamePhase === 'betting' ? 'hover:scale-105' : 'opacity-50'
                }
                ${chip.value > balance ? 'opacity-30 cursor-not-allowed' : ''}
              `}
            >
              {chip.value >= 1000 ? `${chip.value/1000}K` : chip.value}
            </button>
          ))}
        </div>

        {/* Quick Bet Options */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onChipSelect(Math.min(balance, 1000))}
            disabled={gamePhase !== 'betting' || balance < 10}
            className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold rounded hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            MAX
          </button>
          <button
            onClick={() => onChipSelect(10)}
            disabled={gamePhase !== 'betting' || balance < 10}
            className="px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            MIN
          </button>
        </div>
      </div>

      {/* Balance Warning */}
      {balance < selectedChip && gamePhase === 'betting' && (
        <div className="mt-2 p-2 bg-red-600/20 border border-red-600/50 rounded text-red-400 text-sm text-center">
          Insufficient balance for selected chip value
        </div>
      )}
    </div>
  );
};

export default BettingControls;
