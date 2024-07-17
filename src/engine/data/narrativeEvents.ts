import { v4 as uuidv4 } from 'uuid';
import NarrativeEvent from '../entities/NarrativeEvent';

const narrativeEvents: NarrativeEvent[] = [
  // main line
  {
    id: uuidv4(),
    trigger: 'play_time',
    condition: { type: 'time', value: 2 },
    message: "Welcome to ETL Idle! You're now the manager of a cutting-edge data processing facility. Your mission: transform raw data into valuable insights. Start small, think big, and watch your data empire grow!",
    delay: 0
  },
  {
    id: uuidv4(),
    trigger: 'play_time',
    condition: { type: 'time', value: 20 },
    message: "System notification: Two critical tasks available - 'Streamline Data Flow' and 'Data Brokerage'. Implementing these will significantly enhance operational efficiency and create new revenue streams. I Recommend immediate action to optimize your data infrastructure.",
    delay: 0
  },
  {
    id: uuidv4(),
    trigger: 'funds_reached',
    condition: { type: 'funds', value: 100 },
    message: "You have reached $100! Keep going!",
    delay: 0
  },
  // features
  {
    id: uuidv4(),
    trigger: 'feature_unlocked',
    condition: { type: 'item', value: 'high_speed_processor' },
    message: "High-Speed Processor upgrade acquired!",
    delay: 0
  },
  {
    id: uuidv4(),
    trigger: 'feature_unlocked',
    condition: { type: 'item', value: 'Data Brokerage' },
    message: "New task unlocked: Optimize Pipeline!",
    delay: 0
  },
  // play time
  {
    id: uuidv4(),
    trigger: 'play_time',
    condition: { type: 'time', value: 300 },
    message: "You've been playing for 5 minutes! Time flies when you're processing data!",
    delay: 0
  },
];

export default narrativeEvents;
