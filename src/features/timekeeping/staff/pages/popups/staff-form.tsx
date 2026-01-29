import { Button, Input, useDispatchResolve } from '@/shared';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { staffFormSchema, type StaffFormData } from '../../schemas';
import { insert } from '../../stores';

type StaffFormProps = {
  data?: any;
  onClose: () => void;
};
const StaffForm = ({ data, onClose }: StaffFormProps) => {
  const dispatchResolve = useDispatchResolve();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      imageUrl: '',
      id: '',
      name: '',
      phoneNumber: '',
      email: '',
      note: '',
      passwordTimekeeping: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(staffFormSchema),
  });

  const handleActionForm = async (formData: StaffFormData) => {
    const response = await dispatchResolve(insert(formData));
    if (response?.success) {
      onClose();
    }
  };
  return (
    <form onSubmit={handleSubmit(handleActionForm)}>
      <FieldGroup className="p-0">
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="id">Id</FieldLabel>
            <Input id="id" type="text" autoFocus placeholder="Enter" required {...register('id')} />
            {errors.id?.message && <FieldError>{errors.id?.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Tên</FieldLabel>
            <Input id="name" type="text" placeholder="Enter" required {...register('name')} />
            {errors.name?.message && <FieldError>{errors.name?.message}</FieldError>}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="phoneNumber">phoneNumber</FieldLabel>
            <Input id="phoneNumber" type="text" placeholder="Enter" {...register('phoneNumber')} />
            {errors.phoneNumber?.message && <FieldError>{errors.phoneNumber?.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="text" placeholder="Enter" {...register('email')} />
            {errors.email?.message && <FieldError>{errors.email?.message}</FieldError>}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="passwordTimekeeping">passwordTimekeeping</FieldLabel>
            <Input id="passwordTimekeeping" type="text" placeholder="Enter" {...register('passwordTimekeeping')} />
            {errors.passwordTimekeeping?.message && <FieldError>{errors.passwordTimekeeping?.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="note">note</FieldLabel>
            <Input id="note" type="text" placeholder="Enter" {...register('note')} />
            {errors.note?.message && <FieldError>{errors.note?.message}</FieldError>}
          </Field>
        </div>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-loader-circle-icon lucide-loader-circle">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              'Add'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default StaffForm;
