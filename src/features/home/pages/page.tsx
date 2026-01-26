import { menuData2, type MenuItem } from '@/shared';
import ModuleCard from '@/features/home/components/ModuleCard.tsx';

const HomePage = () => {
  return (
    <>
      <div className={'m-auto w-full'}>Application</div>
      <div className={'grid grid-cols-3 gap-4'}>
        {menuData2?.map((item: MenuItem) => (
          <ModuleCard
            key={item.id}
            menuItem={item.menuItems}
            icon={item.icon}
            nameKey={item.key}
            link={item.link}
            className={'col-span-1'}
          />
        ))}
      </div>
    </>
  );
};
export default HomePage;
