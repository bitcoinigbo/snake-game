
import React from 'react';
import { Coordinate } from '../types';
import { GRID_SIZE } from '../constants';

interface GameBoardProps {
  snake: Coordinate[];
  food: Coordinate;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  return (
    <div
      className="grid absolute inset-0 p-1"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {/* Render Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`transition-all duration-100 ${index === 0 ? 'bg-green-400 shadow-[0_0_15px_rgba(134,239,172,0.6)]' : 'bg-green-500'} rounded-sm`}
          style={{
            gridColumnStart: segment.x + 1,
            gridRowStart: segment.y + 1,
            transform: `scale(${1 + (snake.length - index) * 0.01})` // subtle size gradient
          }}
        />
      ))}

      {/* Render Food */}
      <div
        className="bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse"
        style={{
          gridColumnStart: food.x + 1,
          gridRowStart: food.y + 1,
        }}
      />
    </div>
  );
};

export default GameBoard;
