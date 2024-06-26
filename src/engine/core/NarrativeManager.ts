import narrativeEvents from "../data/narrativeEvents";
import NarrativeEvent, { Condition, TriggerType, TriggerValue } from "../entities/NarrativeEvent";
import { CoreState } from "./CoreState";
import { EventEmitter } from "./EventEmitter";


export class NarrativeManager {
  private coreState: CoreState;
  private narrativeQueue: NarrativeEvent[];
  private isProcessing: boolean = false;
  private eventEmitter: EventEmitter;
  private eventsByTrigger: Map<string, NarrativeEvent[]>;
  private defaultDelay: number = 2; // Default delay in seconds
  private eventQueue: TriggerType[]
  private maxBatchSize: number = 10;

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.eventEmitter = new EventEmitter();
    this.eventsByTrigger = this.loadEventsByTrigger();
    this.eventQueue = [];
    this.narrativeQueue = [];
    this.subscribeToCoreStateChanges();
  }

  private loadEventsByTrigger(): Map<string, NarrativeEvent[]> {
    const eventsByTrigger = new Map<string, NarrativeEvent[]>();

    narrativeEvents.forEach(event => {
      // Check if the trigger type is already a key in the map
      if (!eventsByTrigger.has(event.trigger)) {
        // If not, set it with an empty array
        eventsByTrigger.set(event.trigger, []);
      }
      // Push the event into the array for this trigger
      eventsByTrigger.get(event.trigger)!.push(event);
    });

    return eventsByTrigger;
  }

  // TODO: types instead of strings ?
  private subscribeToCoreStateChanges() {
    this.coreState.subscribeToFundsChanges(() => this.handleCoreStateEvent('funds_reached'));
    this.coreState.subscribeToProcessingSpeedChanges(() => this.handleCoreStateEvent('processing_speed_changed'));
    this.coreState.subscribeToDataWarehouseCapacityChanges(() => this.handleCoreStateEvent('data_wh_capacity_reached'));
    this.coreState.subscribeToInnovationCreditsChanges(() => this.handleCoreStateEvent('innovation_points_reached'));
    this.coreState.subscribeToPlayTimeChanges(() => this.handleCoreStateEvent('play_time'));
    this.coreState.subscribeToFeaturesChanges(() => this.handleCoreStateEvent('feature_unlocked'));
  }

  private handleCoreStateEvent(triggerType: TriggerType) {
    this.eventQueue.push(triggerType);
    if (this.eventQueue.length >= this.maxBatchSize) {
      this.processEventQueue();
    }
  }

  private processEventQueue() {
    const uniqueTriggerTypes = Array.from(new Set(this.eventQueue));
    // Always include play_time in the unique trigger types
    uniqueTriggerTypes.push('play_time');
    uniqueTriggerTypes.forEach(triggerType => {
      this.checkAndPushUnlockedEventsToQueueByTriggerType(triggerType);
    });
    this.eventQueue = [];
  }


  private checkAndPushUnlockedEventsToQueueByTriggerType(triggerType: TriggerType) {
    const events = this.eventsByTrigger.get(triggerType) || [];
    events.forEach(event => {
      if (this.checkCondition(triggerType, event.condition)) {
        this.pushMessage(event);
        // Remove event from eventsByTrigger to prevent it from triggering again
        this.eventsByTrigger.set(triggerType, events.filter(e => e.id !== event.id));
      }
    });
  }


  /**
   * Checks if the condition for an event is met based on the trigger type.
   * @param {TriggerType} triggerType - The type of trigger to check.
   * @param {Condition} condition - The condition to check.
   * @returns {boolean} - True if the condition is met, false otherwise.
   */
  private checkCondition(triggerType: TriggerType, condition: Condition): boolean {
    switch (triggerType) {
      case 'funds_reached':
        return this.isNumber(condition.value) && this.coreState.getFunds() >= condition.value;
      case 'play_time':
        return this.isNumber(condition.value) && this.coreState.getPlayTime() >= condition.value;
      case 'innovation_points_reached':
        return this.isNumber(condition.value) && this.coreState.getInnovationCredits() >= condition.value;
      case 'data_wh_capacity_reached':
        return this.isNumber(condition.value) && this.coreState.getDataWarehouseCapacity() >= condition.value;
      case 'feature_unlocked':
        return this.isString(condition.value) && this.coreState.isFeatureUnlocked(condition.value);
      case 'custom_hook':
        // TODO: Placeholder for custom hook logic
        return false; // Replace with actual custom hook logic
      default:
        return false;
    }
  }

  private isNumber(value: TriggerValue): value is number {
    return typeof value === 'number';
  }
  
  private isString(value: TriggerValue): value is string {
    return typeof value === 'string';
  }

    /**
   * Adds a message to the narrative queue and emits an event.
   * @param {NarrativeEvent} event - The narrative event to add.
   */
    private pushMessage(event: NarrativeEvent) {
      // TODO: wait here on in the component ?
      const delay = event.delay !== undefined ? event.delay : this.defaultDelay;
      this.narrativeQueue.push(event);
      this.notifyAboutNewNarrative();
    }

  /**
   * Narrative Event Emitter
   */

  subscribeToNarrativeEvents(listener: () => void) {
    this.eventEmitter.subscribe(listener);
  }

  unsubscribeFromNarrativeEvents(listener: () => void) {
    this.eventEmitter.unsubscribe(listener);
  }

  notifyAboutNewNarrative() {
    this.eventEmitter.notifyListeners();
  }
}