import { Avatar, AvatarFallback, AvatarImage, Button, useDispatchResolve } from '@/shared';
import { MultipleCombobox } from '@/shared/components/common/MultipleCombobox';
import { ComboboxPopup } from '@/shared/components/common/SampleCombobox';
import InputField from '@/shared/components/form/registers/InputField';
import { Field, FieldGroup } from '@/shared/components/ui/field';
import useTranslate from '@/shared/hooks/useTranslate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { staffScope } from '..';
import { staffFormSchema, type StaffFormData } from '../../schemas';
import { selectStaffState, type Shift, type Staff } from '../../stores';

type StaffFormProps = {
  data?: Staff;
  onClose: () => void;
};
const StaffForm = ({ data, onClose }: StaffFormProps) => {
  const dispatchResolve = useDispatchResolve();
  const shiftList = useSelector(selectStaffState('shiftList')) as Shift[];
  const { translate } = useTranslate(staffScope);
  const {
    handleSubmit,
    control,
    reset,
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
      timekeepingShiftIds: [],
    },
    mode: 'onSubmit',
    resolver: yupResolver(staffFormSchema),
  });

  useEffect(() => {
    if (data != null) {
      reset({
        email: data.email,
        id: data.id,
        note: data.note,
        imageUrl: data.imageURL,
        name: data.name,
        timekeepingShiftIds: data.timekeepingShiftIds,
        phoneNumber: data.phoneNumber,
      });
    }
  }, [data, reset]);

  const handleActionForm = async (formData: StaffFormData) => {
    const submitData = {
      id: formData.id,
      name: formData.name,
      note: formData.note,
      imageURL: formData.imageUrl,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      timekeepingShiftIds: formData.timekeepingShiftIds,
      passwordTimekeeping: formData.passwordTimekeeping,
    };

    // const response = await dispatchResolve(insert(submitData));
    // if (response?.success) {
    //   onClose();
    // }
  };
  return (
    <form onSubmit={handleSubmit(handleActionForm)}>
      <FieldGroup className="p-0">
        <Field>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { ref, value, onChange } }) => {
              return (
                <Avatar size="lg" className="border" ref={ref} onChange={(selected) => {}}>
                  <AvatarImage src={value} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              );
            }}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label={translate('id')}
            autoFocus
            className="col-span-1"
            register={register('id')}
            placeholder={translate('p_id')}
            error={errors.id?.message}
          />
          <InputField
            label={translate('name')}
            className="col-span-1"
            register={register('name')}
            placeholder={translate('p_name')}
            error={errors.name?.message}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label={translate('phoneNumber')}
            register={register('phoneNumber')}
            placeholder={translate('p_phoneNumber')}
            error={errors.phoneNumber?.message}
          />
          <InputField
            label={translate('email')}
            register={register('email')}
            placeholder={translate('p_email')}
            error={errors.email?.message}
          />
        </div>
        <Controller
          control={control}
          name="timekeepingShiftIds"
          render={({ field: { ref, value, onChange } }) => {
            return (
              <MultipleCombobox
                ref={ref}
                value={value}
                items={shiftList.map((x) => ({ label: x.name, key: x.id }))}
                modal={true} // Thêm prop này khi dùng trong dialog
                onChange={(selected) => {
                  const val = selected?.map((x: { label: string; key: string }) => x.key);
                  onChange(val);
                }}
              />
            );
          }}
        />

        <ComboboxPopup />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label={translate('password')}
            register={register('passwordTimekeeping')}
            placeholder={translate('p_password')}
            error={errors.passwordTimekeeping?.message}
          />
          <InputField
            label={translate('note')}
            register={register('note')}
            placeholder={translate('p_note')}
            error={errors.note?.message}
          />
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
            ) : data ? (
              ' Cập nhật '
            ) : (
              ' Tạo '
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default StaffForm;
