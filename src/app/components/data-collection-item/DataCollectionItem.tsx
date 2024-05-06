import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Card, CardContent, Paper } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


interface DataCollectionProps {
  dataCollectionName: string;
  dataCollectionSize: number;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function DataCollectionItem({ dataCollectionName, dataCollectionSize }: DataCollectionProps) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">{dataCollectionName}</Typography>
        <Typography variant="body2" component="p">{dataCollectionSize}</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      </CardContent>
    </Card>);
}

export default DataCollectionItem;