import { GameState } from "../core/GameState";
import { Upgrade } from "../entities/Upgrade";

export class UpgradeService {
  buyUpgrade(gameState: GameState, upgradeId: string) {
    const upgrade = gameState.getUpgrades().find(u => u.id === upgradeId);
    if (upgrade && gameState.canAfford(upgrade.cost)) {
      upgrade.effect(gameState);
      gameState.deductFunds(upgrade.cost);
    }
  }
}