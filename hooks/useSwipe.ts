
import { useState, useCallback } from 'react';
import { Direction } from '../types';

interface SwipeInput {
  onSwipe: (direction: Direction) => void;
}

export const useSwipe = ({ onSwipe }: SwipeInput) => {
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 30;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart) {
      return;
    }

    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    
    setTouchStart(null);

    if (Math.abs(dx) < minSwipeDistance && Math.abs(dy) < minSwipeDistance) {
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      onSwipe(dx > 0 ? Direction.RIGHT : Direction.LEFT);
    } else {
      onSwipe(dy > 0 ? Direction.DOWN : Direction.UP);
    }
  }, [touchStart, onSwipe]);

  return {
    onTouchStart,
    onTouchEnd,
  };
};
