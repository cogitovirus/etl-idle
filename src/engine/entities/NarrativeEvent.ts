export interface NarrativeEvent {
  id: string;
  trigger: TriggerType;
  conditions: Condition[];
  message: string;
  delay?: number;
}

export type TriggerType = 'funds_reached' | 'upgrade_bought' | 'task_unlocked' | 'play_time' | 'data_processed';
export type TriggerValue = number | string;
export type StateValues = { [key: string]: TriggerValue };


export interface Condition {
  type: string;
  value: string;
}
