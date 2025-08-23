import React, { useState, useEffect, useRef } from 'react';

interface SpinningGameBoardProps {
  gamePhase: 'betting' | 'spinning' | 'result';
  timer: number;
  selectedBets: Record<string, number>;
  winningFruit?: string;
  onSpinComplete: (fruit: string) => void;
}

const SpinningGameBoard = ({ 
  gamePhase, 
  timer, 
  selectedBets, 
  winningFruit, 
  onSpinComplete 
}: SpinningGameBoardProps) => {
  const fruits = ['🍊', '🍎', '🍇', '🍌', '🥝'];
  const fruitBorder = Array.from({ length: 22 }, (_, i) => fruits[i % fruits.length]);
  
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const bettingData = [
    // Top row
    { fruit: '🍊', amount: '70,000', multiplier: 'X38' },
    { fruit: '🍎', amount: '41,780', multiplier: 'X28' },
    { fruit: '🍇', amount: '62,780', multiplier: 'X18' },
    { fruit: '🍌', amount: '155,000', multiplier: 'X10' },
    // Bottom row
    { fruit: '🥝', amount: '5,100', multiplier: 'X5' },
    { fruit: '🍊', amount: '50,200', multiplier: 'X5' },
    { fruit: '🍎', amount: '3,600', multiplier: 'X5' },
    { fruit: '🍇', amount: '10,100', multiplier: 'X5' }
  ];

  useEffect(() => {
    if (gamePhase === 'spinning' && !isSpinning) {
      startSpin();
    }
    
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current as unknown as number);
      }
    };
  }, [gamePhase]);

  const startSpin = () => {
    setIsSpinning(true);
    
    // Ultra fast spinning phase (3 seconds) - builds excitement
    let currentSpeed = 50; // Very fast initial speed
    spinIntervalRef.current = setInterval(() => {
      setHighlightedIndex(prev => (prev + 1) % fruitBorder.length);
    }, currentSpeed);
    
    // After 3 seconds, start gradual slowdown for dramatic effect
    setTimeout(() => {
      slowDownSpin();
    }, 3000);
  };

  const slowDownSpin = () => {
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }
    
    // Progressive slowdown with dramatic timing
    let currentSpeed = 100;
    let slowdownSteps = 0;
    const maxSteps = 15; // More steps for longer anticipation
    
    const slowDownInterval = () => {
      spinIntervalRef.current = setTimeout(() => {
        setHighlightedIndex(prev => (prev + 1) % fruitBorder.length);
        slowdownSteps++;
        
        // Exponential slowdown for maximum drama
        currentSpeed = currentSpeed * 1.3;
        
        if (slowdownSteps >= maxSteps) {
          finalizeSpin();
        } else {
          slowDownInterval();
        }
      }, currentSpeed) as unknown as ReturnType<typeof setInterval>;
    };
    
    slowDownInterval();
  };

  const finalizeSpin = () => {
    if (spinIntervalRef.current) {
      clearTimeout(spinIntervalRef.current);
    }
    
    // Generate random result
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const resultIndex = fruitBorder.findIndex(fruit => fruit === randomFruit);
    setHighlightedIndex(resultIndex);
    setIsSpinning(false);
    
    onSpinComplete(randomFruit);
  };

  const ChipStack = ({ hasBet }: { hasBet: boolean }) => (
    <div className="flex items-center justify-center -space-x-1">
      <div className={`w-3.5 h-3.5 bg-chip-10 border border-gray-400 rounded-full flex items-center justify-center ${hasBet ? 'ring-2 ring-yellow-400' : ''}`}>
        <span className="text-chip-10-text text-[6px] font-bold">10</span>
      </div>
      <div className="w-3.5 h-3.5 bg-chip-100 border border-orange-600 rounded-full flex items-center justify-center">
        <span className="text-chip-100-text text-[6px] font-bold">100</span>
      </div>
      <div className="w-3.5 h-3.5 bg-chip-1k border border-blue-600 rounded-full flex items-center justify-center">
        <span className="text-chip-1k-text text-[6px] font-bold">1K</span>
      </div>
      <div className="w-3.5 h-3.5 bg-chip-5k border border-green-600 rounded-full flex items-center justify-center">
        <span className="text-chip-5k-text text-[6px] font-bold">5K</span>
      </div>
      <div className="w-3.5 h-3.5 bg-chip-50k border border-red-600 rounded-full flex items-center justify-center">
        <span className="text-chip-50k-text text-[6px] font-bold">50K</span>
      </div>
    </div>
  );

  return (
    <div className="flex-1 relative flex items-center justify-center" style={{
      background: 'linear-gradient(45deg, hsl(198 52% 22%), hsl(82 51% 14%), hsl(82 38% 35%), hsl(82 51% 14%), hsl(198 52% 22%))'
    }}>
      {/* Fruit Border Around Oval */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{
          width: '74%',
          height: '54vw',
          maxHeight: '400px'
        }}>
          {fruitBorder.map((fruit, index) => {
            const angle = index / fruitBorder.length * 2 * Math.PI;
            const radiusX = 37; // % of container width
            const radiusY = 27; // % of container width (maintains oval)
            const x = 50 + radiusX * Math.cos(angle);
            const y = 50 + radiusY * Math.sin(angle);
            const isHighlighted = index === highlightedIndex && isSpinning;
            const isWinner = winningFruit === fruit && gamePhase === 'result';
            
            // Enhanced visual effects for different states
            const getHighlightStyle = () => {
              if (isWinner) {
                return {
                  background: 'radial-gradient(circle, #10B981, #059669)',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.9), 0 0 60px rgba(16, 185, 129, 0.6)',
                  transform: 'translate(-50%, -50%) scale(1.6)',
                  zIndex: 20
                };
              }
              if (isHighlighted) {
                return {
                  background: 'radial-gradient(circle, #FBBF24, #F59E0B)',
                  boxShadow: '0 0 25px rgba(251, 191, 36, 0.9), 0 0 50px rgba(245, 158, 11, 0.7)',
                  transform: 'translate(-50%, -50%) scale(1.4)',
                  zIndex: 10
                };
              }
              return {
                background: 'rgba(0, 0, 0, 0.4)',
                boxShadow: 'none',
                transform: 'translate(-50%, -50%) scale(1)',
                zIndex: 1
              };
            };
            
            return (
              <div 
                key={index} 
                className={`
                  absolute w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                  ${isHighlighted ? 'animate-pulse' : ''}
                  ${isWinner ? 'animate-bounce' : ''}
                `}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  ...getHighlightStyle()
                }}
              >
                <span className={`
                  text-2xl transition-all duration-200
                  ${isHighlighted || isWinner ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter brightness-125' : ''}
                `}>
                  {fruit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Oval Track */}
      <div className="relative bg-game-oval-interior border-8 border-game-oval-border shadow-2xl" style={{
        width: '74%',
        height: '54vw',
        maxHeight: '400px',
        borderRadius: '50%',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)'
      }}>
        {/* Enhanced Timer Display */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
          <div className={`
            px-4 py-2 rounded-lg border-2 transition-all duration-300
            ${gamePhase === 'betting' ? 'bg-game-timer-bg border-game-timer-text' : ''}
            ${gamePhase === 'spinning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-300 animate-pulse scale-110' : ''}
            ${gamePhase === 'result' ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 animate-bounce' : ''}
          `} style={{
            boxShadow: gamePhase === 'betting' ? '0 0 15px rgba(255, 0, 0, 0.8)' : 
                      gamePhase === 'spinning' ? '0 0 20px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 140, 0, 0.6)' :
                      '0 0 20px rgba(16, 185, 129, 0.9), 0 0 40px rgba(5, 150, 105, 0.6)'
          }}>
            <span className={`
              font-mono font-bold text-xl transition-all duration-300
              ${gamePhase === 'betting' ? 'text-game-timer-text' : 'text-white drop-shadow-lg'}
              ${gamePhase === 'spinning' ? 'animate-pulse' : ''}
            `}>
              {gamePhase === 'betting' ? timer : 
               gamePhase === 'spinning' ? '🎰 SPINNING...' : '🎉 WIN!'}
            </span>
          </div>
        </div>

        {/* 8 Betting Zones in 2x4 Grid */}
        <div className="absolute inset-0 flex items-center justify-center rounded-none">
          <div className="grid grid-cols-4 gap-2 w-full max-w-[90%] px-4">
            {/* Top Row */}
            <div className="col-span-4 grid grid-cols-4 gap-2 mb-2">
              {bettingData.slice(0, 4).map((bet, index) => {
                const hasBet = selectedBets[bet.fruit] > 0;
                const betAmount = selectedBets[bet.fruit] || 0;
                const isWinningZone = winningFruit === bet.fruit && gamePhase === 'result';
                
                return (
                  <div 
                    key={index} 
                    className={`
                      bg-game-oval-border rounded-lg p-2 flex flex-col items-center justify-center relative transition-all duration-300
                      ${isWinningZone ? 'bg-green-400 ring-4 ring-green-400/50 scale-105' : ''}
                      ${hasBet ? 'ring-2 ring-yellow-400/50' : ''}
                    `}
                    style={{
                      width: '84px',
                      height: '78px'
                    }}
                  >
                    {/* Bet Amount Indicator */}
                    {hasBet && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full min-w-[20px] text-center">
                        ${betAmount}
                      </div>
                    )}
                    
                    {/* Amount Display */}
                    <div className="px-2 py-1 rounded text-white text-xs font-bold mb-1" style={{
                      background: 'linear-gradient(180deg, hsl(25 100% 51%), hsl(51 100% 68%))'
                    }}>
                      {bet.amount}
                    </div>
                    
                    {/* Chip Stack */}
                    <ChipStack hasBet={hasBet} />
                    
                    {/* Multiplier */}
                    <div className="text-game-multiplier-text text-sm font-bold mt-1" style={{
                      textShadow: '1px 1px 2px hsl(25 100% 51%)'
                    }}>
                      {bet.multiplier}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom Row */}
            <div className="col-span-4 grid grid-cols-4 gap-2">
              {bettingData.slice(4, 8).map((bet, index) => {
                const hasBet = selectedBets[bet.fruit] > 0;
                const betAmount = selectedBets[bet.fruit] || 0;
                const isWinningZone = winningFruit === bet.fruit && gamePhase === 'result';
                
                return (
                  <div 
                    key={index + 4} 
                    className={`
                      bg-game-oval-border rounded-lg p-2 flex flex-col items-center justify-center relative transition-all duration-300
                      ${isWinningZone ? 'bg-green-400 ring-4 ring-green-400/50 scale-105' : ''}
                      ${hasBet ? 'ring-2 ring-yellow-400/50' : ''}
                    `}
                    style={{
                      width: '84px',
                      height: '78px'
                    }}
                  >
                    {/* Bet Amount Indicator */}
                    {hasBet && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full min-w-[20px] text-center">
                        ${betAmount}
                      </div>
                    )}
                    
                    {/* Amount Display */}
                    <div className="px-2 py-1 rounded text-white text-xs font-bold mb-1" style={{
                      background: 'linear-gradient(180deg, hsl(25 100% 51%), hsl(51 100% 68%))'
                    }}>
                      {bet.amount}
                    </div>
                    
                    {/* Chip Stack */}
                    <ChipStack hasBet={hasBet} />
                    
                    {/* Multiplier */}
                    <div className="text-game-multiplier-text text-sm font-bold mt-1" style={{
                      textShadow: '1px 1px 2px hsl(25 100% 51%)'
                    }}>
                      {bet.multiplier}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningGameBoard;