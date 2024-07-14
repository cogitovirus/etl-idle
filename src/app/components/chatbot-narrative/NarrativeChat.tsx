import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CoreStateContext } from '@/app/contexts/GameStateContext';
import NarrativeEvent from '@/engine/entities/NarrativeEvent';

export function NarrativeChat() {
  const coreState = useContext(CoreStateContext);
  const [messages, setMessages] = useState<NarrativeEvent[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNewNarrative = () => {
      const newEvents = coreState.narrativeManager.getAndClearNarrativeQueue();
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, ...newEvents];
        return updatedMessages.slice(-10); // Keep only the last 10 messages
      });
    };

    coreState.narrativeManager.subscribeToNarrativeEvents(handleNewNarrative);

    return () => {
      coreState.narrativeManager.unsubscribeFromNarrativeEvents(handleNewNarrative);
    };
  }, [coreState.narrativeManager]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper elevation={2} sx={{ padding: 2, height: 300, overflow: 'hidden' }}>
      <Box 
        ref={containerRef}
        sx={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'auto', 
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginBottom: 1 }}>
                {`> ${message.message}`}
              </Typography>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Paper>
  );
}
