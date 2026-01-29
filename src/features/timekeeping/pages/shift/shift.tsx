import { getModule, loading } from '@/features/timekeeping/staff/stores';
import { Button, withDynamicModule } from '@/shared';
import { useDispatch } from 'react-redux';

const ShiftUI = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(loading())}>StaffUI</Button>
    </div>
  );
};

const ShiftModule = withDynamicModule([getModule()])(ShiftUI);
export default ShiftModule;
