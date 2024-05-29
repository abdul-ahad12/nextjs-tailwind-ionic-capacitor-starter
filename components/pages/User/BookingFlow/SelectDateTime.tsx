import React from 'react';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';

const SelectDateTime = () => {
  const history=useHistory()
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    console.log(data);
      history.push('/payments');
  };

  const fields = [
    {
      fieldName: 'selectdate',
      inputType: 'date',
      label: 'Select Date',

      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'selecttime',
      inputType: 'time',
      label: 'Select Time',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
  ];
  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        back
        BtnText="Checkout"
        title="Solt Section"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className=" w-[80%] text-center">
            <TitleDescription
              heading="Select Time and Date"
              description="Select the preferred slot to proceed 
            to checkout."
            />
          </div>
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};

export default SelectDateTime;
