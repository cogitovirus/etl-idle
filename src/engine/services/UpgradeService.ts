import { v4 as uuid4 } from "uuid";
import { Upgrade } from "../entities/Upgrade";
import { upgrades } from "../data/upgrades";
import { CoreState } from "../core/CoreState";
import { EventEmitter } from "../core/EventEmitter";

export class UpgradeService {
  private coreState: CoreState;
  private allUpgrades: Upgrade[];
  private availableUpgrades: Upgrade[];
  private eventEmitter: EventEmitter;
  private upgradeCheckInterval: any;

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.allUpgrades = this.loadUpgrades();
    this.availableUpgrades = this.allUpgrades.filter(upgrade => !upgrade.prerequisites?.length);
    this.eventEmitter = new EventEmitter();

    this.startUpgradeChecking();
  }

  loadUpgrades(): Upgrade[] {
    return upgrades.map((upgrade: any) => {
      return {
        ...upgrade,
        id: uuid4(),
        isPurchased: false,
      } as Upgrade;
    });
  }

  /**
   * Starts the interval for checking available upgrades.
   */
  private startUpgradeChecking() {
    this.upgradeCheckInterval = setInterval(() => {
      this.checkForAvailableUpgrades();
    }, 5000); // check for available upgrades every 5 seconds
  }

  checkForAvailableUpgrades() {
    const newlyAvailableUpgrades = this.allUpgrades.filter(upgrade => {
      if (!upgrade.prerequisites) return false; // No prerequisites means the upgrade is available by default
      if (this.availableUpgrades.includes(upgrade)) return false; // Skip already available upgrades
      if (upgrade.isPurchased) return false; // Skip purchased upgrades

      return upgrade.prerequisites.every(prerequisite => {
        // Check if all prerequisites are met
        return this.allUpgrades.some(u => u.id === prerequisite && u.isPurchased);
      });
    });

    if (newlyAvailableUpgrades.length > 0) {
      this.availableUpgrades = [...this.availableUpgrades, ...newlyAvailableUpgrades];
      newlyAvailableUpgrades.forEach(upgrade => {
        this.coreState.publishUnlockedFeature(upgrade.name);
      });
      this.notifyAboutUpgradesChange();
    }
  }

  getAvailableUpgrades(): Upgrade[] {
    return this.availableUpgrades.filter(upgrade => !upgrade.isPurchased);
  }

  purchaseUpgrade(upgradeId: string) {
    const upgrade = this.getAvailableUpgrades().find(u => u.id === upgradeId);
    if (upgrade && this.coreState.canAfford(upgrade.costs)) {
      upgrade.isPurchased = true;
      this.coreState.deductFunds(upgrade.costs);
      this.applyUpgradeEffects(upgrade);
      this.notifyAboutUpgradesChange();
    }
  }

  private applyUpgradeEffects(upgrade: Upgrade) {
    upgrade.modifiers.forEach(modifier => {
      if (modifier.type === 'speed') {
        this.coreState.increaseProcessingSpeed(modifier.value);
      } else if (modifier.type === 'capacity') {
        this.coreState.increaseDataWarehouseCapacity(modifier.value);
      }
      // Add other modifier types as needed
    });
  }

  /**
   * Event emitter
   */

  private notifyAboutUpgradesChange() {
    this.eventEmitter.notifyListeners();
  }

  subscribeToUpgradesChanges(listener: () => void) {
    this.eventEmitter.subscribe(listener);
  }

  unsubscribeFromUpgradesChanges(listener: () => void) {
    this.eventEmitter.unsubscribe(listener);
  }
}