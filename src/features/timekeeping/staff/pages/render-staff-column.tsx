// This type is used to define the shape of our data.

import { Button } from '@/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components';
import type { DataTableColumn } from '@/shared/components/table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { DotsThreeIcon } from '@phosphor-icons/react';
import type { Staff } from '../stores';

export const columns: DataTableColumn<Staff>[] = [
  {
    label: 'STT',
    key: 'index',
    render: (_, rowIndex: number) => <span>{rowIndex + 1}</span>,
  },
  {
    label: 'avatar',
    key: 'imageURL',
    render: (row) => (
      <Avatar>
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
    label: 'Email',
    key: 'email',
  },
  {
    label: 'id',
    key: 'id',
  },
  {
    label: '_id',
    key: '_id',
  },
  {
    label: 'Actions',
    key: '',
    render: (row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="">
            <DotsThreeIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
