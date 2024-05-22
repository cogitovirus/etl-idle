import { createContext } from 'react';
import { CoreState } from '../../engine/core/CoreState';

export const CoreStateContext = createContext<CoreState>(new CoreState());
