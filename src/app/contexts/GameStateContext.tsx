import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { CoreState } from '../../engine/core/CoreState';


interface GameStateContextType {
  coreState: CoreState;
}

interface GameStateProviderProps {
  children: ReactNode;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

function GameStateProvider({ children }: GameStateProviderProps): JSX.Element {
  const [coreState] = useState(new CoreState());
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const updateGame = (timestamp: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      // Update only every 200ms
      if (deltaTime > 200) {
        coreState.updateGameState(deltaTime);
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
  }); // Empty array means the effect runs only once on mount

  return (
    <GameStateContext.Provider value={{ coreState: coreState }}>
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
