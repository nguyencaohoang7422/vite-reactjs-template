import { Button, withDynamicModule } from '@/shared';
import { getModule, loading } from '@/features/account-managers';
import { useDispatch } from 'react-redux';
import { TableActions } from '@/shared/components/table/data-table.tsx';

const AccountManagersUI = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(loading())}>AccountManagersUI</Button>
      <TableActions />
    </div>
  );
};

const AccountManagersModule = withDynamicModule([getModule()])(AccountManagersUI);

export default AccountManagersModule;
