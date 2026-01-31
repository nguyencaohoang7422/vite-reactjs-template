import {
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared';
import { type ReactNode } from 'react';

type DialogModalProps = {
  title: ReactNode;
  trigger: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  clickOutSide?: boolean;
  asChild?: boolean;
};

const DialogModal = ({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  actions,
  contentClassName,
  clickOutSide = false,
  asChild = true,
}: DialogModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(event) => {
          if (!clickOutSide) {
            event.preventDefault();
          }
        }}
        className={cn('text-foreground', contentClassName || 'sm:max-w-106.25')}
        {...(description ? { 'aria-describedby': 'dialog-description' } : {})}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription id="dialog-description">{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4">{children}</div>
        {actions && <DialogFooter>{actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
