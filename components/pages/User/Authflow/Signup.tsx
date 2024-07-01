import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import Authentication from '../../../ui/common/Authentication';
import { baseURL, phoneCode } from '../../../../utils/definations/axios/url';
import PhoneStore from './store';
import { UserStore } from '../Onboarding/store';
import { IonToast } from '@ionic/react';
import { ErrorResponse } from './Login';

const SignupUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Signup Flow Initialized', data);
          PhoneStore.update(s => {
            s.phoneNumber = phoneNumber;
          });
          UserStore.update(s => {
            s.phoneNumber = phoneNumber;
          });
          history.push('/otpuser');
        },
        onError: error => {
          console.error('Login failed:', error);
        },
        onSettled: () => {
          console.log('Login mutation settled');
        },
      },
    );

  const handleSignupIntiation = () => {
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/signup/customer/${phoneCode}${phoneNumber}`,
    };

    mutate(requestConfig);
  };

  return (
    <>
      <IonToast
        isOpen={isError}
        message={(error?.response?.data as ErrorResponse)?.message}
        duration={5000}
      ></IonToast>
      <Authentication
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        onSubmit={handleSignupIntiation}
        isPending={isPending}
        user
      />
    </>
  );
};

export default SignupUser;
