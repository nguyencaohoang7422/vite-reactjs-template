import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { cookieName } from '@/shared';

const SECRET_KEY = 'my-secret-key';
type StorageType = 'cookie' | 'session';

/**
 * Đặt giá trị cookie | session
 * @param name Tên cookie |session
 * @param value Giá trị cookie |session
 * @param options Tuỳ chọn cookie (expires, path, ...)
 * @param storageType
 */
export function setValue(
  value: string,
  name?: string,
  options?: Cookies.CookieAttributes,
  storageType: StorageType = 'cookie',
) {
  const key = name || cookieName;
  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  if (storageType === 'cookie') {
    Cookies.set(key, encrypted, options);
  } else {
    sessionStorage.setItem(key, encrypted);
  }
}
/**
 * Lấy giá trị cookie | session
 * @param name Tên cookie | session
 * @param storageType
 * @returns Giá trị cookie hoặc undefined nếu không tồn tại
 */
export function getValue(name?: string, storageType: StorageType = 'cookie'): string | undefined {
  let encrypted: string | undefined;
  const key = name ?? cookieName;
  if (storageType === 'cookie') {
    encrypted = Cookies.get(key);
  } else {
    encrypted = sessionStorage.getItem(key) || undefined;
  }
  if (!encrypted) return undefined;
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || undefined;
  } catch {
    return undefined;
  }
}
/**
 * Xoá cookie | session
 * @param name Tên cookie | session
 * @param options Tuỳ chọn cookie (path, ...)
 * @param storageType
 */
export function removeValue(name?: string, options?: Cookies.CookieAttributes, storageType: StorageType = 'cookie') {
  const key = name || cookieName;
  if (storageType === 'cookie') {
    Cookies.remove(key, options);
  } else {
    sessionStorage.removeItem(key);
  }
}
