import loaderModule, { loadedData as namedLoadedData } from './loader.js';

export const getLoadedData = <T = unknown>(): T | undefined => {
  const data =
    (loaderModule as any)?.loadedData ??
    namedLoadedData ??
    (loaderModule as any)?.default?.loadedData ??
    (loaderModule as any)?.data ??
    (loaderModule as any)?.default?.data ??
    undefined;

  return data as T | undefined;
};

export const getLoadedDataFromLoader = <T = unknown>(): T | undefined => {
  return getLoadedData<T>();
};

export const analyserData = getLoadedData();
