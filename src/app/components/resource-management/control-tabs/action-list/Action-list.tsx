import React, { useContext, useEffect, useState } from 'react';
import { Box, Tooltip, Typography } from "@mui/material";
import { CoreStateContext } from '../../../../contexts/GameStateContext';
import AnimatedButton from "@app/components/common";
import { Task } from '@/engine/entities/Task';
import { Cost } from '@/engine/entities/Cost';
import { Result } from '@/engine/entities/Result';
import { Modifier } from '@/engine/entities/Modifier';

const renderCosts = (costs: Cost[]) => {
  if (!costs || costs.length === 0) return null;
  return costs.map((cost, index) => (
    <Typography key={index} variant="caption">
      {`${cost.type.charAt(0).toUpperCase() + cost.type.slice(1)}: ${cost.amount}`}
    </Typography>
  ));
};

const renderResults = (results: Result[]) => {
  if (!results || results.length === 0) return null;
  return results.map((result, index) => (
    <Typography key={index} variant="caption">
      {`${result.type.charAt(0).toUpperCase() + result.type.slice(1)}: ${result.amount}`}
    </Typography>
  ));
};

const renderModifiers = (modifiers: Modifier[]) => {
  if (!modifiers || modifiers.length === 0) return null;
  return modifiers.map((modifier, index) => (
    <Typography key={index} variant="caption">
      {`${modifier.type.charAt(0).toUpperCase() + modifier.type.slice(1)}: ${modifier.value}`}
    </Typography>
  ));
};

export function ActionList() {
  const coreState = useContext(CoreStateContext);
  const [availableActions, setAvailableActions] = useState<Task[]>(coreState.actionService.getAvailableActions());

  useEffect(() => {
    const handleActionsChange = () => {
      setAvailableActions(coreState.actionService.getAvailableActions());
    };

    coreState.actionService.subscribeToActionsChanges(handleActionsChange);

    return () => {
      coreState.actionService.unsubscribeFromActionsChanges(handleActionsChange);
    };
  }, [coreState]);

  const handlePerformAction = (actionId: string) => {
    coreState.actionService.performAction(actionId);
  };

  return (
    <Box>
      {availableActions.map((action: Task) => (
        <Tooltip
          key={action.id}
          title={
            <div>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{action.name}</Typography>
              <Typography variant="subtitle2" sx={{fontStyle: 'oblique', fontWeight: 500, fontSize: 13}}>&quot;{action.quote}&quot;</Typography>
              <Typography variant="body2">{action.description}</Typography>
              {action.costs && action.costs.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Cost:</Typography>
                  {renderCosts(action.costs)}
                </>
              )}
              {action.results && action.results.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Results:</Typography>
                  {renderResults(action.results)}
                </>
              )}
              {action.modifiers && action.modifiers.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Modifiers:</Typography>
                  {renderModifiers(action.modifiers)}
                </>
              )}
            </div>
          }
          arrow>
          <AnimatedButton
            variant="outlined"
            sx={{ m: 1, p: 1 }}
            isActive={false}
            onClick={() => handlePerformAction(action.id)}
          >
            {action.name}
          </AnimatedButton>
        </Tooltip>
      ))}
    </Box>
  );
}