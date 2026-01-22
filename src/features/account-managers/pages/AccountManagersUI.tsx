import { Button, withDynamicModule } from '@/shared';
import { getModule, loading, selectStateByKey } from '@/features/account-managers';
import { useDispatch, useSelector } from 'react-redux';

const AccountManagersUI = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectStateByKey('list'));
  console.log('🚀 ~ AccountManagersUI ~ user: ', user);

  return (
    <div>
      <Button onClick={() => dispatch(loading())}>AccountManagersUI</Button>
    </div>
  );
};

const AccountManagersModule = withDynamicModule([getModule()])(AccountManagersUI);

export default AccountManagersModule;
