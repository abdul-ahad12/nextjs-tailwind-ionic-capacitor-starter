import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';
import { BookingStore } from './store';

export const ContactSeller = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    BookingStore.update(s => {
      s.seller={
        ...s.seller,
        name:data.name,
        lastname:data.lastname,
        email:data.email,
        phoneNumber:data.phoneNumber
      }
    })
    history.push('/whichseller');
  };

  const fields = [
    {
      fieldName: 'name',
      inputType: 'text',
      label: "First Name/Company Name",
      defaultValue: '',
      
    },
    {
      fieldName: 'lastname',
      inputType: 'text',
      label: "Last Name/Company Name",
      defaultValue: '',
      
    },
    {
      fieldName: 'email',
      inputType: 'text',
      label: "Email Address",
      defaultValue: '',
      
    },
    {
      fieldName: 'phoneNumber',
      inputType: 'text',
      label: "Phone Number",
      defaultValue: '',
    
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
