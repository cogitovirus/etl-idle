import React, { useReducer, useEffect, useRef } from 'react';
import { initialState, reducer } from '@engine/core/GameState';

function GameComponent() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | undefined>(undefined);

    const updateGame = (timestamp: number) => {
      if (previousTimeRef.current !== undefined) {
          const deltaTime = timestamp - previousTimeRef.current;
          // Update only every 200ms
          if (deltaTime > 200) {
              dispatch({ type: 'increment' });
              previousTimeRef.current = timestamp;
          }
      } else {
          previousTimeRef.current = timestamp; // Initialize on the first frame
      }

      requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
      requestRef.current = requestAnimationFrame(updateGame);
      return () => {
          if (requestRef.current) {
              cancelAnimationFrame(requestRef.current);
          }
      };
  }, []); // Empty array means the effect runs only once on mount
    return (
        <div>
            <h1>Score: {state.score}</h1>
            <button onClick={() => dispatch({ type: 'bigIncrement' })}>Click Me!</button>
        </div>
    );
}

export default GameComponent;
