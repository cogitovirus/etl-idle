import { DataCollection } from "../entities/DataCollection";
import { CoreState } from "../core/CoreState";
import { v4 as uuid4 } from "uuid";


export class DataCollectionService {
  public completeDataCollection(coreState: CoreState, dc: DataCollection) {
    coreState.addToWarehouse(dc.dataSize);
    coreState.removeDataCollection(dc.id);
  }

  generateNewCollection(coreState: CoreState) {
    const dataCollections = coreState.getDataCollections();
    const lastCollection = dataCollections[dataCollections.length - 1];
    const newDataCollection: DataCollection = {
      id: uuid4(),
      name: `Data Collection ${Math.random()}`,
      dataSize: lastCollection ? lastCollection.dataSize + 1 : 1, // Increase difficulty
    };

    coreState.addDataCollection(newDataCollection);
  }
}