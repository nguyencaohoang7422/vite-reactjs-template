import * as yup from 'yup';

export const staffFormSchema = yup
  .object({
    id: yup.string().required('id là bắt buộc'),
    name: yup.string().required('username là bắt buộc'),
    email: yup.string().nullable().email('Mật khẩu phải có ít nhất 8 ký tự'),
    phoneNumber: yup.string(),
    note: yup.string(),
    passwordTimekeeping: yup.string(),
    imageUrl: yup.string(),
  })
  .required();

// Export type cho TypeScript
export type StaffFormData = yup.InferType<typeof staffFormSchema>;
