import { Button } from "@/shared/components/ui";
import { DropdownMenuShortcut } from "@/shared/components/ui/dropdown-menu";
import { menuData, type ItemMenu } from "@/shared/constants";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { find } from 'lodash';

export function DropdownSidebar() {
    
    const menu = find(menuData,(item: ItemMenu)=> item.id === 'home')?.menuItemList;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <DotsThreeIcon  />
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-20 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md w-56" align="start">
        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium data-inset:pl-8">Menu sidebar</DropdownMenuLabel>
        <DropdownMenuGroup  className="">
            {menu?.map((x)=>
             <DropdownMenuItem key={x.id} className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                {x.name}
                <DropdownMenuShortcut className="text-muted-foreground ml-auto text-xs tracking-widest">⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            )}
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />   
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
