import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import Authentication from '../../../ui/common/Authentication';
import { baseURL } from '../../../../utils/definations/axios/url';
import PhoneStore from './store';
import { UserStore } from '../Onboarding/store';

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
      url: `${baseURL}/auth/signup/customer/${phoneNumber}`,
    };

    mutate(requestConfig);
  };

  return (
    <Authentication
      setPhoneNumber={setPhoneNumber}
      phoneNumber={phoneNumber}
      onSubmit={handleSignupIntiation}
      isPending={isPending}
      user
    />
  );
};

export default SignupUser;
