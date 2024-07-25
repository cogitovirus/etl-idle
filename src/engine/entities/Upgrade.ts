import { UpgradeEffect } from './UpgradeEffect';
import { Cost } from './Cost';

export interface Upgrade {
  id: string;
  name: string;
  quote: string;
  description: string;
  cost: Cost[];
  effect: UpgradeEffect | UpgradeEffect[];
  prerequisites: string[];
  isPurchased: boolean;
}