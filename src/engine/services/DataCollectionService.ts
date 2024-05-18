import { DataCollection } from "../entities/DataCollection";
import { GameState } from "../core/GameState";
import { v4 as uuid4 } from "uuid";


export class DataCollectionService {
  public completeDataCollection(gameState: GameState, dc: DataCollection) {
    gameState.addToWarehouse(dc.dataSize);
    gameState.removeDataCollection(dc.id);
  }

  generateNewCollection(gameState: GameState) {
    const dataCollections = gameState.getDataCollections();
    const lastCollection = dataCollections[dataCollections.length - 1];
    const newDataCollection: DataCollection = {
      id: uuid4(),
      name: `Data Collection ${Math.random()}`,
      dataSize: lastCollection ? lastCollection.dataSize + 1 : 1, // Increase difficulty
    };

    gameState.addDataCollection(newDataCollection);
  }
}