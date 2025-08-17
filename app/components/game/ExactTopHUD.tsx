import React from 'react';

const ExactTopHUD = () => {
  return (
    <div className="h-[60px] bg-game-hud-bg flex items-center justify-between px-4 border-b border-game-button-dark">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Blue Diamond Logo */}
        <div className="w-8 h-8 bg-game-logo-blue rounded-sm flex items-center justify-center text-white font-bold">
          💠
        </div>
        
        {/* Balance Display */}
        <div className="bg-game-button-dark/80 px-4 py-2 rounded-lg">
          <span className="text-white font-mono text-lg font-bold">0</span>
        </div>
      </div>

      {/* Right Section - 4 Circular Icons */}
      <div className="flex items-center gap-2">
        {/* Gold Coin */}
        <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-game-coin-gold text-lg">⓪</span>
        </button>
        
        {/* Trophy */}
        <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-yellow-400 text-base">🏆</span>
        </button>
        
        {/* Clock */}
        <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-base">🕐</span>
        </button>
        
        {/* Speaker */}
        <button className="w-9 h-9 bg-game-button-dark rounded-full flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-base">🔊</span>
        </button>
      </div>
    </div>
  );
};

export default ExactTopHUD;