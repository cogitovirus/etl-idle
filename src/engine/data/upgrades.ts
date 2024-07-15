import { v4 as uuidv4 } from 'uuid';
import { Upgrade } from '../entities/Upgrade';


export const upgrades: Upgrade[] = [
    {
        id: uuidv4(),
        name: "High-Speed Processor",
        cost: { type: "funds", amount: 10 },
        effect: (state) => { state.increaseProcessingSpeed(0.5) }
    },
];