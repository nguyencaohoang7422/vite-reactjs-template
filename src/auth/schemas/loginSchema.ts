import * as yup from 'yup';

// Định nghĩa validation schema
export const loginSchema = yup
  .object({
    username: yup.string().required('Tài khoản không được bỏ trống'),
    password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Mật khẩu không được bỏ trống'),
    rememberMe: yup.boolean().default(true),
  })
  .required();

// Export type cho TypeScript
export type LoginFormData = yup.InferType<typeof loginSchema>;
