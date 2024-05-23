import { DataCollection } from '@/engine/entities/DataCollection';
import { Box, Card, CardContent, Typography } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { motion } from "framer-motion";
import { useState, useEffect, memo, forwardRef, useRef } from 'react';
import LucideCommonIcon from '../../../common/lucide-common-icon/Icon';


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

const DataCollectionInfo = memo(function DataCollectionInfo({ dataCollection }: Pick<DataCollectionProps, 'dataCollection'>) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '92%', p: 2 }}>
      <CardContent sx={{ flexGrow: 1, padding: 0 }}>
        <Typography variant="h6" component="div">{dataCollection.name}</Typography>
        <Typography variant="body2" component="p">{dataCollection.dataSize} Mb</Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'normal' }}>
        <LucideCommonIcon name={dataCollection.icon} />
      </Box>
    </Box>
  );
});

const DataCollectionItem = forwardRef<HTMLDivElement, DataCollectionProps>(function DataCollectionItem({
  dataCollection,
  processingSpeed,
  isProcessing,
  onComplete
}: DataCollectionProps, ref) {
  const [processed, setProcessed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef(false);

  // elaborate useEffect to assure idempotency 
  useEffect(() => {
    setProcessed(0);
    hasCompletedRef.current = false;

    if (!isProcessing) return;

    const process = () => {
      setProcessed((prevProcessed) => {
        const nextProcessed = prevProcessed + processingSpeed;
        if (nextProcessed >= dataCollection.dataSize) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          if (!hasCompletedRef.current) {
            onComplete();
            hasCompletedRef.current = true;
          }
          return dataCollection.dataSize;
        }
        return nextProcessed;
      });
    };

    intervalRef.current = setInterval(process, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isProcessing, processingSpeed, dataCollection.dataSize, onComplete]);


  const progress = (processed / dataCollection.dataSize) * 100;
  const progressLabel = `(${Math.round(progress)}% complete)`;

  return (
    // TODO: rework the fucking styling
    <Card ref={ref} sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <DataCollectionInfo dataCollection={dataCollection} />
      <Box sx={{ width: '100%', px: 2, pb: 2 }}>
        <LinearProgressWithLabel value={progress} label={progressLabel} />
      </Box>
    </Card>
  );
});

export default motion(DataCollectionItem);