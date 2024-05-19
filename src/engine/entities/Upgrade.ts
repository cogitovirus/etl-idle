import { CoreState } from '../core/CoreState';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  effect: (state: CoreState) => void;
}
