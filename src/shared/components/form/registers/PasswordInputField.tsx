import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useId, useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../ui/input-group';
type PasswordInputFieldProps = {
  label?: string;
  id?: string;
  error?: string;
  register?: any;
  placeholder?: string;
};
const PasswordInputField = ({ label = 'Mật khẩu', id, register, error, placeholder = '' }: PasswordInputFieldProps) => {
  const randomId = useId();
  const _id = id ?? randomId;
  const [inputType, setInputType] = useState<'password' | 'text'>('password');
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor={id}>{error ? <FieldError className="font-semibold">{error}</FieldError> : label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={_id}
          aria-invalid={!!error}
          type={inputType}
          placeholder={placeholder}
          required
          {...register}
        />
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            variant={'ghost'}
            size={'icon-sm'}
            onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
            {inputType === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default PasswordInputField;
