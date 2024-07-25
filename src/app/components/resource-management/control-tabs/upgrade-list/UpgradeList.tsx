import React, { useContext, useEffect, useState } from 'react';
import { Box, Tooltip, Typography } from "@mui/material";
import { CoreStateContext } from '../../../../contexts/GameStateContext';
import AnimatedButton from "@app/components/common";
import { Upgrade } from '@/engine/entities/Upgrade';
import { Cost } from '@/engine/entities/Cost';
import { UpgradeEffect } from '@/engine/entities/UpgradeEffect';

const renderCosts = (costs: Cost[]) => {
  return costs.map((cost, index) => (
    <Typography key={index} variant="caption">
      {`${cost.type.charAt(0).toUpperCase() + cost.type.slice(1)}: ${cost.amount}`}
    </Typography>
  ));
};

const renderEffect = (effect: UpgradeEffect) => {
  switch (effect.type) {
    case 'increaseProcessingSpeed':
      return `Increase Processing Speed: ${effect.amount}`;
    case 'increaseDataWarehouseCapacity':
      return `Increase Data Warehouse Capacity: ${effect.amount}`;
    case 'addFunds':
      return `Add Funds: ${effect.amount}`;
    default:
      return `Unknown effect: ${JSON.stringify(effect)}`;
  }
};

export function UpgradeList() {
  const coreState = useContext(CoreStateContext);
  const [availableUpgrades, setAvailableUpgrades] = useState<Upgrade[]>(coreState.upgradeService.getAvailableUpgrades());

  useEffect(() => {
    const handleUpgradesChange = () => {
      setAvailableUpgrades(coreState.upgradeService.getAvailableUpgrades());
    };

    coreState.upgradeService.subscribeToUpgradesChanges(handleUpgradesChange);

    return () => {
      coreState.upgradeService.unsubscribeFromUpgradesChanges(handleUpgradesChange);
    };
  }, [coreState]);

  const handlePurchaseUpgrade = (upgradeId: string) => {
    coreState.upgradeService.purchaseUpgrade(upgradeId);
  };

  return (
    <Box>
      {availableUpgrades.map((upgrade: Upgrade) => (
        <Tooltip
          key={upgrade.id}
          title={
            <div>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{upgrade.name}</Typography>
              <Typography variant="subtitle2" sx={{fontStyle: 'oblique', fontWeight: 500, fontSize: 13}}>&quot;{upgrade.quote}&quot;</Typography>
              <Typography variant="body2">{upgrade.description}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Cost:</Typography>
              {renderCosts(upgrade.cost)}
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Effects:</Typography>
              {Array.isArray(upgrade.effect) 
                ? upgrade.effect.map((effect, index) => <div key={index}>{renderEffect(effect)}</div>)
                : renderEffect(upgrade.effect)
              }
            </div>
          }
          arrow>
          <AnimatedButton
            variant={upgrade.isPurchased ? "contained" : "outlined"}
            sx={{ m: 1, p: 1 }}
            isActive={false}
            disabled={upgrade.isPurchased}
            onClick={() => handlePurchaseUpgrade(upgrade.id)}
          >
            {upgrade.name}
          </AnimatedButton>
        </Tooltip>
      ))}
    </Box>
  );
}