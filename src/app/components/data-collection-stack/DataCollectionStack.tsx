import * as React from 'react';
import Stack from '@mui/material/Stack';
import DataCollectionItem from '../data-collection-item/DataCollectionItem';
import { useGameState } from '../../contexts/GameStateContext';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";


interface DataCollection {
  id: number;
  name: string;
  size: number;
}

const initialDataCollections: DataCollection[] = [
  { id: 1, name: 'Data Collection 1', size: 3 },
  { id: 2, name: 'Data Collection 2', size: 4 },
  { id: 3, name: 'Data Collection 3', size: 5 },
];

const DataCollectionStack = React.forwardRef<HTMLDivElement, {}>(function DataCollectionStack(props, ref) {
  const gameState = useGameState();
  const [dataCollections, setDataCollections] = React.useState<DataCollection[]>(initialDataCollections);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  const handleComplete = (id: number) => {
    setDataCollections((prevCollections) => {
      const newCollections = prevCollections.filter(collection => collection.id !== id);
      const completedCollection = prevCollections.find(collection => collection.id === id);
      if (completedCollection) {
        gameState.addToWarehouse(completedCollection.size);
      }

      // Add new data collection with increased difficulty
      const newDataCollection = {
        id: new Date().getTime(), // Generate a unique ID
        name: `Data Collection ${Math.random()}`,
        size: newCollections[newCollections.length - 1].size, // + 1 for tests
      };

      return [...newCollections, newDataCollection];
    });

    setCurrentIndex((prevIndex) => prevIndex); // Adjust currentIndex if needed
  };

  return (
    <Stack {...props} spacing={2} ref={ref}>
      <AnimatePresence>
        {dataCollections.slice(currentIndex, currentIndex + 3).map((dataCollection, index) => (
          <DataCollectionItem
            key={dataCollection.id}
            dataCollectionName={dataCollection.name}
            dataCollectionSize={dataCollection.size}
            isProcessing={index === 0}
            processingSpeed={gameState.getProcessingSpeed()}
            onComplete={() => handleComplete(dataCollection.id)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layout
          />
        ))}
      </AnimatePresence>    
    </Stack>
  );
});

export default motion(DataCollectionStack);