import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';
import { BookingStore } from './store';

const VehicleDetails = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    BookingStore.update(s => {
      s.vehicle = {
        ...s.vehicle,
        make: data.make,
        model: data.model,
        regNumber: data.regNumber,
        year: data.year,
      };
    });
    history.push('/package');
  };

  const fields = [
    {
      fieldName: 'make',
      inputType: 'text',
      label: 'Make',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'model',
      inputType: 'text',
      label: 'Enter Model',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'year',
      inputType: 'text',
      label: 'Enter Year',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'regNumber',
      inputType: 'text',
      label: 'Registration Number',
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
        BtnText="Next"
        title="Vehicle Information"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <TitleDescription
            heading="Vehicle Information?"
            description="Enter the vehicle details"
          />
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};

export default VehicleDetails;
