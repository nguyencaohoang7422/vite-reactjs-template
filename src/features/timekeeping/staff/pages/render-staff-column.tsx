// This type is used to define the shape of our data.

import ActionDropdown from '@/shared/components/common/ActionDropdown';
import type { DataTableColumn } from '@/shared/components/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { DotsThreeVerticalIcon } from '@phosphor-icons/react';
import type { handleOpenDialogType, StaffDialogType } from '.';
import type { Staff } from '../stores';

export const renderStaffColumn = ({
  handleOpenDialog,
}: {
  handleOpenDialog: handleOpenDialogType;
}): DataTableColumn<Staff>[] => {
  return [
    {
      label: 'STT',
      key: 'index',
      render: (_, rowIndex: number) => <span>{rowIndex + 1}</span>,
    },
    {
      label: 'avatar',
      key: 'imageURL',
      render: (row) => (
        <Avatar className="h-7">
          <AvatarImage src={row.imageURL} alt="@shadcn" className="grayscale" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
    {
      label: 'Tên nhân viên',
      key: 'name',
    },
    {
      label: 'Ca trực',
      key: 'timekeepingShiftIds',
      render: (row) => <div>{row.timekeepingShiftIds.join(',')}</div>,
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Số điện thoại',
      key: 'phoneNumber',
    },
    {
      label: '',
      key: '',
      render: (row) => (
        <ActionDropdown
          icon={<DotsThreeVerticalIcon />}
          items={[
            { label: 'Sửa', key: 'edit' },
            { label: 'Xóa', key: 'delete', variant: 'destructive' },
          ]}
          onClick={(item) => handleOpenDialog(item.key as StaffDialogType, row)}
        />
      ),
    },
  ];
};
