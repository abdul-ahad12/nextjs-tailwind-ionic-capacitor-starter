import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { DynamicFieldsGenerate } from '../../ui/common/inputComponent/DynamicFieldsGenerate';
import { FormProvider, useForm } from 'react-hook-form';
import HeightFullLayout from '../../ui/common/Layouts/HeightFullLayout';
import { AddImageSvg } from '../../ui/common/svgs';
import { useHistory } from 'react-router';
import RadioBtn from '../../ui/common/radioBtn';
import { Text } from '../../ui/common/text';
import { approvalRequestStore } from './store';

const Abn = () => {
  const history = useHistory();

  const takePhoto = () => {
    console.log('first');
  };
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    approvalRequestStore.update(s => {
      s.abn= data.abn;
    });
    

    history.push('/businessdetails');
  };
  const fields = [
    {
      fieldName: 'abn',
      inputType: 'text',
      label: 'What is your ABN?',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'ABN is required',
        pattern: {
          value: /^[0-9]{11}$/, // Example regex for an 11-digit ABN
          message: 'ABN must be 11 digits',
        },
      },
    },
  ];

  const options = ['Yes', 'No'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <FormProvider {...formMethods}>
      <OnBoardingLayout
        onClick={handleSubmit(onSubmit)}
        BtnText={'Next'}
        back
        heading={'ABN'}
        description={'Australian Business Number'}
      >
        {/* <Text className="text-[#1A202F]">Do You Have An ABN?</Text>
        <div className="flex">
          {options.map((option, index) => (
            <div key={index} className={`py-5 px-2 rounded-secondary `}>
              <RadioBtn
                key={option}
                label={option}
                checked={selectedOption === option}
                onChange={() => handleRadioChange(option)}
              />
            </div>
          ))}
        </div> */}
        <DynamicFieldsGenerate fields={fields} errors={errors} />
        {/* </HeightFullLayout> */}
      </OnBoardingLayout>
    </FormProvider>
  );
};

export default Abn;
