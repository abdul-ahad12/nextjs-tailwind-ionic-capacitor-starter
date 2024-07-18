import React, { useState } from 'react';
import { Text } from '../text';
import { Button } from '../button';

// Define a type for the option
type Option = {
  id: number;
  label: string;
  src: string;
};

type RadioButtonGroupProps = {
  options: Option[];
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionChange = (optionId: number) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex justify-between items-center w-full">
        <Text typography="modalHeader">Payment Method</Text>
        <Button
          color="secondary"
          className="text-blue-600 underline w-fit font-semibold"
        >
          Add new card
        </Button>
      </div>
      <div className="flex flex-col gap-3 border rounded-md p-3">
        {options.map(option => (
          <div key={option.id} className="flex justify-between">
            <div className="flex items-center gap-2">
              <img src={option.src} alt="alt" />
              <label
                className="text-[14px] font-semibold"
                htmlFor={`option${option.id}`}
              >
                {option.label}
              </label>
            </div>
            <input
              type="radio"
              id={`option${option.id}`}
              name="options"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
