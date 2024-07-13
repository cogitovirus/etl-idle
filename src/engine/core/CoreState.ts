import { DataCollectionService } from "../services/DataCollectionService";
import { TaskService } from "../services/TaskService";
import { Cost } from "../entities/Cost";
import { EventEmitter } from "./EventEmitter";
import { NarrativeManager } from "./NarrativeManager";


export class CoreState {
  private funds: number;
  private data: number;
  private processingSpeed: number; // Processing speed in Mb/s
  private dataWarehouseCapacity: number; // Capacity in Mb
  private innovationCredits: number;
  private gameStartTime: number;
  private allUnlockedFeatures: string[];
  // Services
  taskService: TaskService;
  dataCollectionService: DataCollectionService;
  narrativeManager: NarrativeManager;
  // Event emitters
  // TODO: should be private ? and renamed to coreStateEmitter
  eventEmitter: EventEmitter;
  private fundsEmitter: EventEmitter;
  private dataEmitter: EventEmitter;
  private processingSpeedEmitter: EventEmitter;
  private dataWarehouseCapacityEmitter: EventEmitter;
  private innovationCreditsEmitter: EventEmitter;
  private playTimeEmitter: EventEmitter;
  private featuresEmitter: EventEmitter;
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
    this.gameStartTime = Date.now();
    // Event emitters
    this.eventEmitter = new EventEmitter();
    this.fundsEmitter = new EventEmitter();
    this.dataEmitter = new EventEmitter();
    this.processingSpeedEmitter = new EventEmitter();
    this.dataWarehouseCapacityEmitter = new EventEmitter();
    this.innovationCreditsEmitter = new EventEmitter();
    this.playTimeEmitter = new EventEmitter();
    this.featuresEmitter = new EventEmitter();
    // Visibility modifiers
    this.commandLineVisible = true;
    this.dataCollectionVisible = true;
    // Services
    this.taskService = new TaskService(this);
    this.dataCollectionService = new DataCollectionService(this);
    this.narrativeManager = new NarrativeManager(this);
    // Notify about playtime change every 5 seconds
    this.notifyAboutPlayTimeChange();
  }

  /**
   * Funds
   */

  getFunds(): number { return this.funds; }

  addFunds(amount: number) {
    this.funds += amount;
    this.notifyAboutFundsChange();
    this.notifyAboutCoreStateChange();
  }

  deductFunds(costs?: Cost[]) {
    if (!costs) return;
    costs.forEach(cost => {
      if (cost.type === 'funds') {
        this.funds -= cost.amount;
        this.notifyAboutFundsChange();
      } else if (cost.type === 'data') {
        this.data -= cost.amount;
      } else if (cost.type === 'innovationCredits') {
        this.innovationCredits -= cost.amount;
        this.notifyAboutInnovationCreditsChange();
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
      this.notifyAboutCoreStateChange();
    }
  }

  /**
   * Processing speed
   */
  getProcessingSpeed(): number { return this.processingSpeed; }

  increaseProcessingSpeed(amount: number) {
    this.processingSpeed += amount;
    this.notifyAboutProcessingSpeedChange();
    this.notifyAboutCoreStateChange();
  }


  increaseWarehouseCapacity(amount: number) {
    this.dataWarehouseCapacity += amount;
    this.notifyAboutDataWarehouseCapacityChange();
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
   * TODO: this is making a lot of clutter. consider moving to a separate file
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

  // Subscribe methods for granular event emitters
  subscribeToFundsChanges(listener: () => void) {
    this.fundsEmitter.subscribe(listener);
  }

  subscribeToProcessingSpeedChanges(listener: () => void) {
    this.processingSpeedEmitter.subscribe(listener);
  }

  subscribeToDataWarehouseCapacityChanges(listener: () => void) {
    this.dataWarehouseCapacityEmitter.subscribe(listener);
  }

  subscribeToInnovationCreditsChanges(listener: () => void) {
    this.innovationCreditsEmitter.subscribe(listener);
  }

  subscribeToPlayTimeChanges(listener: () => void) {
    this.playTimeEmitter.subscribe(listener);
  }

  subscribeToFeaturesChanges(listener: () => void) {
    this.featuresEmitter.subscribe(listener);
  }

  // Notify methods for granular event emitters
  private notifyAboutFundsChange() {
    this.fundsEmitter.notifyListeners();
  }

  private notifyAboutProcessingSpeedChange() {
    this.processingSpeedEmitter.notifyListeners();
  }

  private notifyAboutDataWarehouseCapacityChange() {
    this.dataWarehouseCapacityEmitter.notifyListeners();
  }

  private notifyAboutInnovationCreditsChange() {
    this.innovationCreditsEmitter.notifyListeners();
  }

  private notifyAboutFeaturesChange() {
    this.featuresEmitter.notifyListeners();
  }

  private notifyAboutPlayTimeChange() {
    // notify about playtime change every 5 seconds
    setInterval(() => {
      console.log('Notifying about playtime change');
      this.playTimeEmitter.notifyListeners();
    }, 5000);
  }

  // other methods...
  getPlayTime(): number { return (Date.now() - this.gameStartTime)/1000; }
  isFeatureUnlocked(feature: string): boolean { return this.allUnlockedFeatures.includes(feature); }
  publishUnlockedFeature(feature: string) {
    this.allUnlockedFeatures.push(feature);
    this.notifyAboutFeaturesChange();
  }
}