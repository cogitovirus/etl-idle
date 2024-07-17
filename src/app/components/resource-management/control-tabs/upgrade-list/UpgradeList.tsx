import { Box, Tooltip, Typography } from "@mui/material";
import { CoreStateContext } from '../../../../contexts/GameStateContext';
import { Upgrade } from "@/engine/entities/Upgrade";
import { useContext, useEffect, useState } from "react";
import AnimatedButton from "@app/components/common"
import { UpgradeEffect } from "@/engine/entities/UpgradeEffect";

const renderCost = (cost: { type: string, amount: number }) => (
  <Typography variant="caption">
    {`${cost.type.charAt(0).toUpperCase() + cost.type.slice(1)}: ${cost.amount}`}
  </Typography>
);

const renderEffect = (effect: UpgradeEffect) => {
  switch (effect.type) {
    case 'increaseProcessingSpeed':
      return <Typography variant="caption">{`Increase Processing Speed: +${effect.amount}`}</Typography>;
    case 'increaseDataWarehouseCapacity':
      return <Typography variant="caption">{`Increase Data Warehouse Capacity: +${effect.amount} MB`}</Typography>;
    // Add more cases as needed
    default:
      return null;
  }
};

export function UpgradeList() {
  const coreState = useContext(CoreStateContext);
  const [availableUpgrades, setAvailableUpgrades] = useState<Upgrade[]>(coreState.upgradeService.getAvailableUpgrades());
  const [forceRender, setForceRender] = useState(false);

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
    setForceRender(prev => !prev); // Toggle state to force re-render
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
              {renderCost(upgrade.cost)}
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