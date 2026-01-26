import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main id="main-layout" className="h-[calc(100vh-56px)] flex-1 overflow-auto bg-background">
      <Outlet />
    </main>
  );
};

export default MainLayout;
