import * as React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { motion } from "framer-motion";


interface DataCollectionProps {
  dataCollectionName: string;
  dataCollectionSize: number;
  processingSpeed: number;
  isProcessing: boolean;
  onComplete: () => void;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number, label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{props.label}</Typography>
      </Box>
    </Box>
  );
}

const DataCollectionItem = React.forwardRef<HTMLDivElement, DataCollectionProps>(function DataCollectionItem({
  dataCollectionName,
  dataCollectionSize,
  processingSpeed,
  isProcessing,
  onComplete
}: DataCollectionProps, ref) {
  const [processed, setProcessed] = React.useState(0);

  React.useEffect(() => {
    // Reset processed data when a new data collection starts
    setProcessed(0);
    if (!isProcessing) return;

    const timer = setInterval(() => {
      setProcessed((prevProcessed) => {
        const nextProcessed = prevProcessed + processingSpeed;
        if (nextProcessed >= dataCollectionSize) {
          clearInterval(timer);
          onComplete();
          return dataCollectionSize;
        }
        return nextProcessed;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isProcessing, processingSpeed, dataCollectionSize, onComplete]);

  const progress = (processed / dataCollectionSize) * 100;
  const progressLabel = `(${Math.round(progress)}% complete)`;

  return (
    <Card ref={ref}>
      <CardContent>
        <Typography variant="h5" component="div">{dataCollectionName}</Typography>
        <Typography variant="body2" component="p">{dataCollectionSize} Mb</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} label={progressLabel} />
        </Box>
      </CardContent>
    </Card>
  );
});

export default motion(DataCollectionItem);