import { getModule, loading } from '@/features/account-managers';
import { Button, withDynamicModule } from '@/shared';
import { useDispatch } from 'react-redux';

const AccountManagersUI = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(loading())}>AccountManagersUI</Button>
    </div>
  );
};

const AccountManagersModule = withDynamicModule([getModule()])(AccountManagersUI);

export default AccountManagersModule;
