import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import MyStore from '../../Authflow/store';
import Authentication from '../../../ui/common/Authentication';
import { baseURL } from '../../../../utils/definations/axios/url';
import PhoneStore from './store';

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
        onError: (error: any) => {
          console.error('Login failed:', error);
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

      url: `${baseURL}/auth/login/+91${phoneNumber}`,
    };

    mutate(requestConfig);
  };

  console.log(isSuccess);

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
