import { Dimensions } from 'react-native';
import { createMMKV } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';

const storage = createMMKV({
  id: 'app-storage',
  encryptionKey: 'sibali123',
  encryptionType: 'AES-256',
  mode: 'multi-process',
  readOnly: false,
});

const handlerGetItem = (params: string) => {
  try {
    return storage.getString(params);
  } catch (error) {}
};

const handlerGetAndParseJSON = <T>(key: string): T | null => {
  try {
    const item = storage.getString(key);

    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  } catch (error) {
    console.error(`Failed to parse JSON from storage for key "${key}":`, error);
    return null;
  }
};

const handlerSetItem = async (key: string, value: string) => {
  try {
    await storage.set(key, value);
  } catch (error) {}
};

const handlerRemoveItem = async (key: string) => {
  try {
    await storage.remove(key);
  } catch (error) {}
};

const handlerClearItem = async () => {
  try {
    await storage.clearAll();
  } catch (error) {}
};

const formatRupiah = (range: string) => {
  if (!range || range === 'NaN') return '-';

  const format = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

  // Less than
  if (range.startsWith('<')) {
    const value = Number(range.replace('<', ''));
    if (isNaN(value)) return '-';
    return `< Rp. ${format(value)}`;
  }

  // Greater than
  if (range.startsWith('>')) {
    const value = Number(range.replace('>', ''));
    if (isNaN(value)) return '-';
    return `> Rp. ${format(value)}`;
  }

  // Range
  if (range.includes('-')) {
    const [min, max] = range.split('-').map(Number);
    if (isNaN(min) || isNaN(max)) return '-';
    return `Rp. ${format(min)} - Rp. ${format(max)}`;
  }

  // Single value
  const value = Number(range);
  if (isNaN(value)) return '-';

  return `Rp. ${format(value)}`;
};

const showSuccessToast = (message: string) => {
  return Toast.show({
    type: 'success',
    text1: message,
  });
};

const showErrorToast = (
  message: string,
  position: 'top' | 'bottom' = 'bottom',
) => {
  return Toast.show({
    type: 'error',
    text1: message,
    position,
    topOffset: 70,
    visibilityTime: 5000,
  });
};

const showDefaultToast = (message: string) => {
  return Toast.show({
    type: 'default',
    text1: message,
  });
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export {
  screenWidth,
  screenHeight,
  windowWidth,
  windowHeight,
  handlerGetItem,
  handlerGetAndParseJSON,
  handlerSetItem,
  handlerRemoveItem,
  handlerClearItem,
  formatRupiah,
  showSuccessToast,
  showErrorToast,
  showDefaultToast,
};
