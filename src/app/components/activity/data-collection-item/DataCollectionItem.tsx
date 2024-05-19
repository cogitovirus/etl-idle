import * as React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { motion } from "framer-motion";
import { DataCollection } from '@/engine/entities/DataCollection';


interface DataCollectionProps {
  dataCollection: DataCollection;
  processingSpeed: number;
  isProcessing: boolean;
  onComplete: () => void;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number, label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '75%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{props.label}</Typography>
      </Box>
    </Box>
  );
}

const DataCollectionItem = React.forwardRef<HTMLDivElement, DataCollectionProps>(function DataCollectionItem({
  dataCollection,
  processingSpeed,
  isProcessing,
  onComplete
}: DataCollectionProps, ref) {
  const [processed, setProcessed] = React.useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    // Reset processed data when a new data collection starts
    setProcessed(0);
    if (!isProcessing) return;

    timer = setInterval(() => {
      setProcessed((prevProcessed) => {
        const nextProcessed = prevProcessed + processingSpeed;
        if (nextProcessed >= dataCollection.dataSize) {
          clearInterval(timer);
          onComplete();
          return dataCollection.dataSize;
        }
        return nextProcessed;
      });
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isProcessing, processingSpeed, dataCollection, onComplete]);

  const progress = (processed / dataCollection.dataSize) * 100;
  const progressLabel = `(${Math.round(progress)}% complete)`;

  return (
    <Card ref={ref} sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">{dataCollection.name}</Typography>
        <Typography variant="body2" component="p">{dataCollection.dataSize} Mb</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} label={progressLabel} />
        </Box>
      </CardContent>
    </Card>
  );
});

export default motion(DataCollectionItem);