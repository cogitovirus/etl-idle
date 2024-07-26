import { v4 as uuid4 } from "uuid";
import { Task } from "../entities/Task";
import { actions } from "../data/actions";
import { CoreState } from "../core/CoreState";
import { EventEmitter } from "../core/EventEmitter";

export class ActionService {
  private coreState: CoreState;
  private allActions: Task[];
  private availableActions: Task[];
  private eventEmitter: EventEmitter;
  private actionCheckInterval: any;

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.allActions = this.loadActions();
    this.availableActions = this.allActions.filter(action => !action.prerequisites?.length);
    this.eventEmitter = new EventEmitter();

    this.startActionChecking();
  }

  loadActions(): Task[] {
    return actions.map((action: any) => {
      return {
        ...action,
        id: uuid4(),
        level: 0,
        xp: 0, // Actions don't accumulate XP, but we keep this for interface consistency
      } as Task;
    });
  }

  private startActionChecking() {
    this.actionCheckInterval = setInterval(() => {
      this.checkForAvailableActions();
    }, 5000); // check for available actions every 5 seconds
  }

  checkForAvailableActions() {
    const newlyAvailableActions = this.allActions.filter(action => {
      if (!action.prerequisites) return false;
      if (this.availableActions.includes(action)) return false;

      return action.prerequisites.every(prerequisite => {
        // Check if all prerequisites are met
        // This could check for completed tasks, purchased upgrades, or other game state conditions
        return this.coreState.isFeatureUnlocked(prerequisite);
      });
    });

    if (newlyAvailableActions.length > 0) {
      this.availableActions = [...this.availableActions, ...newlyAvailableActions];
      newlyAvailableActions.forEach(action => {
        this.coreState.publishUnlockedFeature(action.name);
      });
      this.notifyAboutActionsChange();
    }
  }

  getAvailableActions(): Task[] {
    return this.availableActions;
  }

  performAction(actionId: string) {
    const action = this.getAvailableActions().find(a => a.id === actionId);
    if (action && this.coreState.canAfford(action.costs)) {
      this.coreState.deductFunds(action.costs);
      this.applyActionEffects(action);
      this.notifyAboutActionsChange();
    }
  }

  private applyActionEffects(action: Task) {
    // Apply results
    if (action.results) {
      action.results.forEach(result => {
        if (result.type === 'funds') {
          this.coreState.addFunds(result.amount);
        } else if (result.type === 'data') {
          this.coreState.addDataToWarehouse(result.amount);
        }
        // Add other result types as needed
      });
    }

    if (action.modifiers) {
      // Apply modifiers
      action.modifiers.forEach(modifier => {
        if (modifier.type === 'speed') {
          this.coreState.increaseProcessingSpeed(modifier.value);
        }
        // Add other modifier types as needed
      });
    }

    this.coreState.notifyAboutCoreStateChange();
  }

  private removeAction(actionId: string) {
    this.availableActions = this.availableActions.filter(a => a.id !== actionId);
  }

  private notifyAboutActionsChange() {
    this.eventEmitter.notifyListeners();
  }

  subscribeToActionsChanges(listener: () => void) {
    this.eventEmitter.subscribe(listener);
  }

  unsubscribeFromActionsChanges(listener: () => void) {
    this.eventEmitter.unsubscribe(listener);
  }
}