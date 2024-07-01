import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import Tabs from '../../../ui/common/Layouts/TabsBooking';
import { DynamicFieldsGenerate } from '../../../ui/common/InputComponent/DynamicFieldGenerate';

export const WhichSeller = () => {
  const history = useHistory();
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const onSubmit = (data: any, error: any) => {
    console.log(data);
    history.push("/vehicledetails")
  };

  const fields = [
    {
      fieldName: 'service',
      inputType: 'select',
      label: 'Inspection Service',
      defaultValue: '',
      options: [
        {
          value: 'PRE_PURCHASE_INSPECTION',
          label: 'Pre Purchase Inspection',
        },
      ],
      config: {
        required: 'Required',
      },
    },
    // {
    //   fieldName: 'vehicletype',
    //   inputType: 'select',
    //   label: 'Vehicle Type',
    //   defaultValue: '',
    //   options: [
    //     {
    //       value: 'hello',
    //       label: 'hello',
    //     },
    //   ],
    //   config: {
    //     required: 'Required',
    //   },
    // },
  ];

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        back
        BtnText="Next"
        title="Service"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
        <Tabs activeTab={1} />

          <TitleDescription
            heading="Select a Service "
            description="Select the service you want to have"
          />
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </div>
      </BackAndButton>
    </FormProvider>
  );
};
