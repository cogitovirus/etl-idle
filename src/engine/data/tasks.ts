import { v4 as uuidv4 } from 'uuid';
import { Task } from '../entities/Task';

export const tasks: Task[] = [
  {
    id: uuidv4(),
    name: "Streamline Data Flow",
    quote: "It's not glamorous, but someone's got to do it.",
    description: "Implement measures to improve processing efficiency.",
    costs: [],
    processCosts: [],
    results: [{ type: "data", amount: 20 }],
    modifiers: [{ type: "speed", value: 0.01 }],
    iterationTime: 10,
    xp: 0,
    level: 0,
    isActive: false,
    timeLeft: 10,
    status: 'Not Started',
    prerequisites: []
  },
  {
    id: uuidv4(),
    name: "Data Brokerage",
    quote: "Turning ones and zeros into ones and zeros in your bank account.",
    description: "Convert your processed data into cold, hard cash.",
    costs: [
      { type: "data", amount: 10 }
    ],
    processCosts: [],
    results: [{ type: "funds", amount: 10 }],
    modifiers: [],
    iterationTime: 3,
    xp: 10,
    level: 0,
    isActive: false,
    timeLeft: 3,
    status: 'Not Started',
    prerequisites: []
  }
];
