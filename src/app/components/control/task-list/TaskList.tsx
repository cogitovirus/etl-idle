import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useGameState } from '../../../contexts/GameStateContext';
import { Task } from "@/engine/entities/Task";
import { useEffect, useState } from "react";
import AnimatedButton from "@app/components/common"


export function TaskList() {
  const { taskService } = useGameState();
  const [unlockedTasks, setUnlockedTasks] = useState<Task[]>(taskService.getUnlockedTasks());

  useEffect(() => {
    const handleStateChange = () => {
      setUnlockedTasks(taskService.getUnlockedTasks());
    };

    taskService.subscribe(handleStateChange);

    return () => {
      taskService.unsubscribe(handleStateChange);
    };
  }, [taskService]);

  const handleStartTask = (taskId: string) => {
    taskService.startTask(taskId);
  };


  return (
    <Box>
      {unlockedTasks.map((task: Task) => (
        <Tooltip
          key={task.id}
          title={
            <div>
              <Typography variant="body1">{task.name}</Typography>
              <Typography variant="caption" display="block">{task.quote}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="body2">Cost: {task.cost}</Typography>
              <Typography variant="body2">Process Cost: {task.processCost}</Typography>
              <Typography variant="body2">Iteration Time: {task.iterationTime} seconds</Typography>
            </div>
          }
          arrow>
          <AnimatedButton
            variant={task.isActive ? "contained" : "outlined"}
            sx={{ m: 1, p: 1 }}
            isActive={task.isActive}
            initial={{ backgroundColor: "transparent" }}
            animate={task.isActive ? { backgroundColor: ["#ffffff", "#f5f5f5", "#ffffff"] } : {}}
            transition={task.isActive ? { duration: 1.5, ease: "easeInOut", repeat: Infinity } : {}}
            onClick={() => handleStartTask(task.id)}
          >
            {task.name}
          </AnimatedButton>
        </Tooltip>
      ))}
    </Box>
  );
}