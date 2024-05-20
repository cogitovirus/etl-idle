import dynamicIconImports from "lucide-react/dynamicIconImports";

export enum CompressionType {
  NONE = 'none',
  GZIP = 'gz',
  SNAPPY = 'snappy',
  LZ4 = 'lz4',
  ZIP = 'zip',
  TAR = 'tar',
}

export const fileTypeIconMap: { [key: string]: keyof typeof dynamicIconImports } = {
  'csv': 'file-bar-chart',
  'psv': 'file-spreadsheet',
  'jsonl': 'file-json',
  'txt': 'file-text',
  'bin': 'binary',
  'dat': 'file-cog',
  'log': 'file-search-2',
  'xml': 'file-code',
  'ebcdic': 'file-digit',
};

export const compressionIconMap: { [key in CompressionType]: keyof typeof dynamicIconImports | null } = {
  [CompressionType.NONE]: null,
  [CompressionType.GZIP]: 'file-archive',
  [CompressionType.SNAPPY]: 'file-box',
  [CompressionType.LZ4]: 'file-box',
  [CompressionType.ZIP]: 'file-archive',
  [CompressionType.TAR]: 'combine',
};

export const encryptionIcon: keyof typeof dynamicIconImports = 'file-lock';

export const fileTypes = ['csv', 'psv', 'jsonl', 'txt', 'bin', 'dat', 'log', 'xml', 'ebcdic'];
export const compressionTypes: CompressionType[] = [CompressionType.NONE, CompressionType.GZIP, CompressionType.SNAPPY, CompressionType.LZ4];

export interface DataCollection {
  id: string;
  name: string;
  dataSize: number; // Total size of data collection in Mb
  fileTypes: string[]; // Array of file types
  compressed: CompressionType; // Compression type
  encrypted: boolean; // Is data encrypted
  colorPalette?: string; // Optional color palette for data type representation
  icon: keyof typeof dynamicIconImports; // Icon for data collection
}