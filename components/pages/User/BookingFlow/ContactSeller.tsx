import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';

export const ContactSeller = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    console.log(data);
    history.push('/whichseller');
  };

  const fields = [
    {
      fieldName: 'sellersfirstname',
      inputType: 'text',
      label: "First Name/Company Name",
      defaultValue: '',
      
    },
    {
      fieldName: 'sellerslastname',
      inputType: 'text',
      label: "Last Name/Company Name",
      defaultValue: '',
      
    },
    {
      fieldName: 'sellersemailaddress',
      inputType: 'text',
      label: "Email Address",
      defaultValue: '',
      
    },
    {
      fieldName: 'sellersphonenumber',
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
