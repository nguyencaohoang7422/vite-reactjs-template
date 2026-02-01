import { cn } from '@/shared';
import UserDropdown from '@/shared/components/layout/PrivateLayout/HeaderLayout/components/user-dropdown.tsx';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { HouseLineIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  className?: string;
};
const HeaderLayout = ({ className }: HeaderProps) => {
  return (
    <header
      id="header-layout"
      className={cn('sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-background', className)}>
      <div className="container-wrapper 3xl:fixed:px-0 w-full px-6">
        <SidebarTrigger />
        <div className="3xl:fixed:container flex h-(--header-height) w-full items-center **:data-[slot=separator]:h-4!">
          <NavLink
            data-slot="button"
            data-variant="ghost"
            data-size="icon"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 hidden size-8 shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-foreground transition-all outline-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 lg:flex dark:hover:bg-accent/50 dark:aria-invalid:ring-destructive/40"
            to="/">
            <HouseLineIcon className={'text-foreground'} />
          </NavLink>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
