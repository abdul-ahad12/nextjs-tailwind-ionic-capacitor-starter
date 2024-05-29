import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { useHistory } from 'react-router';
import RadioBtn from '../../ui/common/radioBtn';
import { approvalRequestStore } from './store';

// Define enum for mechanic experience
const MechanicExperience = {
  UnderOneYear: 'UnderOneYear',
  UnderTwoYears: 'UnderTwoYears',
  UnderThreeYears: 'UnderThreeYears',
  UnderFiveYears: 'UnderFiveYears',
  MoreThanFiveYears: 'MoreThanFiveYears',
};

const optionsWithSpaces = [
  'Under One Year',
  'Under Two Years',
  'Under Three Years',
  'Under Five Years',
  'More Than Five Years',
];

const FuelType = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(optionsWithSpaces[0]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  const mapToEnumValue = (option: string) => {
    return option.replace(/ /g, '');
  };

  const onSubmit = () => {
    const enumValue = mapToEnumValue(selectedOption);
    approvalRequestStore.update(s => {
      s.experienceYears = enumValue;
    });
    history.push('/vechiletype');
  };

  return (
    <OnBoardingLayout
      back
      heading={'Mechanic Experience Survey'}
      description={'Years of Experience'}
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
