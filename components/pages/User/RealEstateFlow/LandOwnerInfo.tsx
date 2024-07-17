import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { BackAndButton, Tabs } from '@components/ui';
import TitleDescription from '@components/ui/common/TitleDescription';
import { RealEstateBookingStore } from './store';
import { DynamicFieldsGenerate } from '@components/ui/common/inputComponent/DynamicFieldsGenerate';

export const LandOwnerInfo = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    RealEstateBookingStore.update(s => {
      s.seller = {
        ...s.seller,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
    });
    history.push('/realestatepackage');
  };

  const fields = [
    {
      fieldName: 'name',
      inputType: 'text',
      label: 'First Name/Company Name',
      defaultValue: '',
    },
    {
      fieldName: 'lastname',
      inputType: 'text',
      label: 'Last Name/Company Name',
      defaultValue: '',
    },
    {
      fieldName: 'email',
      inputType: 'text',
      label: 'Email Address',
      defaultValue: '',
      config: {
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email address',
        },
      },
    },
    {
      fieldName: 'phoneNumber',
      inputType: 'text',
      label: 'Phone Number',
      defaultValue: '',
      config: {
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Invalid phone number',
        },
      },
    },
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
          <Tabs activeTab={0} />
          <TitleDescription
            heading="How do we contact the seller?"
            description="Enter the land owner’s details"
          />
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};
