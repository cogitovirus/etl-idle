import { GameState } from '../core/GameState';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  effect: (state: GameState) => void;
}
