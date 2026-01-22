import { Button } from '@/shared/components/ui/button';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useId, useState } from 'react';
type PasswordInputFieldProps = {
  label?: string;
  id?: string;
  error?: string;
  register?: any;
};
const PasswordInputField = ({ label = 'Mật khẩu', id, register, error }: PasswordInputFieldProps) => {
  const randomId = useId();
  const _id = id ?? randomId;
  const [inputType, setInputType] = useState('password');
  return (
    <Field>
      <div className="flex items-center">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
      </div>
      <div className="relative">
        <Input
          id={_id}
          autoComplete="current-password"
          type={inputType}
          placeholder="Enter your password"
          required
          {...register}
        />
        <Button
          type="button"
          size={'icon-sm'}
          className="absolute top-0 right-0"
          onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
        >
          {inputType === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
        </Button>
      </div>
      <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
        Forgot your password?
      </a>
      {error && <span>{error}</span>}
    </Field>
  );
};

export default PasswordInputField;
