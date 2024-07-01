import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import Authentication from '../../../ui/common/Authentication';
import { baseURL, phoneCode } from '../../../../utils/definations/axios/url';
import PhoneStore from './store';
import { AxiosError } from 'axios';
import { IonToast } from '@ionic/react';

export type ErrorResponse = {
  message: string;
};

const LoginUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: (data: any) => {
          console.log('Login successful', data);
          PhoneStore.update(s => {
            s.phoneNumber = phoneNumber;
          });
          history.push('/otploginuser');

        },
        onError: (error: AxiosError) => {
          console.error('Login failed:', error);
        },
        onSettled: () => {
          console.log('Login mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

  const handleLogin = () => {
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/login/${phoneCode}${phoneNumber}`,
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
        login
        onSubmit={handleLogin}
        isPending={isPending}
        user
      />
    </>
  );
};

export default LoginUser;
