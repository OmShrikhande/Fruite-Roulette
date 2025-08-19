import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface GameResultModalProps {
  isOpen: boolean;
  winAmount: number;
  winningFruit: string;
  isWin: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

const GameResultModal = ({
  isOpen,
  winAmount,
  winningFruit,
  isWin,
  onClose,
  onPlayAgain
}: GameResultModalProps) => {
  const [animate, setAnimate] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      
      if (isWin) {
        // Generate confetti particles
        const particles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2
        }));
        setConfetti(particles);
      }
    } else {
      setAnimate(false);
      setConfetti([]);
    }
  }, [isOpen, isWin]);

  const getResultMessage = () => {
    if (isWin) {
      if (winAmount >= 50000) return "🎊 MEGA WIN! 🎊";
      if (winAmount >= 10000) return "🌟 BIG WIN! 🌟";
      if (winAmount >= 1000) return "🎉 NICE WIN! 🎉";
      return "💰 YOU WIN! 💰";
    }
    return "😔 Better luck next time! 😔";
  };

  const getEncouragementMessage = () => {
    const messages = [
      "Every spin is a new chance!",
      "Fortune favors the bold!",
      "Your big win is coming!",
      "Keep spinning, keep winning!",
      "The next spin could be it!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-2 border-yellow-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-4">
            Game Result
          </DialogTitle>
        </DialogHeader>

        {/* Confetti Animation */}
        {isWin && confetti.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center space-y-6 relative z-10">
          {/* Result Message */}
          <div className={`text-3xl font-bold transition-all duration-500 ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            {getResultMessage()}
          </div>

          {/* Winning Fruit Display */}
          <div className={`flex items-center justify-center transition-all duration-700 ${animate ? 'rotate-0' : 'rotate-180'}`}>
            <div className={`
              w-24 h-24 rounded-full flex items-center justify-center text-6xl
              ${isWin 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse shadow-lg shadow-yellow-400/50' 
                : 'bg-gradient-to-br from-gray-600 to-gray-700'
              }
            `}>
              <span className={`${isWin ? 'animate-bounce' : ''}`}>
                {winningFruit}
              </span>
            </div>
          </div>

          {/* Win Amount */}
          {isWin ? (
            <div className={`space-y-2 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-lg text-yellow-300">Congratulations!</div>
              <div className="text-4xl font-bold text-green-400 animate-pulse">
                +${winAmount.toLocaleString()}
              </div>
              <div className="text-sm text-blue-300">
                🎉 Amazing spin! 🎉
              </div>
            </div>
          ) : (
            <div className={`space-y-2 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-lg text-gray-300">No win this time</div>
              <div className="text-2xl font-bold text-red-400">
                ${winAmount.toLocaleString()}
              </div>
              <div className="text-sm text-purple-300">
                {getEncouragementMessage()}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={`flex gap-4 justify-center pt-4 transition-all duration-1200 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={onPlayAgain}
              className={`
                px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200
                ${isWin 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30'
                }
                hover:scale-105 transform
              `}
            >
              🎰 Play Again
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 transform shadow-lg shadow-gray-600/30"
            >
              📊 View Stats
            </button>
          </div>

          {/* Statistics Preview */}
          <div className={`mt-4 p-3 bg-black/30 rounded-lg text-sm transition-all duration-1500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-gray-300">This Round Statistics:</div>
            <div className="flex justify-between mt-1">
              <span>Winning Fruit:</span>
              <span className="font-bold">{winningFruit}</span>
            </div>
            <div className="flex justify-between">
              <span>Result:</span>
              <span className={`font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                {isWin ? `+$${winAmount.toLocaleString()}` : 'No Win'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameResultModal;
