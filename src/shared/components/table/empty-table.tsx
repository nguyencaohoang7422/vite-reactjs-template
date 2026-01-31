import { FolderSimpleDashedIcon } from '@phosphor-icons/react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty';

export function EmptyTable() {
  return (
    <Empty className="flex items-center justify-center">
      <EmptyHeader className="">
        <EmptyMedia variant="icon">
          <FolderSimpleDashedIcon />
        </EmptyMedia>
        <EmptyTitle className="text-foreground">Data is empty</EmptyTitle>
        <EmptyDescription>No data found!</EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}
