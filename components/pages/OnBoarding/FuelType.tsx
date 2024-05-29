import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { useHistory } from 'react-router';
import RadioBtn from '../../ui/common/radioBtn';
import { mechanicStore } from './store';

const options = ['Petrol', 'Diesel', 'Gas', 'Electric'];

const FuelType = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleRadioChange = (option:any) => {
    setSelectedOption(option);
  };

  const mapToEnumValue = (option:any) => {
    return option.toUpperCase();
  };

  const onSubmit = () => {
    const enumValue = mapToEnumValue(selectedOption);
    mechanicStore.update(s => {
      s.vehicleFuelType = enumValue;
    });
    history.push('/termsandcondition');
  };

  return (
    <OnBoardingLayout
      back
      heading={'In which Type of Fuel do you have more Experience?'}
      description={'Vehicle Fuel Experience'}
      BtnText={'Submit'}
      onClick={onSubmit}
    >
      <div className="gap-6 flex flex-col">
        {options.map((option, index) => (
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
