import { Upgrade } from "../entities/Upgrade";
import { upgrades } from "../data/upgrades";
import { Cost } from "../entities/Cost";
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
            return { ...upgrade } as Upgrade;
        });
    }

    private startUpgradeChecking() {
        this.upgradeCheckInterval = setInterval(() => {
            this.checkForAvailableUpgrades();
        }, 5000);
    }

    checkForAvailableUpgrades() {
        const newlyAvailableUpgrades = this.allUpgrades.filter(upgrade => {
            if (!upgrade.prerequisites) return false;
            if (this.availableUpgrades.includes(upgrade)) return false;
            if (upgrade.isPurchased) return false;

            return upgrade.prerequisites.every(prerequisite => {
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
        if (upgrade && this.coreState.canAfford(upgrade.cost)) {
            upgrade.isPurchased = true;
            this.coreState.deductFunds(upgrade.cost);
            this.applyUpgradeEffects(upgrade);
            this.notifyAboutUpgradesChange();
        }
    }

    // In UpgradeService.ts
    private applyUpgradeEffects(upgrade: Upgrade) {
        const effects = Array.isArray(upgrade.effect) ? upgrade.effect : [upgrade.effect];
        effects.forEach(effect => {
            switch (effect.type) {
                case 'increaseProcessingSpeed':
                    this.coreState.increaseProcessingSpeed(effect.amount);
                    break;
                case 'increaseDataWarehouseCapacity':
                    this.coreState.increaseWarehouseCapacity(effect.amount);
                    break;
                case 'addFunds':
                    this.coreState.addFunds(effect.amount);
                    break;
                // Add more cases as needed
            }
        });
        this.coreState.notifyAboutCoreStateChange();
    }

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