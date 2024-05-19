import * as React from 'react';
import Stack from '@mui/material/Stack';
import DataCollectionItem from '../data-collection-item/DataCollectionItem';
import { useGameState } from '../../../contexts/GameStateContext';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { DataCollection } from '@engine/entities/DataCollection';
import { DataCollectionService } from '@/engine/services/DataCollectionService';


const dataCollectionService = new DataCollectionService();

const DataCollectionStack = React.forwardRef<HTMLDivElement, {}>(function DataCollectionStack(props, ref) {
  const { gameState } = useGameState();
  const [dataCollections, setDataCollections] = React.useState<DataCollection[]>(gameState.getDataCollections());
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    // Sync dataCollections with the gameState whenever gameState changes
    // Using setTimeout with a zero delay defers the state updates,
    // ensuring they don't interfere with the rendering phase of another component.
    setTimeout(() => {
      setDataCollections(gameState.getDataCollections());
    }, 0);
  }, [gameState]);

  const handleComplete = (dc: DataCollection) => {
    dataCollectionService.completeDataCollection(gameState, dc);
    dataCollectionService.generateNewCollection(gameState);
    setTimeout(() => {
      setDataCollections([...gameState.getDataCollections()]);
    }, 0);
    // setCurrentIndex((prevIndex) => prevIndex); // Adjust currentIndex if needed
  };

  return (
    <Stack {...props} spacing={1.5} ref={ref}>
      <AnimatePresence>
        {dataCollections.slice(currentIndex, currentIndex + 3).map((dataCollection, index) => (
          <DataCollectionItem
            key={dataCollection.id}
            dataCollection={dataCollection}
            isProcessing={index === 0}
            processingSpeed={gameState.getProcessingSpeed()}
            onComplete={() => handleComplete(dataCollection)}
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