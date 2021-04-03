/* eslint-disable radix */
/**
 * store value to storage
 * @param  {String} name key for local storage
 * @param  {String} value to be stored in key on storage
 * @return {Void}
 */
export const storeStorage = (name = "", value = ""): void => {
  localStorage.setItem(name, value);
};
/**
 * get value from storage
 * @param  {String} name key for local storage
 * @return {String} returns the value from local storage if the key exist,
 */
export const getStorage = (name = ""): string | number | undefined | null =>
  localStorage.getItem(name);

/**
 * get value from storage
 * @param  {String} name key for local storage
 * @return {Number} returns the value from local storage if the key exist and convert it to integer,
 */
export const getNumberStorage = (name: string): number =>
  parseInt(localStorage.getItem(name) || "");

/**
 * get value of gameId from storage
 * @return {String} returns the value of gameId from local storage if the key exist, otherwise return empty string,
 */
export const getStoredGameId = (): string =>
  localStorage.getItem("gameId") || "";
