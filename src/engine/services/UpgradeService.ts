import { CoreState } from "../core/CoreState";
import { Upgrade } from "../entities/Upgrade";

export class UpgradeService {
  buyUpgrade(coreState: CoreState, upgradeId: string) {
    const upgrade = coreState.getUpgrades().find(u => u.id === upgradeId);
    if (upgrade && coreState.canAfford(upgrade.cost)) {
      upgrade.effect(coreState);
      coreState.deductFunds(upgrade.cost);
    }
  }
}