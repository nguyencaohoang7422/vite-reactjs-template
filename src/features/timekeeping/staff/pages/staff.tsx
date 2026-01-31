import { Button, ButtonGroup, useDialog, withDynamicModule } from '@/shared';
import ActionDropdown from '@/shared/components/common/ActionDropdown';
import { ComboboxPopup } from '@/shared/components/common/SampleCombobox';
import { DataTable } from '@/shared/components/table/data-table';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group';
import useTranslate from '@/shared/hooks/useTranslate';
import { DotsThreeIcon, MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { staffScope } from '.';
import { getModule, selectStaffState, type Staff } from '../stores';
import StaffForm from './popups/staff-form';
import { renderStaffColumn } from './render-staff-column';
export type StaffDialogType = 'add' | 'edit' | 'delete' | 'getExcel' | 'addStaffByExcel';
export type handleOpenDialogType = (type: StaffDialogType, data?: Staff) => void;
const StaffUI = () => {
  const dispatch = useDispatch();
  const { translate } = useTranslate(staffScope);
  const isLoading = useSelector(selectStaffState('isLoading')) as boolean;
  const list = useSelector(selectStaffState('list')) as Staff[];
  const { open, close } = useDialog();
  const handleOpenDialog = useCallback(
    (type: StaffDialogType, data?: Staff) => {
      const dialogConfigs: Record<string, Partial<Parameters<typeof open>[0]>> = {
        add: {
          title: 'Thêm nhân viên',
          children: <StaffForm onClose={close} />,
        },
        edit: {
          title: 'Sửa nhân viên',
          children: <StaffForm onClose={close} data={data} />,
        },
        delete: {
          title: 'Xoá nhân viên',
          children: <div>Bạn có chắc muốn xoá?</div>,
          actions: (
            <Button variant={'destructive'} onClick={close}>
              Xóa
            </Button>
          ),
        },
        getExcel: {
          title: 'Export excel file',
          children: <div>Export file excel mẫu</div>,
        },
        addStaffByExcel: {
          title: 'Thêm nhân viên bằng excel',
          children: <div>Upload file excel để thêm nhân viên</div>,
        },
      };

      const config = dialogConfigs[type] || {};
      open({
        contentClassName: 'min-w-md pointer-event-auto',
        ...config,
      });
    },
    [close, open],
  );
  const columns = useMemo(() => renderStaffColumn({ handleOpenDialog }), [handleOpenDialog]);
  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-end gap-2">
        <InputGroup className="h-8 max-w-xs">
          <InputGroupInput className="text-foreground" placeholder="Tìm tên nhân viên" />
          <InputGroupAddon>
            <MagnifyingGlassIcon />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroup>
          <Button size={'sm'} onClick={() => handleOpenDialog('add')}>
            <PlusIcon /> {translate('add')}
          </Button>
          <ActionDropdown
            icon={<DotsThreeIcon />}
            buttonClassName="text-foreground"
            items={[
              { label: translate('getExcelSample'), key: 'getExcel' },
              { label: 'Thêm nhân viên bằng tệp excel', key: 'addStaffByExcel' },
            ]}
            onClick={(item) => handleOpenDialog(item.key as StaffDialogType)}
          />
        </ButtonGroup>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <DataTable className="" isLoading={isLoading} columns={columns} data={list} />
      </div>
      <ComboboxPopup />
    </div>
  );
};
const StaffModule = withDynamicModule([getModule()])(StaffUI);
export default StaffModule;
