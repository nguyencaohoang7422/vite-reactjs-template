import { Button } from '@/shared/components/ui';
import { useDialog } from '@/shared/hooks';

const ExampleComponent = () => {
  const { open, close } = useDialog();

  return (
    <div>
      <Button
        onClick={() =>
          open({
            title: 'Thông báo',
            description: 'Đây là dialog toàn cục!',
            children: <div>Bạn có thể đặt bất kỳ nội dung nào ở đây.</div>,
            actions: <Button onClick={close}>Đóng</Button>,
          })
        }>
        Mở Dialog
      </Button>
    </div>
  );
};

export default ExampleComponent;
