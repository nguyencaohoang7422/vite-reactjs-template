import { cn } from "@/shared/libs";
import SidebarHeader from "../SidebarLayout/SidebarHeader";
import { DropdownSidebar } from "./DropdownSidebar";

type HeaderProps = {
  className?:string
}
const HeaderLayout = ({className}:HeaderProps) => {
  return (
    <header id="header-layout" className={cn('h-16 bg-white rounded-xl shadow-[0px_4px_9px_0px_#171A1F1C,0px_0px_2px_0px_#171A1F1F] flex',className)}>
      <SidebarHeader/>
      <DropdownSidebar/>
    </header>
  )
}

export default HeaderLayout;
