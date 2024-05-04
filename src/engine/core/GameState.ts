
export const initialState = {
  score: 0
};

interface GameState {
  score: number;
}

type Action = { type: 'increment' } | { type: 'bigIncrement' };

export function reducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'increment':
      return { ...state, score: state.score + 1 };
    case 'bigIncrement':
      return { ...state, score: state.score + 100 };
    default:
      throw new Error('Unhandled action');
  }
}
