import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { BookingStore } from './store';
import { BackAndButton, Tabs } from '@components/ui';
import TitleDescription from '@components/ui/common/TitleDescription';
import  DynamicFieldsGenerate  from '@components/ui/common/InputComponent/DynamicFieldsGenerate';

export const ContactSeller = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    BookingStore.update(s => {
      s.seller = {
        ...s.seller,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
    });
    history.push('/whichseller');
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
            description="Enter the vehicle owner’s details"
          />
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};
