import { DataCollection } from '@engine/entities/DataCollection';
import Stack from '@mui/material/Stack';
import { AnimatePresence, motion } from "framer-motion";
import * as React from 'react';
import { useGameState } from '../../../contexts/GameStateContext';
import dynamic from 'next/dynamic'


const NoSSRDataCollectionItem = dynamic(() => import('../data-collection-item/DataCollectionItem'), { ssr: false })

const DataCollectionStack = React.forwardRef<HTMLDivElement, {}>(function DataCollectionStack(props, ref) {
  const { coreState } = useGameState();
  const [dataCollections, setDataCollections] = React.useState<DataCollection[]>(coreState.getDataCollections());
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    // Sync dataCollections with the gameState whenever gameState changes
    // Using setTimeout with a zero delay defers the state updates,
    // ensuring they don't interfere with the rendering phase of another component.
    setTimeout(() => {
      setDataCollections(coreState.getDataCollections());
    }, 0);
  }, [coreState]);

  const handleComplete = (dc: DataCollection) => {
    coreState.dataCollectionService.completeDataCollection(dc);
    coreState.dataCollectionService.getAndPushNewCollection();
    setTimeout(() => {
      setDataCollections([...coreState.getDataCollections()]);
    }, 0);
    // setCurrentIndex((prevIndex) => prevIndex); // Adjust currentIndex if needed
  };

  return (
    <Stack {...props} spacing={1.5} ref={ref}>
      <AnimatePresence>
        {dataCollections.slice(currentIndex, currentIndex + 3).map((dataCollection, index) => (
          <NoSSRDataCollectionItem
            key={dataCollection.id}
            dataCollection={dataCollection}
            isProcessing={index === 0}
            processingSpeed={coreState.getProcessingSpeed()}
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