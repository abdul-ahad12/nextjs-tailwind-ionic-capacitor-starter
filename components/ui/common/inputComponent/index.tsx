import React from 'react';
import { Text } from '../text';
import { Input } from '../input';

interface IInputComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  placeholder?: string;
  error?: boolean;
}

const InputComponent: React.FC<IInputComponent> = ({
  text,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Text className='text-[#1A202F]'>{text}</Text>
      <Input
        placeholder={placeholder ? placeholder : text}
        error={error}
        {...rest}
      />
      {error && <Text error={error}>Please enter a valid phone number</Text>}
    </div>
  );
};

export default InputComponent;
