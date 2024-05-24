import { v4 as uuidv4 } from 'uuid';
import NarrativeEvent from '../entities/NarrativeEvent';

const narrativeEvents: NarrativeEvent[] = [
  {
    id: uuidv4(),
    trigger: 'funds_reached',
    condition: { type: 'funds', value: 1000 },
    message: "You have reached $1000! Keep going!",
    delay: 0
  },
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
  {
    id: uuidv4(),
    trigger: 'play_time',
    condition: { type: 'time', value: 300 },
    message: "You've been playing for 5 minutes! Time flies when you're processing data!",
    delay: 0
  }
];

export default narrativeEvents;
