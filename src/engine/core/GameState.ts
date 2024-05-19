import { v4 as uuid4 } from "uuid";
import { DataCollection } from "../entities/DataCollection";
import { Upgrade } from "../entities/Upgrade";
import { TaskService } from "../services/TaskService";


type StateChangeListener = () => void;

export class GameState {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private dataCollections: DataCollection[];
  // Tasks
  taskService: TaskService;
  // Upgrades
  private allUpgrades: Upgrade[];
  private unlockedUpgrades: Upgrade[];
  // visibility modifiers
  private commandLineVisible: boolean;
  private dataCollectionVisible: boolean;
  // private tasksVisible: boolean;
  // private upgradesVisible: boolean;
  // private fundsVisible: boolean;
  // private storageVisible: boolean;

  // TODO: notify listeners has gaps, sometimes it might not notify listeners of the change
  private listeners: StateChangeListener[] = [];

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
    this.allUpgrades = [];
    this.unlockedUpgrades = [];
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
    this.taskService = new TaskService(this);
  }

  // Getters
  getFunds(): number { return this.funds; }
  getData(): number { return this.data; }
  getProcessingSpeed(): number { return this.processingSpeed; }
  getDataWarehouseCapacity(): number { return this.dataWarehouseCapacity; }
  getDataCollections(): DataCollection[] { return this.dataCollections; }
  getUpgrades(): Upgrade[] { return this.allUpgrades; }

  // Setters
  addFunds(amount: number) {
    this.funds += amount;
    this.notifyListeners();
  }
  deductFunds(cost: number | undefined) {
    if (!cost) return;
    this.funds -= cost;
    this.notifyListeners();
  }
  addDataCollection(dataCollection: DataCollection) { this.dataCollections.push(dataCollection); }
  removeDataCollection(id: string) {
    this.dataCollections = this.dataCollections.filter(collection => collection.id !== id);
  }
  addUpgrade(upgrade: Upgrade) { this.allUpgrades.push(upgrade); }

  // Check if the player can afford a cost
  canAfford(cost: number | undefined): boolean {
    if (cost === undefined) return true;
    return this.funds >= cost;
  }

  // Method to add processed data to warehouse
  addToWarehouse(dataSize: number) {
    if (this.data + dataSize <= this.dataWarehouseCapacity) {
      this.data += dataSize;
    } else {
      this.data = this.dataWarehouseCapacity; // Cap at warehouse capacity
    }
    this.notifyListeners();
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
    this.notifyListeners();
  }

  increaseWarehouseCapacity(amount: number) {
    this.dataWarehouseCapacity += amount;
    this.notifyListeners();
  }

  // Update game state
  update(deltaTime: number) {
    const deltaTimeInSeconds = deltaTime / 1000;
    this.taskService.processTasks(deltaTimeInSeconds);
    this.taskService.checkForUnlockedTasks();
  }


  // subscribe and unsubscribe methods for listeners

  subscribe(listener: StateChangeListener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: StateChangeListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}