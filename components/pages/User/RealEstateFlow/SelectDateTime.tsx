import React, { useState } from 'react';
import TitleDescription from '../../../ui/common/TitleDescription';
import { FormProvider, useForm } from 'react-hook-form';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { baseURL } from '../../../../utils/definations/axios/url';
import Tabs from '../../../ui/common/Layouts/TabsBooking';
import { Text } from '../../../ui/common/text';
import RadioBtn from '../../../ui/common/radioBtn';
import { RealEstateBookingStore } from './store';
import { DynamicFieldsGenerate } from '@components/ui/common/inputComponent/DynamicFieldsGenerate';

const RealEstateSelectDateTime = () => {
  const history = useHistory();
  const formMethods = useForm();
  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

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
        //   RealEstateBookingStore.update(s => {
        //     s.id = data.data.bookingId;
        //   });
        //   console.log(BookingResponseStore.getRawState());
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

  console.log(customerData);
  const onSubmit = (data: any, error: any) => {
    history.push('/lookingforrealestate')
    // if (customerData) {
    //     RealEstateBookingStore.update(s => {
    //     // this should be set when the customer is logged in or created
    //     s.customerId = customerData?.customer.id;
    //     // s.date = data.selectdate;
    //     // s.time = data.selecttime;
    //   });
    // }

    // console.log(RealEstateBookingStore.getRawState());

    // const requestConfig = {
    //   method: 'post',
    //   url: `${baseURL}/booking`,
    //   data: RealEstateBookingStore.getRawState(),
    // };

    // mutate(requestConfig);
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

  // State for radio buttons
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);

  // Handlers for radio buttons
  const handleOption1Change = () => {
    setSelectedOption1(prevState => !prevState);
  };

  const handleOption2Change = () => {
    setSelectedOption2(prevState => !prevState);
  };

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        back
        BtnText={isPending ? '...Loading' : 'Checkout'}
        title="Select DateTime"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <Tabs activeTab={4} />

          <div className="w-[80%] text-center">
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

export default RealEstateSelectDateTime;
