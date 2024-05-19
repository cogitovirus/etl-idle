import { v4 as uuid4 } from "uuid";
import { DataCollection } from "../entities/DataCollection";
import { DataCollectionService } from "../services/DataCollectionService";
import { Upgrade } from "../entities/Upgrade";
import { TaskService } from "../services/TaskService";
import { Cost } from "../entities/Cost";
import { EventEmitter } from "./EventEmitter";


type StateChangeListener = () => void;

export class CoreState extends EventEmitter {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private dataCollections: DataCollection[];
  // Tasks
  taskService: TaskService;
  dataCollectionService: DataCollectionService;
  // Upgrades
  private allUpgrades: Upgrade[];
  private unlockedUpgrades: Upgrade[];
  // Innovation Credits
  private innovationCredits: number;
  // visibility modifiers
  private commandLineVisible: boolean;
  private dataCollectionVisible: boolean;
  // private tasksVisible: boolean;
  // private upgradesVisible: boolean;
  // private fundsVisible: boolean;
  // private storageVisible: boolean;


  constructor() {
    super();
    this.funds = 0;
    this.data = 0;
    this.processingSpeed = 1; // Initial processing speed
    this.dataWarehouseCapacity = 10 * 1024; // 10 Gb in Mb
    this.innovationCredits = 0;
    
    this.allUpgrades = [];
    this.unlockedUpgrades = [];
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
    this.taskService = new TaskService(this);
    this.dataCollectionService = new DataCollectionService(this);
    this.dataCollections = Array.from({ length: 3 }).map(() => this.dataCollectionService.generateRandomDataCollection());
  }

  // Data Collections
  getDataCollections(): DataCollection[] { return this.dataCollections; }
  addDataCollection(dataCollection: DataCollection) { this.dataCollections.push(dataCollection); }
  removeDataCollection(id: string) {
    this.dataCollections = this.dataCollections.filter(collection => collection.id !== id);
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

  // Getters
  getFunds(): number { return this.funds; }
  getData(): number { return this.data; }
  getProcessingSpeed(): number { return this.processingSpeed; }
  getDataWarehouseCapacity(): number { return this.dataWarehouseCapacity; }
  getUpgrades(): Upgrade[] { return this.allUpgrades; }
  getInnovationCredits(): number { return this.innovationCredits; }

  // Setters
  addFunds(amount: number) {
    this.funds += amount;
    this.notifyListeners();
  }

  deductFunds(costs?: Cost[]) {
    if (!costs) return;
    costs.forEach(cost => {
      if (cost.type === 'funds') {
        this.funds -= cost.amount;
      } else if (cost.type === 'data') {
        this.data -= cost.amount;
      } else if (cost.type === 'innovationCredits') {
        this.innovationCredits -= cost.amount; // Assuming you have an innovationCredits property
      }
    });
    this.notifyListeners();
  }



  addUpgrade(upgrade: Upgrade) { this.allUpgrades.push(upgrade); }

  // Check if the player can afford a cost
  canAfford(costs?: Cost[]): boolean {
    if (!costs) return true;
    return costs.every(cost => {
      if (cost.type === 'funds') {
        return this.funds >= cost.amount;
      } else if (cost.type === 'data') {
        return this.data >= cost.amount;
      } else if (cost.type === 'innovationCredits') {
        return this.innovationCredits >= cost.amount;
      }
      return false;
    });
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
}