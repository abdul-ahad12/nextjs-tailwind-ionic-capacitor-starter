import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import Authentication from '../../../ui/common/Authentication';
import { baseURL } from '../../../../utils/definations/axios/url';
import PhoneStore from './store';
import { AxiosError } from 'axios';

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

          // Handle success logic, e.g., store user data, redirect, etc.
        },
        onError: (error: AxiosError) => {
          console.error('Login failed:', error);
          //  handle the case when the user exists send them to signup route. will add error.name = "USER_EXISTS"
          // Handle error logic, e.g., show error message
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
      // url: 'https://dummyjson.com/products/add',

      url: `${baseURL}/auth/login/+61${phoneNumber}`,
    };

    mutate(requestConfig);
  };


  return (
    <>
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
