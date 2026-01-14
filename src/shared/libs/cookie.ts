import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
const SECRET_KEY = 'my-secret-key';
type StorageType = 'cookie' | 'session';

/**
 * Đặt giá trị cookie | session
 * @param name Tên cookie |session
 * @param value Giá trị cookie |session
 * @param options Tuỳ chọn cookie (expires, path, ...)
 */
export function setValue(
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
  storageType: StorageType = 'cookie'
) {
  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  if (storageType === 'cookie') {
    Cookies.set(name, encrypted, options);
  } else {
    sessionStorage.setItem(name, encrypted);
  }
}
/**
 * Lấy giá trị cookie | session
 * @param name Tên cookie | session
 * @returns Giá trị cookie hoặc undefined nếu không tồn tại
 */
export function getValue(
  name: string,
  storageType: StorageType = 'cookie'
): string | undefined {
  let encrypted: string | undefined;
  if (storageType === 'cookie') {
    encrypted = Cookies.get(name);
  } else {
    encrypted = sessionStorage.getItem(name) || undefined;
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
 */
export function removeValue(
  name: string,
  options?: Cookies.CookieAttributes,
  storageType: StorageType = 'cookie'
) {
  if (storageType === 'cookie') {
    Cookies.remove(name, options);
  } else {
    sessionStorage.removeItem(name);
  }
}