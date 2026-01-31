import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared';
import { type ReactNode } from 'react';

export interface ActionDropdownProps {
  icon: ReactNode;
  items: { label: ReactNode; key: string; variant?: 'default' | 'destructive' }[];
  buttonClassName?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
  menuAlign?: 'start' | 'end';
  onClick?: (item: { label: ReactNode; key: string }) => void;
}

const ActionDropdown = ({
  icon,
  items,
  buttonClassName = '',
  buttonProps = {},
  menuAlign = 'end',
  onClick,
}: ActionDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className={buttonClassName} {...buttonProps}>
        {icon}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={menuAlign}>
      {items.map((item) => (
        <DropdownMenuItem variant={item?.variant} key={item.key} onSelect={() => onClick?.(item)}>
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ActionDropdown;
