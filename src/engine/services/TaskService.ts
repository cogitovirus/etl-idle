import { v4 as uuid4 } from "uuid";
import { Task } from "../entities/Task";
import tasksJson from "../data/tasks.json";
import { CoreState } from "../core/CoreState";
import { EventEmitter } from "../core/EventEmitter";


export class TaskService {
  private coreState: CoreState;
  private allTasks: Task[];
  private unlockedTasks: Task[];
  private eventEmitter: EventEmitter;
  private taskCheckInterval: any;
  private taskProcessInterval: any;

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.allTasks = this.loadTasks();
    this.unlockedTasks = this.allTasks.filter(task => !task.prerequisites?.length);
    this.eventEmitter = new EventEmitter();

    this.startTaskProcessing();
    this.startTaskChecking();
  }

  loadTasks(): Task[] {
    return tasksJson.map((task: any) => {
      return {
        ...task,
        id: uuid4(),
        isActive: false,
        timeLeft: task.iterationTime,
        status: 'Not Started',
        level: 0,
      } as Task;
    });
  }

  /**
   * Starts the interval for processing tasks.
   */
  private startTaskProcessing() {
    this.taskProcessInterval = setInterval(() => {
      this.processTasks(1); // process tasks every second
    }, 1000);
  }

  /**
   * Starts the interval for checking unlockable tasks.
   */
  private startTaskChecking() {
    this.taskCheckInterval = setInterval(() => {
      this.checkForUnlockedTasks();
    }, 5000); // check for unlockable tasks every 5 seconds
  }

  checkForUnlockedTasks() {
    const newlyUnlockedTasks = this.allTasks.filter(task => {
      if (!task.prerequisites) return false; // No prerequisites means the task is unlocked by default
      if (this.unlockedTasks.includes(task)) return false; // Skip already unlocked tasks

      return task.prerequisites.every(prerequisite => {
        // Check if all prerequisites are met
        // TODO: implement logic to check if the player has completed the prerequisite tasks
        // return this.upgrades.some(upgrade => upgrade.id === prerequisite);
      });
    });

    if (newlyUnlockedTasks.length > 0) {
      this.unlockedTasks = [...this.unlockedTasks, ...newlyUnlockedTasks];
      this.notifyAboutTasksChange();
      this.coreState.notifyAboutCoreStateChange();
    }
  }

  getUnlockedTasks(): Task[] {
    return this.unlockedTasks;
  }

  startTask(taskId: string) {
    const task = this.getUnlockedTasks().find(t => t.id === taskId);
    if (task && this.coreState.canAfford(task.costs)) {
      this.deactivateAllTasks();
      task.isActive = true;
      task.status = 'In Progress';
      this.coreState.deductFunds(task.costs);
      this.notifyAboutTasksChange();
    }
  }

  deactivateAllTasks() {
    this.unlockedTasks.forEach(task => {
      task.isActive = false;
      task.status = 'Not Started';
      task.timeLeft = task.iterationTime;
    });
  }

  processTasks(deltaTimeInSeconds: number) {
    this.getUnlockedTasks().forEach(task => {
      if (task.isActive && task.status === 'In Progress') {
        task.timeLeft -= deltaTimeInSeconds;
        if (task.timeLeft <= 0) {
          this.completeTask(task.id);
          if (this.coreState.canAfford(task.costs)) {
            task.timeLeft = task.iterationTime; // Reset for next iteration
            this.coreState.deductFunds(task.costs);
          } else {
            task.isActive = false;
            task.status = 'Not Started';
          }
          return;
        }
      }
    });
    this.notifyAboutTasksChange();
  }

  completeTask(taskId: string) {
    const task = this.getUnlockedTasks().find(t => t.id === taskId);
    if (task) {
      // Apply results
      task.results.forEach(result => {
        if (result.type === 'funds') {
          this.coreState.addFunds(result.amount);
        } else if (result.type === 'data') {
          this.coreState.addDataToWarehouse(result.amount);
        }
      });

      // Apply modifiers
      task.modifiers.forEach(modifier => {
        if (modifier.type === 'speed') {
          this.coreState.increaseProcessingSpeed(modifier.value);
        }
        // other modifier types...
      });

      task.xp += task.xp; // Increase XP for the task
      this.levelUpTask(task);
      this.notifyAboutTasksChange();
    }
  }

  private levelUpTask(task: Task) {
    // TODO: Implement logic for leveling up the task based on XP or other criteria
    const xpThreshold = 1000;
    if (task.xp >= xpThreshold) {
      task.level += 1;
      task.xp = 0; // Reset XP after leveling up
      // Optionally enhance task's results or modifiers upon leveling up
    }
  }

  /**
   * Event emitter
   */

  private notifyAboutTasksChange() {
    this.eventEmitter.notifyListeners();
  }

  subscribeToTasksChanges(listener: () => void) {
    this.eventEmitter.subscribe(listener);
  }

  unsubscribeFromTasksChanges(listener: () => void) {
    this.eventEmitter.unsubscribe(listener);
  }
}
