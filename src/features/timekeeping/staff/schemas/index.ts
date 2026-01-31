import * as yup from 'yup';

export const staffFormSchema = yup
  .object({
    id: yup.string().required('Mã nhân viên không được bỏ trống'),
    name: yup.string().required('Tên nhân viên không được bỏ trống'),
    email: yup.string().nullable().email('Email không đúng định dạng'),
    phoneNumber: yup.string(),
    note: yup.string(),
    passwordTimekeeping: yup.string(),
    imageUrl: yup.string(),
    timekeepingShiftIds: yup.array(),
  })
  .required();

// Export type cho TypeScript
export type StaffFormData = yup.InferType<typeof staffFormSchema>;
