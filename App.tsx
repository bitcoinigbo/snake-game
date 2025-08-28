
import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOverModal from './components/GameOverModal';
import { GameState } from './types';
import { useSwipe } from './hooks/useSwipe';
import { GithubIcon, PauseIcon, PlayIcon } from './constants';

const App: React.FC = () => {
  const {
    gameState,
    snake,
    food,
    score,
    highScore,
    togglePause,
    resetGame,
    changeDirection,
  } = useGameLogic();

  const swipeHandlers = useSwipe({ onSwipe: changeDirection });

  return (
    <div {...swipeHandlers} className="min-h-screen bg-gradient-to-br from-gray-800 via-slate-900 to-black flex flex-col items-center justify-center p-4 font-mono select-none outline-none" tabIndex={0}>
      <div className="w-full max-w-lg mx-auto">
        <Scoreboard score={score} highScore={highScore} />
        <div className="relative aspect-square w-full bg-slate-800/50 rounded-lg shadow-2xl shadow-cyan-500/10 border border-slate-700 mt-4">
          <GameBoard snake={snake} food={food} />
          {gameState === GameState.IDLE && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                <h2 className="text-4xl font-bold text-white tracking-widest">SNAKE</h2>
                <p className="text-slate-400 mt-4 animate-pulse">Press Arrow Keys or Swipe to Start</p>
            </div>
          )}
          {gameState === GameState.PAUSED && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white">Paused</h2>
              <p className="text-slate-400 mt-2">Press SPACE to resume</p>
            </div>
          )}
          {gameState === GameState.GAME_OVER && (
            <GameOverModal score={score} onRestart={resetGame} />
          )}
        </div>
        <div className="flex justify-between items-center mt-4 text-slate-400">
          <div className="text-center hidden sm:block">
             <p>Use <span className="font-bold text-white">Arrow Keys</span> or <span className="font-bold text-white">WASD</span></p>
             <p>Press <span className="font-bold text-white">SPACE</span> to pause</p>
          </div>
           <div className="text-center sm:hidden">
             <p>Use <span className="font-bold text-white">Swipe Gestures</span> to move</p>
             <p>Tap button to pause</p>
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={togglePause}
              className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={gameState === GameState.PLAYING ? 'Pause Game' : 'Resume Game'}
              disabled={gameState === GameState.IDLE || gameState === GameState.GAME_OVER}
            >
              {gameState === GameState.PLAYING ? <PauseIcon /> : <PlayIcon />}
            </button>
            <a href="https://github.com/gemini-apps/react-snake-game" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
