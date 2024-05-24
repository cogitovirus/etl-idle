import { DataCollection } from '@engine/entities/DataCollection';
import Stack from '@mui/material/Stack';
import { AnimatePresence, motion } from "framer-motion";
import dynamic from 'next/dynamic';
import * as React from 'react';
import { CoreStateContext } from '../../../../contexts/GameStateContext';
import { useContext } from 'react';
import { Paper } from '@mui/material';


const NoSSRDataCollectionItem = dynamic(() => import('../data-collection-item/DataCollectionItem'), { ssr: false })

const DataCollectionStack = React.forwardRef<HTMLDivElement, {}>(function DataCollectionStack(props, ref) {
  const coreState = useContext(CoreStateContext);
  const [dataCollections, setDataCollections] = React.useState<DataCollection[]>(coreState.dataCollectionService.getDataCollections());

  const handleComplete = (dc: DataCollection) => {
    coreState.dataCollectionService.completeDataCollection(dc);
    coreState.dataCollectionService.getAndPushNewCollection();

    // TODO: workaround for Cannot update a component (`ForwardRef(DataCollectionStack)`)
    // while rendering a different component (`ForwardRef(DataCollectionItem)`)
    setTimeout(() => {
      setDataCollections(coreState.dataCollectionService.getDataCollections());
    }, 0);
  };

  return (
    <Paper elevation={0} sx={{ marginTop: 2, padding: 2 }}>
      <Stack {...props} spacing={1.5} ref={ref}>
        <AnimatePresence>
          {dataCollections.slice(0, 3).map((dataCollection, index) => (
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
    </Paper>
  );
});

export default motion(DataCollectionStack);