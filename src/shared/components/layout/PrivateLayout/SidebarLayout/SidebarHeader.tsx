import { selectAuthState, type User } from '@/auth';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

const SidebarHeader = () => {
  const {
    uiSettings: { companyLogoURL, companyName },
  } = useSelector(selectAuthState('user')) as User;
  return (
    <div className="flex items-center justify-between gap-0">
      <img src={companyLogoURL} width={40} height={40} alt="logo-image" className="rounded-xl" />
      <h2 className="w-full max-w-35 truncate text-base leading-5 font-bold tracking-normal text-primary-800">
        {companyName}
      </h2>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-xl shadow-[0px_4px_9px_0px_#171A1F1C,0px_0px_2px_0px_#171A1F1F]">
        <ArrowLeftIcon size={14} color="#171A1F" />
      </button>
    </div>
  );
};

export default SidebarHeader;
