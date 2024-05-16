export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  effect: (state: GameState) => void;
}

interface DataCollection {
  id: string;
  name: string;
  dataSize: number; // Total size of data collection in Mb
  processed: number; // Amount of data already processed in Mb
  cost: number;
}

export class GameState {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private dataCollections: DataCollection[];
  private upgrades: Upgrade[];

  constructor() {
    this.funds = 0;
    this.data = 0;
    this.processingSpeed = 1; // Initial processing speed
    this.dataWarehouseCapacity = 10 * 1024; // 10 Gb in Mb
    this.dataCollections = [];
    this.upgrades = [];
  }

  buyUpgrade(upgradeId: string) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.canAfford(upgrade.cost)) {
      upgrade.effect(this);
      this.deductFunds(upgrade.cost);
    }
  }

  addDataCollection(dataCollection: DataCollection) {
    this.dataCollections.push(dataCollection);
  }

  // Method to process data
  processData() {
    this.dataCollections.forEach(collection => {
      const processable = Math.min(collection.dataSize - collection.processed, this.processingSpeed);
      collection.processed += processable;
      if (collection.processed === collection.dataSize) {
        this.addToWarehouse(collection.dataSize);
        collection.processed = 0; // Reset the collection for now, can be handled differently
      }
    });
  }

  // Method to add processed data to warehouse
  addToWarehouse(dataSize: number) {
    if (this.data + dataSize <= this.dataWarehouseCapacity) {
      this.data += dataSize;
    } else {
      this.data = this.dataWarehouseCapacity; // Cap at warehouse capacity
    }
  }

  // Method to exchange data for funds
  exchangeDataForFunds(amount: number) {
    if (this.data >= amount) {
      this.data -= amount;
      this.addFunds(amount); // Example exchange rate: 1 Mb = $1
    }
  }

  // Method to increase processing speed
  increaseProcessingSpeed(amount: number) {
    this.processingSpeed += amount;
  }

  // Check if the player can afford a cost
  private canAfford(cost: number): boolean {
    return this.funds >= cost;
  }

  // Deduct funds from the player
  deductFunds(cost: number) {
    this.funds -= cost;
  }

  // Add funds to the player
  addFunds(amount: number) {
    this.funds += amount;
  }

  // Get current funds
  getFunds(): number {
    return this.funds;
  }

  // Get current data
  getData(): number {
    return this.data;
  }

  // Get current processing speed
  getProcessingSpeed(): number {
    return this.processingSpeed;
  }

  // Get current data warehouse capacity
  getDataWarehouseCapacity(): number {
    return this.dataWarehouseCapacity;
  }

  // Add an upgrade to the game state
  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }
}