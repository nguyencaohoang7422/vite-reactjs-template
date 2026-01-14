import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Translation options for interpolations
 */
interface TranslateOptions {
  [key: string]: string | number | boolean;
}

interface UseTranslateReturn {
  /**
   * Dịch text với scope prefix
   * @param text - Key trong file translation
   * @param option - Các tham số interpolation
   * @returns Text đã được dịch
   */
  translate: (text: string, option?: TranslateOptions) => string;

  /**
   * Dịch text trực tiếp không có scope prefix
   * @param text - Key đầy đủ trong file translation
   * @param option - Các tham số interpolation
   * @returns Text đã được dịch
   */
  translateText: (text: string, option?: TranslateOptions) => string;

  /**
   * Ngôn ngữ hiện tại (vi, en, etc.)
   */
  language: string;
}

/**
 * Custom hook để dịch theo scope cụ thể
 *
 * @param i18nScope - tên scope trong file i18n, mặc định là "global"
 * @returns Object chứa các hàm dịch và language hiện tại
 *
 * @example
 * ```tsx
 * const { translate, translateText, language } = useTranslate('camera');
 *
 * const text = translate('disconnected'); // "camera.disconnected"
 *
 * const withParam = translate('reconnecting', { count: 3 });
 *
 * const rawText = translateText('common.save'); // "common.save"
 * ```
 */
function useTranslate(i18nScope?: string): UseTranslateReturn {
  const { t, i18n } = useTranslation();
  const translate = useCallback(
    (text: string, option?: TranslateOptions): string => {
      const checkKey = !option || Object.keys(option).length === 0 ? {} : option;
      return t(`${i18nScope || 'global'}.${text}`, checkKey);
    },
    [i18nScope, t],
  );
  const translateText = useCallback(
    (text: string, option?: TranslateOptions): string => {
      const checkKey = !option || Object.keys(option).length === 0 ? {} : option;
      return t(`${text}`, checkKey);
    },
    [t],
  );
  const language = i18n.language;
  return { translate, translateText, language };
}

export default useTranslate;
