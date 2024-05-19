import React, { createContext, useState, useContext, useRef, useEffect, ReactNode } from 'react';
import { GameState } from '../../engine/core/GameState';
import { TaskService } from '../../engine/services/TaskService';


interface GameStateContextType {
  gameState: GameState;
  taskService: TaskService;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

interface GameStateProviderProps {
  children: ReactNode;
}

function GameStateProvider({ children }: GameStateProviderProps): JSX.Element {
  const [gameState] = useState(new GameState());
  const [taskService] = useState(gameState.taskService);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const updateGame = (timestamp: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      // Update only every 200ms
      if (deltaTime > 200) {
        gameState.update(deltaTime);
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
    <GameStateContext.Provider value={{ gameState, taskService }}>
      {children}
    </GameStateContext.Provider>
  );
}

const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export { GameStateContext, GameStateProvider, useGameState };
