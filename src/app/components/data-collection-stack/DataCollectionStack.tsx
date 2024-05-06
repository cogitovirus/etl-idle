import * as React from 'react';
import Stack from '@mui/material/Stack';
import DataCollectionItem from '../data-collection-item/DataCollectionItem';

const dataCollections: { name: string, size: number }[] = [
  { name: 'test', size: 10 },
  { name: 'test2', size: 20 },
  { name: 'test3', size: 30 },
  // { name: 'test4', size: 40 },
  // { name: 'test5', size: 50 },
];


function DataCollectionStack() {
  return (
    <Stack spacing={2}>
      {dataCollections.map((dataCollection, index) => (
        <DataCollectionItem key={index} dataCollectionName={dataCollection.name} dataCollectionSize={dataCollection.size} />
      ))}
    </Stack>
  );
}

export default DataCollectionStack;