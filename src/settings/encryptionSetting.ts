import { isDevMode } from '/@/utils/env';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@123123',
  iv: '@11111000001111_123123',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
