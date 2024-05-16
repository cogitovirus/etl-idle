import * as React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

interface DataCollectionProps {
  dataCollectionName: string;
  dataCollectionSize: number;
  processingSpeed: number;
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

function DataCollectionItem({ dataCollectionName, dataCollectionSize, processingSpeed, onComplete }: DataCollectionProps) {
  const [processed, setProcessed] = React.useState(0);

  React.useEffect(() => {
    setProcessed(0); // Reset processed data when a new data collection starts

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
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [processingSpeed, dataCollectionSize, onComplete]);

  const progress = (processed / dataCollectionSize) * 100;
  const progressLabel = `${processed}/${dataCollectionSize} Mb (${Math.round(progress)}% complete)`;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">{dataCollectionName}</Typography>
        <Typography variant="body2" component="p">{dataCollectionSize} Mb</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} label={progressLabel} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default DataCollectionItem;
