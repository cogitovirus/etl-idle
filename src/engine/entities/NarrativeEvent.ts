export default interface NarrativeEvent {
  id: string;
  trigger: TriggerType;
  condition: Condition;
  message: string;
  delay?: number;
}

export type TriggerType =
  | 'funds_reached'
  | 'play_time'
  | 'innovation_points_reached'
  | 'data_wh_capacity_reached'
  | 'feature_unlocked'
  | 'processing_speed_changed'
  | 'custom_hook';

export interface Condition {
  type: string;
  value: TriggerValue;
}

export type TriggerValue = number | string;
