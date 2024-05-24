import { Box, Tooltip, Typography } from "@mui/material";
import { CoreStateContext } from '../../../../contexts/GameStateContext';
import { Task } from "@/engine/entities/Task";
import { useContext, useEffect, useState } from "react";
import AnimatedButton from "@app/components/common"
import { Cost } from "@/engine/entities/Cost";
import { Result } from "@/engine/entities/Result";
import { Modifier } from "@/engine/entities/Modifier";


const renderCosts = (costs: Cost[]) => {
  return costs.map((cost, index) => (
    <Typography key={index} variant="caption">
      {`${cost.type.charAt(0).toUpperCase() + cost.type.slice(1)}: ${cost.amount}`}
    </Typography>
  ));
};

const renderResults = (results: Result[]) => {
  return results.map((result, index) => (
    <Typography key={index} variant="caption">
      {`${result.type.charAt(0).toUpperCase() + result.type.slice(1)}: ${result.amount}`}
    </Typography>
  ));
};

const renderModifiers = (modifiers: Modifier[]) => {
  return modifiers.map((modifier, index) => (
    <Typography key={index} variant="caption">
      {`${modifier.type.charAt(0).toUpperCase() + modifier.type.slice(1)}: ${modifier.value}`}
    </Typography>
  ));
};

export function TaskList() {
  const coreState = useContext(CoreStateContext);
  const [unlockedTasks, setUnlockedTasks] = useState<Task[]>(coreState.taskService.getUnlockedTasks());
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    const handleTasksChange = () => {
      setUnlockedTasks(coreState.taskService.getUnlockedTasks());
    };

    coreState.taskService.subscribeToTasksChanges(handleTasksChange);

    return () => {
      coreState.taskService.unsubscribeFromTasksChanges(handleTasksChange);
    };
  }, [coreState]);

  const handleStartTask = (taskId: string) => {
    coreState.taskService.startTask(taskId);
    setForceRender(prev => !prev); // Toggle state to force re-render
  };

  return (
    <Box>
      {unlockedTasks.map((task: Task) => (
        <Tooltip
          key={task.id}
          title={
            <div>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{task.name}</Typography>
              <Typography variant="subtitle2" sx={{fontStyle: 'oblique', fontWeight: 500, fontSize: 13}}>&quot;{task.quote}&quot;</Typography>
              <Typography variant="body2">{task.description}</Typography>
              {task.costs && task.costs.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Cost:</Typography>
                  {renderCosts(task.costs)}
                </>
              )}
              {task.processCosts && task.processCosts.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Process Cost:</Typography>
                  {renderCosts(task.processCosts)}
                </>
              )}
              {task.results && task.results.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Results:</Typography>
                  {renderResults(task.results)}
                </>
              )}
              {task.modifiers && task.modifiers.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Modifiers:</Typography>
                  {renderModifiers(task.modifiers)}
                </>
              )}
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Iteration Time: {task.iterationTime} seconds</Typography>
            </div>
          }
          arrow>
          <AnimatedButton
            variant={task.isActive ? "contained" : "outlined"}
            sx={{ m: 1, p: 1 }}
            isActive={task.isActive}
            initial={{ scale: 1 }}
            animate={task.isActive ? { scale: [1, 1.03, 1] } : {}}
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