export interface Condition {
  type: string;
  value: string;
}

export interface NarrativeEvent {
  id: string;
  trigger: string;
  conditions: Condition[];
  message: string;
  delay?: number;
}