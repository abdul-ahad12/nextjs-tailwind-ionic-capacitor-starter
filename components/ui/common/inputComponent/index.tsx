import React from 'react';
import { Text } from '../text';
import { Input } from '../input';

const InputComponent = ({ text, placeholder, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <Text size="small">{text}</Text>
      <Input placeholder={placeholder ? placeholder : text} error={error} />
      {error && (
        <Text error={error} >
          Please enter a valid phone number
        </Text>
      )}
    </div>
  );
};

export default InputComponent;
