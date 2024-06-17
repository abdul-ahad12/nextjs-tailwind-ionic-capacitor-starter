import React, { useEffect, useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { Text } from '../../../ui/common/text';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { UserStore } from './store';
import { Geolocation, Position } from '@capacitor/geolocation';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { baseURL, phoneCode } from '../../../../utils/definations/axios/url';
import { CustomerGlobalStore } from '../GlobalStore';
import { addNotification } from '../../../../utils/supportingFns/notifications';

const CreateAccount = () => {
  const history = useHistory();
  const [latlng, setlatlng] = useState<Position | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: (data: any) => {
          console.log('Customer Created:', data);
          localStorage.setItem('customerdata', JSON.stringify(data.data));
          addNotification("You Created Your Account")

          console.log(CustomerGlobalStore.getRawState());
          history.push('/onboardinguser1');
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
        },
        onSettled: () => {
          console.log('Login mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  useEffect(() => {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setlatlng(coordinates);
    };

    printCurrentPosition();
  }, []);

  useEffect(() => {
    const subscription = formMethods.watch(values => {
      const requiredFieldsFilled = fields.every(field => {
        return field.config.required ? values[field.fieldName] : true;
      });
      setIsFormValid(requiredFieldsFilled && Object.keys(errors).length === 0);
    });
    return () => subscription.unsubscribe();
  }, [formMethods, errors]);

  const fields = [
    {
      fieldName: 'firstName',
      inputType: 'text',
      label: 'Firstname',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'lastName',
      inputType: 'text',
      label: 'LastName',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'email',
      inputType: 'text',
      label: 'Email',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'Email is Required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Incorrect Email',
        },
      },
    },
    {
      fieldName: 'city',
      inputType: 'text',
      label: 'City',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'street',
      inputType: 'text',
      label: 'Street',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'suburb',
      inputType: 'text',
      label: 'Suburb',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'zipcode',
      inputType: 'text',
      label: 'Pin Code',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        pattern: {
          value: /^\d{4}$/,
          message: 'Pin Code must be a 4-digit number',
        },
      },
    },
  ];

  const onSubmit = (data: any) => {
    const phoneNumber = UserStore.getRawState().phoneNumber;
    UserStore.update(s => {
      s.firstName = data.firstName;
      s.lastName = data.lastName;
      s.email = data.email;
      s.phoneNumber = `${phoneCode}${phoneNumber}`;
      s.address = {
        ...s.address, // keep existing address fields
        lat: latlng?.coords.latitude || 0,
        long: latlng?.coords.longitude || 0,
        zipcode: data.zipcode,
        street: data.street,
        suburb: data.suburb,
        city: data.city,
      };
    });

    const payload = UserStore.getRawState();
    console.log('payload', payload);
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/signup/customer`,
      data: payload,
    };

    mutate(requestConfig);
  };

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        onSubmit={handleSubmit(onSubmit)}
        BtnText={'Create'}
        disabled={!isFormValid || isSubmitting}
      >
        <div className="h-full flex flex-col items-center justify-between">
          <div className="flex flex-col w-full">
            <TitleDescription
              heading="Create Account"
              description="Enter All Your Personal Details Correctly  "
            />
            <div className="w-full flex flex-col gap-5">
              <DynamicFieldsGenerate fields={fields} errors={errors} />
              {/* {showReferralInput && <InputComponent text="Referral Code" />} */}
            </div>
            {/* {!showReferralInput && (
              <div onClick={toggleReferralInput} className="w-full">
                {' '}
                <Text className="text-tertiary font-[600] cursor-pointer">
                  Do you have a referral code?
                </Text>
              </div>
            )} */}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <Text className="text-secondary">
              Allow Inspectly to send updates on +21674894
            </Text>
          </div>
        </div>
      </BackAndButton>
    </FormProvider>
  );
};

export default CreateAccount;
