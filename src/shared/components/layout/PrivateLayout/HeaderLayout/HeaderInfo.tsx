import { selectUser } from "@/features/auth";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const SidebarHeader = () => {
    const user = useSelector(selectUser);
    const {uiSettings: {companyLogoURL,companyName}} = user;
  return (
     <div className="flex items-center gap-0">
          <img src={companyLogoURL} width={40} height={40} alt="logo-image" className="rounded-xl"/>
          <h2 className="text-base font-bold leading-5 tracking-normal text-primary-800 max-w-35 truncate w-full">{companyName}</h2>
          <button type="button" className="h-8 w-8 rounded-xl flex justify-center items-center shadow-[0px_4px_9px_0px_#171A1F1C,0px_0px_2px_0px_#171A1F1F]">
            <ArrowLeftIcon size={14} color="#171A1F"/>
          </button>
    </div>
  )
}

export default SidebarHeader
