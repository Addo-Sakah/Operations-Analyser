import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export type DataJSON = unknown;

const DATA_FILENAME = 'data.json';

/**
 * Resolve the data.json path relative to this source file (ESM-safe).
 */
function getDataPath(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '..', DATA_FILENAME);
}

export async function loadData(): Promise<DataJSON> {
  const filePath = getDataPath();
  const raw = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as DataJSON;
}

export function loadDataSync(): DataJSON {
  try {
    const filePath = getDataPath();
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as DataJSON;
  } catch (err) {
    throw err;
  }
}

// Eagerly load data synchronously at module initialization so consumers
// importing the module can access `loadedData`.
export const loadedData: DataJSON | undefined = (() => {
  try {
    return loadDataSync();
  } catch {
    return undefined;
  }
})();

// Provide a `data` alias for older imports.
export const data = loadedData;

export default loadData;
