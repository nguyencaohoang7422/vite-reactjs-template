import { Button, cn, type MenuItem } from '@/shared';
import { DotsThreeVerticalIcon, HouseLineIcon } from '@phosphor-icons/react';
import { type KeyboardEvent, memo, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import useTranslate from '@/shared/hooks/useTranslate.ts';

type ModuleCardProps = {
  nameKey: string; // tên module
  menuItem?: MenuItem[]; // content menu module
  icon?: ReactNode; // đường dẫn icon module
  link: string; // đường dẫn đến module,
  className?: string;
};
const ModuleCard = memo(({ nameKey, menuItem, icon, link, className }: ModuleCardProps) => {
  const { translate } = useTranslate('home');
  const navigate = useNavigate();
  const handleMenuItemEvent = (e: KeyboardEvent<HTMLDivElement>, item: MenuItem) => {
    if (e.key === 'Enter') {
      navigate(item.link);
    }
  };

  return (
    <div className={cn('rounded-2xl border border-gray-100 px-6 py-6 xl:py-6.75', className)}>
      <div className={'flex items-center justify-between'}>
        {icon && <HouseLineIcon />}
        <NavLink className={'mb-6 flex justify-between'} to={link}>
          {translate(nameKey)}
        </NavLink>
        {menuItem && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" type={'button'} aria-label="Open menu" size="icon-sm">
                <DotsThreeVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-50 max-h-(--radix-dropdown-menu-content-available-height) w-56 min-w-20 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
              align="start">
              <DropdownMenuGroup className="">
                {menuItem?.map((x: MenuItem) => (
                  <DropdownMenuItem
                    onKeyDown={(e) => {
                      handleMenuItemEvent(e, x);
                    }}
                    key={x.id}
                    className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!">
                    <NavLink to={`${link}/${x.link}`}>{translate(x.key)} </NavLink>
                    <DropdownMenuShortcut>⏎</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
});
export default ModuleCard;
