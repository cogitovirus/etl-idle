import * as React from 'react';
import Stack from '@mui/material/Stack';
import DataCollectionItem from '../data-collection-item/DataCollectionItem';
import { useGameState } from '../../contexts/GameStateContext';

interface DataCollection {
  name: string;
  size: number;
}

const initialDataCollections: DataCollection[] = [
  { name: 'Data Collection 1', size: 10 },
  { name: 'Data Collection 2', size: 20 },
  { name: 'Data Collection 3', size: 30 },
];

function DataCollectionStack() {
  const gameState = useGameState();
  const [dataCollections, setDataCollections] = React.useState<DataCollection[]>(initialDataCollections);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleComplete = () => {
    gameState.addToWarehouse(dataCollections[currentIndex].size);
    // TODO: !!
    // updateGameState(); // Trigger re-render
    setCurrentIndex((prevIndex) => prevIndex + 1);

    // Add new data collection with increased difficulty
    const newDataCollection = {
      name: `Data Collection ${dataCollections.length + 1}`,
      size: dataCollections[dataCollections.length - 1].size + 10,
    };
    setDataCollections((prevCollections) => [...prevCollections, newDataCollection]);
  };

  return (
    <Stack spacing={2}>
      {dataCollections.slice(currentIndex, currentIndex + 1).map((dataCollection, index) => (
        <DataCollectionItem
          key={index}
          dataCollectionName={dataCollection.name}
          dataCollectionSize={dataCollection.size}
          processingSpeed={gameState.getProcessingSpeed()}
          onComplete={handleComplete}
        />
      ))}
    </Stack>
  );
}

export default DataCollectionStack;
