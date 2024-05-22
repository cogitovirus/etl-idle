import { DataCollection,
  CompressionType,
  fileTypes,
  compressionTypes,
  encryptionIcon,
  fileTypeIconMap,
  compressionIconMap } from "../entities/DataCollection";
import { CoreState } from "../core/CoreState";
import { v4 as uuid4 } from "uuid";
import { generateRandomName } from "../utils/randomNameGenerator";
import dynamicIconImports from "lucide-react/dynamicIconImports";


export class DataCollectionService {
  private coreState: CoreState;

  constructor(coreState: CoreState, seed?: string) {
    this.coreState = coreState;
  }

  public completeDataCollection(dc: DataCollection) {
    this.coreState.addDataToWarehouse(dc.dataSize);
    this.coreState.removeDataCollection(dc.id);
    this.coreState.notifyAboutCoreStateChange();
  }

  public getAndPushNewCollection() {
    const newDataCollection = this.generateRandomDataCollection();
    this.coreState.addDataCollection(newDataCollection);
  }

  generateRandomDataCollection(): DataCollection {

    const fileType = this.getRandomElement(fileTypes);
    const compressed = this.getRandomElement(compressionTypes);

    const dataSize = this.getRandomDataSize();
    const encrypted = Math.random() > 0.3;

    const name = `${generateRandomName()}.${fileType}${compressed !== CompressionType.NONE ? '.' + compressed : ''}${encrypted ? '.gpg' : ''}`;

    return {
      id: uuid4(),
      name: name,
      dataSize: dataSize,
      fileTypes: [fileType],
      compressed: compressed,
      encrypted: encrypted,
      colorPalette: 'colorPalette',
      icon: this.getDataCollectionIcon(encrypted, compressed, fileType),
    };
  }

  getRandomDataSize(): number {
    // Adjust the logic for data size based on game progression
    return Math.floor(Math.random() * 15) + 1; // Example: data size between 1 and 15 Mb
  }

  // TODO: implement color palette generation
  getColorPaletteForType(): string {
    return 'colorPalette';
  }

  getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  getDataCollectionIcon = (encrypted: boolean, compressed: CompressionType, fileType: string ): keyof typeof dynamicIconImports => {
    if (encrypted) {
      return encryptionIcon;
    }
    if (compressed !== CompressionType.NONE) {
      return compressionIconMap[compressed]!;
    }
    return fileTypeIconMap[fileType] || 'file';
  };
}