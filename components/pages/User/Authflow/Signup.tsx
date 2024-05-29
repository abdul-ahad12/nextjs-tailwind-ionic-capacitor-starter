import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import MyStore from '../../Authflow/store';
import Authentication from '../../../ui/common/Authentication';


const SignupUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Login successful', data);
          MyStore.update(s => {
            s.phoneNumber = phoneNumber;
          });

          history.push('/otp');

          // Handle success logic, e.g., store user data, redirect, etc.
        },
        onError: error => {
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
    history.push("/otpuser")
    // const requestConfig = {
    //   method: 'post',
    //   url: `${baseURL}/auth/signup/mechanic/+91${phoneNumber}`,
    //   // url: `/api/v1/auth/signup/mechanic/${phoneNumber}`,
    // };

    // mutate(requestConfig);
  };

  return (
    <Authentication
      setPhoneNumber={setPhoneNumber}
      phoneNumber={phoneNumber}
      onSubmit={handleLogin}
      isPending={isPending}
      user
    />
  );
};

export default SignupUser;
