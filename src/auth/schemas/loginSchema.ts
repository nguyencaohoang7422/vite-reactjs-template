import * as yup from 'yup';

// Định nghĩa validation schema
export const loginSchema = yup
  .object({
    username: yup.string().required('username là bắt buộc'),
    password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Mật khẩu là bắt buộc'),
    rememberMe: yup.boolean().default(true),
  })
  .required();

// Export type cho TypeScript
export type LoginFormData = yup.InferType<typeof loginSchema>;
