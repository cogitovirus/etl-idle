import { NarrativeManager } from './NarrativeManager'
import { CoreState } from './CoreState';
import { EventEmitter } from './EventEmitter';
import { Condition, NarrativeEvent, StateValues } from '../entities/NarrativeEvent';

describe('NarrativeManager', () => {
  let narrativeManager: NarrativeManager;
  let coreState: CoreState;
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    coreState = new CoreState(); // Mock or create a real CoreState as needed
    eventEmitter = new EventEmitter(); // Mock or create a real EventEmitter as needed
    narrativeManager = new NarrativeManager(coreState);
  });

  describe('checkConditions', () => {
    it('should return true when all conditions are met', () => {
      const conditions: Condition[] = [
        { type: 'task', value: 'Data Brokerage' },
        { type: 'time', value: 300 }
      ];

      const stateValues: StateValues = {
        task: 'Data Brokerage',
        time: 300
      };

      const result = (narrativeManager as any).checkConditions(conditions, stateValues);
      expect(result).toBe(true);
    });

    it('should return false when any condition is not met', () => {
      const conditions: Condition[] = [
        { type: 'task', value: 'Data Brokerage' },
        { type: 'time', value: 300 }
      ];

      const stateValues: StateValues = {
        task: 'Data Brokerage',
        time: 100 // This does not match the condition
      };

      const result = (narrativeManager as any).checkConditions(conditions, stateValues);
      expect(result).toBe(false);
    });

    it('should return false when a condition is missing in stateValues', () => {
      const conditions: Condition[] = [
        { type: 'task', value: 'Data Brokerage' },
        { type: 'time', value: 300 }
      ];

      const stateValues: StateValues = {
        task: 'Data Brokerage'
        // 'time' is missing
      };

      const result = (narrativeManager as any).checkConditions(conditions, stateValues);
      expect(result).toBe(false);
    });
  });
});
