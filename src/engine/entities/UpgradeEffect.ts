export type UpgradeEffect = 
  | { type: 'increaseProcessingSpeed', amount: number }
  | { type: 'increaseDataWarehouseCapacity', amount: number }
  | { type: 'addFunds', amount: number }
