import narrativeEventsJson from "../data/narrativeEvents.json";
import { NarrativeEvent, Condition, TriggerType, TriggerValue, StateValues } from "../entities/NarrativeEvent";
import { CoreState } from "./CoreState";
import { EventEmitter } from "./EventEmitter";


export class NarrativeManager {
  private coreState: CoreState;
  private narrativeQueue: NarrativeEvent[];
  private narrativeEvents: NarrativeEvent[];
  private isProcessing: boolean = false;
  private eventEmitter: EventEmitter;
  private eventsByTrigger: Map<string, NarrativeEvent[]>;
  private defaultDelay: number = 2; // Default delay in seconds

  constructor(coreState: CoreState) {
    this.coreState = coreState;
    this.eventEmitter = new EventEmitter();
    this.eventsByTrigger = this.loadEventsByTrigger();

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




}