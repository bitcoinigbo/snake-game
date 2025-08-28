
export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum GameState {
  PLAYING,
  PAUSED,
  GAME_OVER,
  IDLE,
}
