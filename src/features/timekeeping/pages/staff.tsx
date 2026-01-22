import { Button, useDynamicModule } from '@/shared';
import { getModule, loading } from '@/features/timekeeping';
import { useDispatch } from 'react-redux';

const StaffUI = () => {
  useDynamicModule([getModule()]);
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(loading())}>StaffUI</Button>
    </div>
  );
};

export default StaffUI;
