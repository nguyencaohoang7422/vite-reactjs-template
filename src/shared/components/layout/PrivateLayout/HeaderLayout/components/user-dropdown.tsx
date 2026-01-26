import {
  Button,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared';
import {
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SignOutIcon,
  SunIcon,
  TranslateIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/shared/components/ui';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from '@/shared/components/dialog';
import { useState } from 'react';
import { logout, selectAuthState, type User } from '@/auth';
import { useTranslation } from 'react-i18next';
import { type Theme, useTheme } from '@/app/providers/theme-provider.tsx';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  //selector
  const { imageURL, username } = useSelector(selectAuthState('user')) as User;

  const handleLogout = () => {
    console.log(~'Logging out...');
    dispatch(logout());
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className={'size-4 !p-0 text-foreground'} size={'icon-sm'}>
          <UserCircleIcon className={'w-full text-foreground'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="z-50 max-h-(--radix-dropdown-menu-content-available-height) w-56 min-w-20 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        align="start">
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-1.5 text-sm font-medium data-inset:pl-8">
          <img src={imageURL} alt={'avatar'} height={40} width={40} />
          <span>{username ?? 'unknown'}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TranslateIcon />
            Language
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={i18n.language} onValueChange={(lang) => i18n.changeLanguage(lang)}>
                  <DropdownMenuRadioItem value="vi">vi - Tiếng Việt</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">en - English</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PaletteIcon />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Current theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
                  <DropdownMenuRadioItem value="light">
                    <SunIcon />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <MoonIcon />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <MonitorIcon />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DialogModal onSubmit={handleLogout}>
          <Button type={'button'} variant={'ghost'}>
            <SignOutIcon />
            Sign Out
            <DropdownMenuShortcut>Alt + F4</DropdownMenuShortcut>
          </Button>
        </DialogModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
