import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EchoIcon from "../common/echo-icon/EchoIcon";

// Mocked event data
const events = [
  { id: 1, message: "Buy this upgrade, and you might actually get something done before the heat death of the universe.", delay: 1000 },
  { id: 2, message: "Decrypting this file feels like unwrapping a present. Let's hope it’s not a lump of coal.", delay: 2000 },
  { id: 3, message: "Ah, the simple joys of data compression. It's like squeezing toothpaste, but with fewer messes.", delay: 1500 },
  { id: 4, message: "Complete! Ready for the next task.", delay: 1000 },
  { id: 5, message: "Starting new task...", delay: 1000 }
];

interface Event {
  id: number;
  message: string;
  delay: number;
}

export function NarrativeConsole() {
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const maxDisplayedEvents = 4; // Maximum number of events to display
  const messageDisplayDuration = 5000; // Time in ms to display each message

  useEffect(() => {
    if (currentEventIndex < events.length) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        const timer = setTimeout(() => {
          setDisplayedEvents((prevEvents) => {
            const newEvents = [...prevEvents, events[currentEventIndex]];
            if (newEvents.length > maxDisplayedEvents) {
              newEvents.shift(); // Remove the oldest event
            }
            return newEvents;
          });
          setCurrentEventIndex((prevIndex) => prevIndex + 1);
        }, events[currentEventIndex].delay);

        return () => clearTimeout(timer);
      }, 1500); // Typing indicator duration

      return () => clearTimeout(typingTimer);
    }
  }, [currentEventIndex]);

  useEffect(() => {
    if (displayedEvents.length > 0) {
      const removeTimer = setTimeout(() => {
        setDisplayedEvents((prevEvents) => prevEvents.slice(1));
      }, messageDisplayDuration);

      return () => clearTimeout(removeTimer);
    }
  }, [displayedEvents]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 200, 
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", overflowY: "hidden" }}>
        <AnimatePresence initial={false}>
          {displayedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              layout
              style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
            >
              <Avatar
                sx={{
                  width: 28, // Slightly smaller than before
                  height: 28,
                  marginRight: 1,
                  backgroundColor: 'transparent', // Transparent background
                  border: '1px solid #D3D3D3', // Light gray border
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Center the SVG
                }}
              >
                <Box
                  sx={{
                    width: 16, // Ensure SVG is smaller to fit well
                    height: 16,
                  }}
                >
                  <EchoIcon />
                </Box>
              </Avatar>
              <Box sx={{ backgroundColor: "#f0f0f0", borderRadius: 2, padding: 1, maxWidth: '80%' }}>
                <Typography variant="body1" component="p" sx={{ flexGrow: 1 }} layout>
                  {event.message}
                </Typography>
              </Box>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              layout
              style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
            >
              <Avatar
                sx={{
                  width: 28, // Slightly smaller than before
                  height: 28,
                  marginRight: 1,
                  backgroundColor: 'transparent', // Transparent background
                  border: '1px solid #D3D3D3', // Light gray border
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Center the SVG
                }}
              >
                <EchoIcon />
              </Avatar>
              <Box sx={{ backgroundColor: "#f0f0f0", borderRadius: 2, padding: 1, maxWidth: '80%' }}>
                <Typography variant="body1" component="p" sx={{ flexGrow: 1 }} layout>
                  Echo is typing...
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
