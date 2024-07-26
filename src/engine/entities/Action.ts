import { Result } from './Result';
import { Modifier } from './Modifier';
import { Cost } from './Cost';

export interface Action {
  id: string;
  name: string;
  quote: string;
  description: string;
  costs?: Cost[];
  results?: Result[];
  modifiers?: Modifier[];
  xp: number; // Experience points gained per iteration
  level: number; // Current level of the action
  prerequisites?: string[]; // Array of task names / upgrade names that need to be completed to unlock this task
}