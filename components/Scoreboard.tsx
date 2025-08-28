
import React from 'react';

interface ScoreboardProps {
  score: number;
  highScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between items-center text-white bg-slate-800/50 border border-slate-700 rounded-lg px-6 py-3">
      <div>
        <span className="text-slate-400 text-sm">SCORE</span>
        <p className="text-3xl font-bold text-cyan-400">{score}</p>
      </div>
       <div className="text-right">
        <span className="text-slate-400 text-sm">HIGH SCORE</span>
        <p className="text-3xl font-bold">{highScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
