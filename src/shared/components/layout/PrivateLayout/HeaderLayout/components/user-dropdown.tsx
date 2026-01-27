import { type Theme, useTheme } from '@/app/providers/theme-provider.tsx';
import { logout, selectAuthState, type User } from '@/auth';
import {
  Button,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/shared/components/ui';
import {
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SignOutIcon,
  SunIcon,
  TranslateIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  //selector
  const { imageURL, username } = useSelector(selectAuthState('user')) as User;

  const handleLogout = () => dispatch(logout());

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className={'p-0 text-accent-foreground'} size={'icon-sm'}>
          <UserCircleIcon className={'w-full text-foreground!'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} className="" align="start">
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
        <DropdownMenuItem asChild>
          <Button onClick={handleLogout} className="w-full text-accent-foreground" type={'button'} variant={'ghost'}>
            <SignOutIcon className="text-foreground!" />
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
