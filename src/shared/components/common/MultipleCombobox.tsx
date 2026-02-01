import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@/shared/components/ui/combobox';
import { cn } from '@/shared/libs';
import * as React from 'react';

/**
 * Item type for MultipleCombobox: { key, label }
 */
export interface ComboboxItemType<K = string | number> {
  key: K;
  label: string;
  [x: string]: any;
}
export interface MultipleComboboxProps<K> {
  readonly items: readonly ComboboxItemType<K>[];
  readonly value?: ComboboxItemType<K>[] | ComboboxItemType<K>;
  readonly defaultValue?: ComboboxItemType<K>[] | ComboboxItemType<K>;
  readonly onChange?: (value: ComboboxItemType<K>[] | ComboboxItemType<K> | null) => void;
  readonly placeholder?: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly multiple?: boolean;
  readonly triggerRender?: React.ReactNode;
  readonly inputProps?: Record<string, any>;
  readonly modal?: boolean; // Use this when combobox is inside a modal
  // Any other Combobox props can be added as needed
}

export const MultipleCombobox = React.forwardRef(function MultipleCombobox<K = string | number>(
  props: MultipleComboboxProps<K>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    items,
    value,
    defaultValue,
    onChange,
    placeholder = 'Select...',
    className = '',
    disabled = false,
    multiple = true,
    triggerRender,
    inputProps = {},
    modal = false,
    ...restProps
  } = props;
  const anchor = React.useRef<HTMLDivElement | null>(null);

  // Memoize itemMap with deep comparison of items keys
  const itemMap = React.useMemo(() => {
    const map = new Map<string, ComboboxItemType<K>>();
    items.forEach((item) => map.set(String(item.key), item));
    return map;
  }, [items]);

  // Memoize items keys array
  const itemKeys = React.useMemo(() => items.map((item) => String(item.key)), [items]);

  // Convert value/defaultValue to array of keys for Combobox
  const valueKeys = React.useMemo(() => {
    if (multiple) {
      if (Array.isArray(value)) {
        const keys = value.map((v) => String(v.key));
        return keys;
      }
      return [];
    } else {
      return value ? String((value as ComboboxItemType<K>).key) : undefined;
    }
  }, [value, multiple]);

  const defaultValueKeys = React.useMemo(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) {
        return defaultValue.map((v) => String(v.key));
      }
      return [];
    } else {
      return defaultValue ? String((defaultValue as ComboboxItemType<K>).key) : undefined;
    }
  }, [defaultValue, multiple]);

  // Control open/close for single/multi
  const [open, setOpen] = React.useState(false);

  // Ref to track if we should keep dropdown open
  const keepOpenRef = React.useRef(false);

  // Handle value change from Combobox
  const handleValueChange = React.useCallback(
    (keys: string | string[] | null) => {
      if (!onChange) return;
      if (keys == null) {
        onChange(multiple ? [] : null);
        return;
      }
      // Map keys back to full objects
      if (multiple) {
        const arr = Array.isArray(keys) ? keys : [keys];
        const selected = arr.map((k) => itemMap.get(k)).filter(Boolean) as ComboboxItemType<K>[];
        onChange(selected);

        // In multiple mode, keep dropdown open after selection
        keepOpenRef.current = true;
        setTimeout(() => {
          keepOpenRef.current = false;
        }, 0);
      } else {
        const selected = itemMap.get(keys as string) || null;
        onChange(selected);

        // In single mode, close dropdown
        setOpen(false);
      }
    },
    [multiple, onChange, itemMap],
  );
  // Handle open change
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    // Don't close if we just selected an item in multiple mode
    if (!newOpen && keepOpenRef.current) {
      return;
    }
    setOpen(newOpen);
  }, []);
  // Render trigger
  const renderTrigger = () => {
    if (triggerRender) return triggerRender;
    if (multiple) {
      return (
        <ComboboxChips
          ref={anchor}
          className={cn(
            'pointer-events-auto w-full max-w-xs flex-nowrap overflow-hidden whitespace-nowrap ' + 'scrollbar-hide',
            'custom-multi-combo-chips',
            className,
          )}>
          <ComboboxValue>
            {(keys: string[]) => {
              const maxChips = 2;
              const showEllipsis = keys.length > maxChips;
              const visibleKeys = showEllipsis ? keys.slice(0, maxChips) : keys;
              return (
                <React.Fragment>
                  {visibleKeys.map((key) => {
                    const item = itemMap.get(key);
                    return item ? <ComboboxChip key={key}>{item.label}</ComboboxChip> : null;
                  })}
                  {showEllipsis && <span style={{ padding: '0 4px', fontSize: 12 }}>...</span>}
                  {visibleKeys && <ComboboxChipsInput placeholder={placeholder} />}
                </React.Fragment>
              );
            }}
          </ComboboxValue>
        </ComboboxChips>
      );
    } else {
      // Single: show value or placeholder
      const selected = value && !Array.isArray(value) ? value : null;
      return (
        <button
          type="button"
          className={cn(
            'flex w-full max-w-xs items-center justify-between rounded border px-3 py-2 font-normal',
            'bg-background text-foreground',
            className,
          )}
          onClick={() => setOpen((o) => !o)}
          ref={anchor as any}>
          <span>{selected ? selected.label : placeholder}</span>
          <span style={{ marginLeft: 8 }}>▼</span>
        </button>
      );
    }
  };

  return (
    <Combobox
      multiple={multiple}
      autoHighlight
      items={itemKeys}
      value={valueKeys}
      defaultValue={defaultValueKeys}
      onValueChange={handleValueChange}
      disabled={disabled}
      open={open}
      onOpenChange={handleOpenChange}
      {...restProps}>
      {renderTrigger()}
      <ComboboxContent
        anchor={anchor}
        className={cn(modal ? 'pointer-events-auto z-99999' : '')}
        style={modal ? { zIndex: 99999, pointerEvents: 'auto' } : undefined}>
        {multiple ? null : <ComboboxInput showTrigger={false} placeholder={placeholder} {...inputProps} />}
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList className={cn('max-h-50 overflow-y-auto', modal ? 'pointer-events-auto' : '')}>
          {(key: string) => {
            const item = itemMap.get(key);
            return item ? (
              <ComboboxItem key={key} value={key}>
                {item.label}
              </ComboboxItem>
            ) : null;
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
});
