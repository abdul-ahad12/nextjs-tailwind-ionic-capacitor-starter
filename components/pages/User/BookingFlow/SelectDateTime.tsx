import React from 'react';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';
import { BookingResponseStore, BookingStore } from './store';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { baseURL } from '../../../../utils/definations/axios/url';

const SelectDateTime = () => {
  const history = useHistory();
  const formMethods = useForm();
const customerDataString = localStorage.getItem('customerdata');
const customerData = customerDataString ? JSON.parse(customerDataString) : null;

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Booking Created:', data);
          BookingResponseStore.update(s => {
            s.id = data.data.bookingid;
          });
          console.log(BookingResponseStore.getRawState());
          history.push('/lookingformechanic');
        },
        onError: error => {
          console.error('Booking failed:', error);
          // Handle error logic, e.g., show error message
        },
        onSettled: () => {
          console.log('Login mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

    console.log(customerData)
  const onSubmit = (data: any, error: any) => {
    if (customerData) {
      BookingStore.update(s => {
        // this should be set when the customer is logged in or created
        s.customerId = customerData.customer.id;
        // s.date = data.selectdate;
        // s.time = data.selecttime;
      });
    }

    console.log(BookingStore.getRawState());

    const requestConfig = {
      method: 'post',
      url: `${baseURL}/booking`,
      data: BookingStore.getRawState(),
    };

    mutate(requestConfig);
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
