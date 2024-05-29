import React, { useState } from 'react';
import Authentication from '../../ui/common/Authentication';
import { useDynamicRequest } from '../../../utils/definations/axios/axiosInstance';
import { useHistory } from 'react-router';
import MyStore from './store';
import { baseURL } from '../../../utils/definations/axios/url';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: (data: any) => {
          console.log('Login successful', data);
          MyStore.update(s => {
            s.phoneNumber = phoneNumber;
          });
          history.push('/otplogin');

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

      url: `${baseURL}/auth/signup/mechanic/+91${phoneNumber}`,
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
        onSubmit={() => {
          history.push("/otplogin")
        }}
        isPending={isPending}
      />
    </>
  );
};

export default Login;