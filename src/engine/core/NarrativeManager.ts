import narrativeEventsJson from "../data/narrativeEvents.json";
import { NarrativeEvent, Condition, TriggerType, TriggerValue, StateValues } from "../entities/NarrativeEvent";
import { CoreState } from "./CoreState";
import { EventEmitter } from "./EventEmitter";


export class NarrativeManager {
  private coreState: CoreState;
  private narrativeQueue: NarrativeEvent[];
  private isProcessing: boolean = false;
  private eventEmitter: EventEmitter;
  private eventsByTrigger: Map<string, NarrativeEvent[]>;
  private defaultDelay: number = 2; // Default delay in seconds

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.eventEmitter = new EventEmitter();
    this.eventsByTrigger = this.loadEventsByTrigger();
    this.narrativeQueue = [];

    // Periodic checks for frequent updates
    // TODO: not sure if this is the way to do it
    // setInterval(this.periodicCheck.bind(this), 5000);
  }

  private loadEventsByTrigger(): Map<string, NarrativeEvent[]> {
    const eventsByTrigger = new Map<string, NarrativeEvent[]>();
    const narrativeEvents = narrativeEventsJson as NarrativeEvent[];

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

  /**
    * Checks and triggers narrative events based on the specified trigger type and state values.
    * @param {TriggerType} triggerType - The type of trigger to check (e.g., 'funds_reached', 'data_processed').
    * @param {StateValues} stateValues - The current state values to compare against event conditions.
    */
  private triggerNarrativeEvents(triggerType: TriggerType, stateValues: StateValues) {
    const events = this.eventsByTrigger.get(triggerType) || [];
    events.forEach(event => {
      if (this.checkConditions(event.conditions, stateValues)) {
        this.addMessage(event);
        // Remove event from eventsByTrigger to prevent it from triggering again
        this.eventsByTrigger.set(triggerType, events.filter(e => e.id !== event.id));
      }
    });
  }

  /**
     * Checks if the conditions for an event are met.
     * @param {Condition[]} conditions - The conditions to check.
     * @param {StateValues} stateValues - The current state values to compare against.
     * @returns {boolean} - True if all conditions are met, false otherwise.
     */
  private checkConditions(conditions: Condition[], stateValues: StateValues): boolean {
    return conditions.every(condition => {
      const value = stateValues[condition.type];
      return value !== undefined && value === condition.value;
    });
  }

    /**
   * Adds a message to the narrative queue and emits an event.
   * @param {NarrativeEvent} event - The narrative event to add.
   */
    private addMessage(event: NarrativeEvent) {
      const delay = event.delay !== undefined ? event.delay : this.defaultDelay;
      this.narrativeQueue.push(event);
      this.notifyAboutNewNarrative
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