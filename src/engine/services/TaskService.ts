import { v4 as uuid4 } from "uuid";
import { Task } from "../entities/Task";
import tasksJson from "../data/tasks.json";
import { GameState } from "../core/GameState";
import { BaseService } from "./BaseService";


export class TaskService extends BaseService {
  private gameState: GameState;
  private allTasks: Task[];
  private unlockedTasks: Task[];

  constructor(gameState: GameState) {
    super();
    this.gameState = gameState;
    this.allTasks = this.loadTasks();
    this.unlockedTasks = this.allTasks.filter(task => !task.prerequisites?.length);
    this.notifyListeners();
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

    this.unlockedTasks = [...this.unlockedTasks, ...newlyUnlockedTasks];
    this.notifyListeners();
  }

  getUnlockedTasks(): Task[] {
    return this.unlockedTasks;
  }

  startTask(taskId: string) {
    const task = this.getUnlockedTasks().find(t => t.id === taskId);
    if (task && this.gameState.canAfford(task.cost)) {
      this.deactivateAllTasks();
      task.isActive = true;
      task.status = 'In Progress';
      this.gameState.deductFunds(task.cost);
      this.notifyListeners();
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
          task.timeLeft = task.iterationTime; // Reset for next iteration
        }
      }
    });
    this.notifyListeners();
  }

  completeTask(taskId: string) {
    const task = this.getUnlockedTasks().find(t => t.id === taskId);
    if (task) {
      // Apply results
      task.results.forEach(result => {
        if (result.type === 'funds') {
          this.gameState.addFunds(result.amount);
        } else if (result.type === 'data') {
          this.gameState.addToWarehouse(result.amount);
        }
      });

      // Apply modifiers
      task.modifiers.forEach(modifier => {
        if (modifier.type === 'speed') {
          this.gameState.increaseProcessingSpeed(modifier.value);
        }
        // other modifier types...
      });


      task.xp += task.xp; // Increase XP for the task
      this.levelUpTask(task);
      this.gameState.notifyListeners();
      this.notifyListeners();
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
}
