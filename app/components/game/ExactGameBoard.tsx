import React from 'react';

const ExactBottomControls = () => {
  const scrollFruits = ['🍊', '🥝', '🍎', '🍇', '🍌', '🥝', '🍇', '🥝', '🍊', '🥝', '🍊', '🍎', '🍇', '🍌'];
  
  const chips = [
    { value: 10, bg: 'bg-chip-10', text: 'text-chip-10-text', border: 'border-gray-400' },
    { value: 100, bg: 'bg-chip-100', text: 'text-chip-100-text', border: 'border-orange-600' },
    { value: '1K', bg: 'bg-chip-1k', text: 'text-chip-1k-text', border: 'border-blue-600', selected: true },
    { value: '5K', bg: 'bg-chip-5k', text: 'text-chip-5k-text', border: 'border-green-600' },
    { value: '50K', bg: 'bg-chip-50k', text: 'text-chip-50k-text', border: 'border-red-600' },
  ];

  return (
    <div className="bg-game-hud-bg p-4 border-t border-game-button-dark/50">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left Arrow */}
        <button className="w-10 h-10 bg-game-button-dark rounded-lg flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-lg">◀</span>
        </button>

        {/* Help Button */}
        <button className="w-10 h-10 bg-game-button-dark rounded-lg flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-lg font-bold">?</span>
        </button>

        {/* Scrollable Fruits */}
        <div className="flex-1 mx-4 overflow-hidden">
          <div className="flex items-center gap-2 justify-center">
            {scrollFruits.map((fruit, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span className="text-2xl">{fruit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button className="w-10 h-10 bg-game-button-dark rounded-lg flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-lg">▶</span>
        </button>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        {/* Spin Button */}
        <button 
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-blue-400 hover:bg-blue-600/20 transition-colors"
          style={{
            background: 'linear-gradient(135deg, hsl(225 73% 57%), hsl(225 73% 47%))'
          }}
        >
          <span className="text-white text-xl">🔄</span>
        </button>

        {/* 5 Poker Chips */}
        <div className="flex items-center gap-2">
          {chips.map((chip, index) => (
            <button
              key={index}
              className={`
                w-12 h-12 ${chip.bg} ${chip.text} rounded-full flex items-center justify-center 
                border-2 ${chip.border} font-bold text-sm transition-all duration-200
                ${chip.selected 
                  ? 'ring-4 ring-blue-400/50 shadow-lg shadow-blue-400/30 scale-110' 
                  : 'hover:scale-105'
                }
              `}
            >
              {chip.value}
            </button>
          ))}
        </div>

        {/* Menu Button */}
        <button className="w-12 h-12 bg-game-button-dark rounded-lg flex items-center justify-center border border-game-button-dark/50 hover:bg-game-button-dark/80 transition-colors">
          <span className="text-white text-lg">≡</span>
        </button>
      </div>
    </div>
  );
};

export default ExactBottomControls;