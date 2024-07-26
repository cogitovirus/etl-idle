import { Action } from "../entities/Action";
import { v4 as uuidv4 } from 'uuid';

export const actions: Action[] = [
    {
        id: uuidv4(),
        name: "Caffeinate the Servers",
        quote: "Who knew silicon could get the jitters?",
        description: "Pump liquid caffeine directly into the server cooling system. It's not FDA approved, but boy does it speed things up!",
        modifiers: [{ type: "speed", value: 0.002 }],
        xp: 0,
        level: 0,
        prerequisites: []
    }
];
