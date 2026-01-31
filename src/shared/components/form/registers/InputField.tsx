import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useId, type InputHTMLAttributes } from 'react';
import { InputGroup, InputGroupInput } from '../../ui/input-group';
type InputFieldProps = {
  label?: string;
  id?: string;
  error?: string;
  register?: any;
  placeholder?: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;
const InputField = ({
  label = '',
  id,
  register,
  error,
  placeholder = '',
  type = 'text',
  ...props
}: InputFieldProps) => {
  const randomId = useId();
  const _id = id ?? randomId;
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor={id}>{error ? <FieldError className="font-semibold">{error}</FieldError> : label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...props}
          id={_id}
          aria-invalid={!!error}
          type={type}
          placeholder={placeholder}
          {...register}
        />
      </InputGroup>
    </Field>
  );
};

export default InputField;
