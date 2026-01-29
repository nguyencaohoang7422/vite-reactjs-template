import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  withDynamicModule,
} from '@/shared';
import DialogModal from '@/shared/components/dialog';
import { DataTable } from '@/shared/components/table/data-table';
import { DotsThreeIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModule, selectStaffState, type Staff } from '../stores';
import StaffForm from './popups/staff-form';
import { columns } from './render-staff-column';

const StaffUI = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectStaffState('isLoading')) as boolean;
  const list = useSelector(selectStaffState('list')) as Staff[];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-end">
        <ButtonGroup>
          <DialogModal
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Add Staff"
            trigger={<Button size={'sm'}>Add</Button>}>
            <StaffForm onClose={() => setIsOpen(false)} />
          </DialogModal>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-foreground">
                <DotsThreeIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Lấy tệp excel mẫu</DropdownMenuItem>
              <DropdownMenuItem>Thêm nhân viên bằng tệp excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
      <div className="border">
        <DataTable isLoading={isLoading} columns={columns} data={list} />
      </div>
    </div>
  );
};

const StaffModule = withDynamicModule([getModule()])(StaffUI);
export default StaffModule;
