// In upgrades.ts
import { v4 as uuidv4 } from 'uuid';
import { Upgrade } from '../entities/Upgrade';

export const upgrades: Upgrade[] = [
    {
        id: uuidv4(),
        name: "High-Speed Processor",
        description: "Enhances your system's processing capabilities, allowing for faster data analysis and more efficient operations.",
        quote: "Because waiting for your computer is like watching paint dry, except the paint is invisible and might be plotting world domination.",
        cost: { type: "funds", amount: 10 },
        effect: { type: 'increaseProcessingSpeed', amount: 0.5 },
        prerequisites: [],
        isPurchased: false
    },
    // You can now easily add multiple effects
    {
        id: uuidv4(),
        name: "Advanced Data Center",
        description: "Expands your data storage capacity and enhances processing speed, allowing for more comprehensive data analysis and faster computations.",
        quote: "It's like giving your computer a bigger brain and faster legs. Now it can remember more of your secrets and run away with them quicker!",
        cost: { type: "funds", amount: 20 },
        effect: [
            { type: 'increaseDataWarehouseCapacity', amount: 1024 },
            { type: 'increaseProcessingSpeed', amount: 0.2 }
        ],
        prerequisites: [],
        isPurchased: false
    },
    // Add more upgrades here...
];