import { v4 as uuid4 } from "uuid";
import { DataCollection } from "../entities/DataCollection";
import { Upgrade } from "../entities/Upgrade";

export class GameState {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private dataCollections: DataCollection[];
  private upgrades: Upgrade[];
  // visibility modifiers
  private commandLineVisible: boolean;
  private dataCollectionVisible: boolean;
  // private tasksVisible: boolean;
  // private upgradesVisible: boolean;
  // private fundsVisible: boolean;
  // private storageVisible: boolean;


  constructor() {
    this.funds = 0;
    this.data = 0;
    this.processingSpeed = 1; // Initial processing speed
    this.dataWarehouseCapacity = 10 * 1024; // 10 Gb in Mb
    this.dataCollections = [ // seed data collections
      { id: uuid4(), name: 'Data Collection 1', dataSize: 3 },
      { id: uuid4(), name: 'Data Collection 2', dataSize: 4 },
      { id: uuid4(), name: 'Data Collection 3', dataSize: 5 },
    ];
    this.upgrades = [];
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
  }

  // Getters
  getFunds(): number { return this.funds; }
  getData(): number { return this.data; }
  getProcessingSpeed(): number { return this.processingSpeed; }
  getDataWarehouseCapacity(): number { return this.dataWarehouseCapacity; }
  getDataCollections(): DataCollection[] { return this.dataCollections; }
  getUpgrades(): Upgrade[] { return this.upgrades; }

  // Setters
  addFunds(amount: number) { this.funds += amount; }
  deductFunds(cost: number) { this.funds -= cost; }
  addDataCollection(dataCollection: DataCollection) { this.dataCollections.push(dataCollection); }
  removeDataCollection(id: string) {
    this.dataCollections = this.dataCollections.filter(collection => collection.id !== id);
  }
  addUpgrade(upgrade: Upgrade) { this.upgrades.push(upgrade); }

  // Check if the player can afford a cost
  canAfford(cost: number): boolean {
    return this.funds >= cost;
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
}