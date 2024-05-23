import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Mocked event data
const events = [
  { id: 1, message: "Initializing system...", delay: 1000 },
  { id: 2, message: "Loading data...", delay: 2000 },
  { id: 3, message: "Processing...", delay: 1500 },
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
  const maxDisplayedEvents = 4; // Maximum number of events to display
  const messageDisplayDuration = 5000; // Time in ms to display each message

  useEffect(() => {
    if (currentEventIndex < events.length) {
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
        height: 100, // Fixed height
        backgroundColor: "#ffffff", // White background
        color: "#000000", // Black text color
        padding: 2,
        borderRadius: 1,
        overflow: "hidden", // Ensure no scrollbar appears
        fontFamily: '"Courier New", Courier, monospace', // Retro font style
        border: '1px solid #000000', // Black border for retro look
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <AnimatePresence initial={false}>
          {displayedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              layout
              style={{ display: 'flex' }}
            >
              <Typography variant="body1" component="p" sx={{ flexGrow: 1 }} layout>
                {event.message}
              </Typography>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
