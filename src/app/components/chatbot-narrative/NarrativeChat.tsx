import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Paper, Typography } from "@mui/material";
import { CoreStateContext } from '@/app/contexts/GameStateContext';
import NarrativeEvent from '@/engine/entities/NarrativeEvent';

export function NarrativeChat() {
  const coreState = useContext(CoreStateContext);
  const [messages, setMessages] = useState<NarrativeEvent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNewNarrative = () => {
      const newEvents = coreState.narrativeManager.getAndClearNarrativeQueue();
      setMessages(prevMessages => [...prevMessages, ...newEvents]);
    };

    coreState.narrativeManager.subscribeToNarrativeEvents(handleNewNarrative);

    return () => {
      coreState.narrativeManager.unsubscribeFromNarrativeEvents(handleNewNarrative);
    };
  }, [coreState.narrativeManager]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Paper elevation={2} sx={{ padding: 2, height: 300, overflow: 'hidden' }}>
      <Box sx={{ width: '100%', height: '100%', overflow: 'auto', fontFamily: 'monospace' }}>
        {messages.map((message, index) => (
          <Typography key={index} variant="body2" sx={{ whiteSpace: 'pre-wrap', marginBottom: 1 }}>
            {`> ${message.message}`}
          </Typography>
        ))}
        <div ref={messagesEndRef} />
      </Box>
    </Paper>
  );
}
