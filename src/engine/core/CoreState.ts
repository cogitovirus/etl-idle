import { v4 as uuid4 } from "uuid";
import { DataCollection } from "../entities/DataCollection";
import { DataCollectionService } from "../services/DataCollectionService";
import { Upgrade } from "../entities/Upgrade";
import { TaskService } from "../services/TaskService";
import { Cost } from "../entities/Cost";
import { StateChangeEventEmitter } from "./StateChangeEventEmitter";
import { NarrativeEventEmitter } from "./NarrativeEventEmitter";


export class CoreState {
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
  // Event emitters
  stateChangeEmitter: StateChangeEventEmitter;
  narrativeEventEmitter: NarrativeEventEmitter;

  constructor() {
    this.funds = 0;
    this.data = 0;
    this.processingSpeed = 1; // Initial processing speed
    this.dataWarehouseCapacity = 10 * 1024; // 10 Gb in Mb
    this.innovationCredits = 0;

    this.stateChangeEmitter = new StateChangeEventEmitter();
    this.narrativeEventEmitter = new NarrativeEventEmitter();

    this.allUpgrades = [];
    this.unlockedUpgrades = [];
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
    this.taskService = new TaskService(this);
    this.dataCollectionService = new DataCollectionService(this);
    this.dataCollections = Array.from({ length: 3 }).map(() => this.dataCollectionService.generateRandomDataCollection());
  }

  // Narrative Event Methods
  subscribeToNarrative(listener: (message: string) => void) {
    this.narrativeEventEmitter.subscribe(listener);
  }

  notifyNarrative(message: string) {
    this.narrativeEventEmitter.notifyListeners(message);
  }

  // State Change Event Methods
  subscribeToStateChanges(listener: () => void) {
    this.stateChangeEmitter.subscribe(listener);
  }

  unsubscribeFromStateChanges(listener: () => void) {
    this.stateChangeEmitter.unsubscribe(listener);
  }

  notifyStateChange() {
    this.stateChangeEmitter.notifyListeners();
  }

  // Data Collections
  getDataCollections(): DataCollection[] { return this.dataCollections; }
  addDataCollection(dataCollection: DataCollection) { this.dataCollections.push(dataCollection); }
  removeDataCollection(id: string) {
    this.dataCollections = this.dataCollections.filter(collection => collection.id !== id);
  }

  addDataToWarehouse(dataSize: number) {
    if (this.data + dataSize <= this.dataWarehouseCapacity) {
      this.data += dataSize;
    } else {
      this.data = this.dataWarehouseCapacity; // Cap at warehouse capacity
    }
    this.notifyStateChange();
  }

  // Getters
  getData(): number { return this.data; }
  getProcessingSpeed(): number { return this.processingSpeed; }
  getDataWarehouseCapacity(): number { return this.dataWarehouseCapacity; }
  getUpgrades(): Upgrade[] { return this.allUpgrades; }
  getInnovationCredits(): number { return this.innovationCredits; }
  // Funds
  getFunds(): number { return this.funds; }

  addFunds(amount: number) {
    this.funds += amount;
    this.notifyStateChange();
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
    this.notifyStateChange();
  }

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


  addUpgrade(upgrade: Upgrade) { this.allUpgrades.push(upgrade); }


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
    this.notifyStateChange();
  }

  increaseWarehouseCapacity(amount: number) {
    this.dataWarehouseCapacity += amount;
    this.notifyStateChange();
  }

  // TODO: I don't even remember why I need this - inspect
  updateGameState(deltaTime: number) {
    const deltaTimeInSeconds = deltaTime / 1000;
    this.taskService.processTasks(deltaTimeInSeconds);
    this.taskService.checkForUnlockedTasks();
  }
}