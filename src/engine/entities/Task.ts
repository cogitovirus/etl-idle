import { Result } from './Result';
import { Modifier } from './Modifier';

export interface Task {
  id: string;
  name: string;
  quote: string;
  description: string;
  cost?: number;
  processCost?: number;
  results: Result[];
  modifiers: Modifier[];
  iterationTime: number; // Duration in seconds for each iteration
  xp: number; // Experience points gained per iteration
  level: number; // Current level of the task
  isActive: boolean;
  timeLeft: number; // Time left to complete the current iteration in seconds
  status: 'Not Started' | 'In Progress' | 'Completed';
  prerequisites?: string[]; // Array of task ids that need to be completed to unlock this task
}