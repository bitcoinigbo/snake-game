
import { useState, useEffect, useCallback } from 'react';
import { Coordinate, Direction, GameState } from '../types';
import {
  GRID_SIZE,
  INITIAL_SNAKE_POSITION,
  INITIAL_DIRECTION,
  BASE_SPEED_MS,
  MIN_SPEED_MS,
  SPEED_INCREMENT,
  SCORE_INCREMENT,
} from '../constants';
import { useInterval } from './useInterval';
import { playEatSound, playGameOverSound } from '../services/soundService';

const generateFood = (snake: Coordinate[]): Coordinate => {
  while (true) {
    const foodPosition = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const isFoodOnSnake = snake.some(
      segment => segment.x === foodPosition.x && segment.y === foodPosition.y
    );
    if (!isFoodOnSnake) {
      return foodPosition;
    }
  }
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [snake, setSnake] = useState<Coordinate[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Coordinate>(generateFood(INITIAL_SNAKE_POSITION));
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [pendingDirection, setPendingDirection] = useState<Direction | null>(null);
  const [speed, setSpeed] = useState<number>(BASE_SPEED_MS);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
      const savedScore = localStorage.getItem('snakeHighScore');
      return savedScore ? parseInt(savedScore, 10) : 0;
  });

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(generateFood(INITIAL_SNAKE_POSITION));
    setDirection(INITIAL_DIRECTION);
    setPendingDirection(null);
    setSpeed(BASE_SPEED_MS);
    setScore(0);
    setGameState(GameState.PLAYING);
  }, []);
  
  const startGame = useCallback(() => {
    if (gameState === GameState.IDLE || gameState === GameState.GAME_OVER) {
      resetGame();
    }
  }, [gameState, resetGame]);

  const togglePause = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setGameState(GameState.PAUSED);
    } else if (gameState === GameState.PAUSED) {
      setGameState(GameState.PLAYING);
    }
  }, [gameState]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState === GameState.IDLE || gameState === GameState.GAME_OVER) {
        startGame();
    }
    
    // Only allow direction changes when playing
    if (gameState !== GameState.PLAYING && gameState !== GameState.IDLE) return;

    const effectiveDirection = pendingDirection ?? direction;
    const isReversing =
        (effectiveDirection === Direction.UP && newDirection === Direction.DOWN) ||
        (effectiveDirection === Direction.DOWN && newDirection === Direction.UP) ||
        (effectiveDirection === Direction.LEFT && newDirection === Direction.RIGHT) ||
        (effectiveDirection === Direction.RIGHT && newDirection === Direction.LEFT);

    if (!isReversing) {
        setPendingDirection(newDirection);
    }
  }, [direction, pendingDirection, gameState, startGame]);


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
    }

    let newDirection: Direction | null = null;
    switch (e.key) {
    case 'ArrowUp':
    case 'w':
        newDirection = Direction.UP;
        break;
    case 'ArrowDown':
    case 's':
        newDirection = Direction.DOWN;
        break;
    case 'ArrowLeft':
    case 'a':
        newDirection = Direction.LEFT;
        break;
    case 'ArrowRight':
    case 'd':
        newDirection = Direction.RIGHT;
        break;
    }

    if (newDirection !== null) {
        changeDirection(newDirection);
    }
  }, [togglePause, changeDirection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const gameLoop = useCallback(() => {
    let currentDirection = direction;
    if (pendingDirection !== null) {
      currentDirection = pendingDirection;
      setDirection(pendingDirection);
      setPendingDirection(null);
    }
    
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (currentDirection) {
      case Direction.UP: head.y -= 1; break;
      case Direction.DOWN: head.y += 1; break;
      case Direction.LEFT: head.x -= 1; break;
      case Direction.RIGHT: head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      playGameOverSound();
      setGameState(GameState.GAME_OVER);
      return;
    }

    // Self collision
    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        playGameOverSound();
        setGameState(GameState.GAME_OVER);
        return;
      }
    }

    newSnake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      playEatSound();
      const newScore = score + SCORE_INCREMENT;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('snakeHighScore', newScore.toString());
      }
      setFood(generateFood(newSnake));
      setSpeed(prev => Math.max(MIN_SPEED_MS, prev - SPEED_INCREMENT));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, food, direction, pendingDirection, score, highScore]);

  useInterval(gameLoop, gameState === GameState.PLAYING ? speed : null);

  return { gameState, snake, food, score, highScore, togglePause, resetGame, changeDirection };
};
