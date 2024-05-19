import React from 'react';
import { Button, ButtonProps } from "@mui/material";
import { motion } from "framer-motion";

interface AnimatedButtonProps extends ButtonProps {
  isActive: boolean;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  layout?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  function AnimatedButton({ isActive, initial, animate, exit, transition, layout, children, ...props }, ref) {
    return (
      <Button {...props} ref={ref}>
        {children}
      </Button>
    );
  }
);

export default motion(AnimatedButton);
