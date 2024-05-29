import React from 'react';
import { Text } from './text';

interface IRadioBtn {
  label: string;
  checked: boolean;
  onChange: () => void;
  modal?: boolean;
}

const RadioBtn: React.FC<IRadioBtn> = ({ label, checked, onChange, modal }) => {
  return (
    <div
      className={` flex gap-3 ${modal && 'flex-row-reverse justify-between w-full'} items-center cursor-pointer`}
      onClick={onChange}
    >
      <div
        className={`border-2 ${checked ? 'border-secomdary' : 'border-gray-400'} rounded-secondary`}
      >
        <div
          className={`${checked ? 'bg-secomdary' : 'bg-transparent'} rounded-secondary m-[2px] p-[8px]`}
        ></div>
      </div>
      <Text
        className={`text-${checked ? 'secomdary' : 'gray-400'} font-medium`}
      >
        {label}
      </Text>
    </div>
  );
};

export default RadioBtn;
