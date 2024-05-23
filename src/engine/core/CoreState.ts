import { DataCollectionService } from "../services/DataCollectionService";
import { Upgrade } from "../entities/Upgrade";
import { TaskService } from "../services/TaskService";
import { Cost } from "../entities/Cost";
import { EventEmitter } from "./EventEmitter";


export class CoreState {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private innovationCredits: number;
  private playTime: number;
  private allUnlockedFeatures: string[];
  // Services
  taskService: TaskService;
  dataCollectionService: DataCollectionService;
  // Event emitters
  eventEmitter: EventEmitter;
  // Visibility modifiers
  private commandLineVisible: boolean;
  private dataCollectionVisible: boolean;

  constructor() {
    this.funds = 0;
    this.data = 0;
    this.processingSpeed = 1; // Initial processing speed
    this.dataWarehouseCapacity = 10 * 1024; // 10 Gb in Mb
    this.innovationCredits = 0;
    this.allUnlockedFeatures = [];
    this.playTime = Date.now();
    // Services
    this.taskService = new TaskService(this);
    this.dataCollectionService = new DataCollectionService(this);
    // Event emitters
    this.eventEmitter = new EventEmitter();
    // Visibility modifiers
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
  }

  /**
   * Funds
   */

  getFunds(): number { return this.funds; }

  addFunds(amount: number) {
    this.funds += amount;
    this.notifyAboutCoreStateChange();
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
    this.notifyAboutCoreStateChange();
  }

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

  /**
   * Data
   */

  getData(): number { return this.data; }

  addDataToWarehouse(dataSize: number) {
    if (this.data + dataSize <= this.dataWarehouseCapacity) {
      this.data += dataSize;
    } else {
      this.data = this.dataWarehouseCapacity; // Cap at warehouse capacity
    }
    this.notifyAboutCoreStateChange();
  }

  exchangeDataForFunds(amount: number) {
    if (this.data >= amount) {
      this.data -= amount;
      this.addFunds(amount); // TODO: Modify exchange rate. right now: 1 Mb = $1
    }
  }

  /**
   * Processing speed
   */
  getProcessingSpeed(): number { return this.processingSpeed; }

  increaseProcessingSpeed(amount: number) {
    this.processingSpeed += amount;
    this.notifyAboutCoreStateChange();
  }


  increaseWarehouseCapacity(amount: number) {
    this.dataWarehouseCapacity += amount;
    this.notifyAboutCoreStateChange();
  }

  /**
   * Data Warehouse
   */

  getDataWarehouseCapacity(): number { return this.dataWarehouseCapacity; }


  /**
   * Innovation Credits
   */

  getInnovationCredits(): number { return this.innovationCredits; }

  /**
   * Core State Change Event Emitter
   */

  subscribeToCoreStateChanges(listener: () => void) {
    this.eventEmitter.subscribe(listener);
  }

  unsubscribeFromCoreStateChanges(listener: () => void) {
    this.eventEmitter.unsubscribe(listener);
  }

  notifyAboutCoreStateChange() {
    this.eventEmitter.notifyListeners();
  }

  // other methods...
  getPlayTime(): number { return this.playTime; }
  isFeatureUnlocked(feature: string): boolean { return this.allUnlockedFeatures.includes(feature); }
}