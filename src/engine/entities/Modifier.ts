export interface Modifier {
  type: 'speed' | 'cost' | 'efficiency' | 'research';
  value: number;
  duration?: number; // Duration of the modifier effect if temporary
}