import HeaderLayout from './HeaderLayout/HeaderLayout';
import MainLayout from './MainLayout/MainLayout';

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <HeaderLayout />
      <div className="flex flex-1 flex-col gap-3 p-3 pb-0">
        <MainLayout />
      </div>
    </div>
  );
};

export default PrivateLayout;
