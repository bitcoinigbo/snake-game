
import React from 'react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm z-10">
      <div className="text-center text-white p-8">
        <h2 className="text-5xl font-extrabold text-red-500 mb-2">Game Over</h2>
        <p className="text-xl text-slate-300 mb-6">Your Score: <span className="font-bold text-cyan-400">{score}</span></p>
        <button
          onClick={onRestart}
          className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
