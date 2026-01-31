import { useEffect, useState } from 'react';
import DialogModal from '../dialog';

const GlobalDialogProvider = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail.type === 'show') {
        setPayload(e.detail.payload);
        setOpen(true);
      } else if (e.detail.type === 'hide') {
        setOpen(false);
        setPayload(null);
      }
    };
    globalThis.addEventListener('__GLOBAL_DIALOG_EVENT__', handler as EventListener);
    return () => globalThis.removeEventListener('__GLOBAL_DIALOG_EVENT__', handler as EventListener);
  }, []);

  return (
    <DialogModal open={open} onOpenChange={setOpen} trigger={<div></div>} {...(payload || {})}>
      {payload?.children || null}
    </DialogModal>
  );
};

export default GlobalDialogProvider;
