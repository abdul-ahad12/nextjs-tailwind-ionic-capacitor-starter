import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { useHistory } from 'react-router';
import RadioBtn from '../../ui/common/radioBtn';
import { mechanicStore } from './store';

const optionsWithSpaces = ['Sedan', 'Hasback', 'Suv'];

const FuelType = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(optionsWithSpaces[0]);

  const handleRadioChange = (option:any) => {
    setSelectedOption(option);
  };

  const mapToEnumValue = (option:any) => {
    return option.toUpperCase();
  };

  const onSubmit = () => {
    const enumValue = mapToEnumValue(selectedOption);
    mechanicStore.update(s => {
      s.vehicleTypes = enumValue;
    });
    history.push('/fueltype');
  };

  return (
    <OnBoardingLayout
      back
      heading={'In which Type of Vehicle do you have more Experience?'}
      description={'Vehicle Fuel Experience'}
      BtnText={'Submit'}
      onClick={onSubmit}
    >
      <div className="gap-6 flex flex-col">
        {optionsWithSpaces.map((option, index) => (
          <div
            key={index}
            className={`py-5 px-2 rounded-secondary ${
              selectedOption === option && 'bg-[#f7f7f7]'
            }`}
          >
            <RadioBtn
              key={option}
              label={option}
              checked={selectedOption === option}
              onChange={() => handleRadioChange(option)}
            />
          </div>
        ))}
      </div>
    </OnBoardingLayout>
  );
};

export default FuelType;
