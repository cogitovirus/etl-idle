import { CoreState } from '../core/CoreState';
import { Cost } from './Cost';

export interface Upgrade {
  id: string;
  name: string;
  cost: Cost;
  effect: (state: CoreState) => void;
  prerequisites?: string[];
}
