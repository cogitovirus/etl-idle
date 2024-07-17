import { UpgradeEffect } from './UpgradeEffect';

export interface Upgrade {
  id: string;
  name: string;
  quote: string;
  description: string;
  cost: { type: "funds" | "data" | "innovationCredits", amount: number };
  effect: UpgradeEffect | UpgradeEffect[];
  prerequisites: string[];
  isPurchased: boolean;
}