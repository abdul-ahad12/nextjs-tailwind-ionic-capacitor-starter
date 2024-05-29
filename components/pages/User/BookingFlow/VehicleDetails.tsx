import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';

const VehicleDetails = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    console.log(data);
    history.push("/package")
  };

  const fields = [
    {
      fieldName: 'Make',
      inputType: 'text',
      label: 'Enter Make',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'Model',
      inputType: 'text',
      label: 'Enter Model',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'Year',
      inputType: 'text',
      label: 'Enter Year',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'RegNumber',
      inputType: 'text',
      label: 'Enter Registration Number',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    }
  ];
  

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        back
        BtnText="Next"
        title="Seller Information"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <TitleDescription
            heading="How do we contact the seller?"
            description="Enter the vehicle owner’s details"
          />
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};

export default VehicleDetails