import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useStoreState } from 'pullstate';

import { IonToast } from '@ionic/react';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import OTPInput from '../../../ui/common/Authentication/OtpInputs';
import PhoneStore from './store';
import { baseURL, phoneCode } from '../../../../utils/definations/axios/url';
import { ErrorResponse } from './Login';

const OTPUser = () => {
  const history = useHistory();
  const phoneNumber = useStoreState(PhoneStore, s => s.phoneNumber);
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Initialize state for 6 digits
  const [disabled, setDisabled] = useState(true); // State to track if all fields are filled
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Otp Verified successful', data);
          history.push('/onboardinguser');
        },
        onError: error => {
          console.error('Otp Verification failed:', error);

          setIsOpen(true);
        },
        onSettled: () => {
          console.log('Login mutation settled');
        },
      },
    );

  const handleResend = () => {
    history.push('/signupuser');
  };

  const handleOtp = async () => {
    // history.push("/onboardinguser")
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/signup/customer/verify`,
      data: {
        phoneNumber: `${phoneCode}${phoneNumber}`,
        otp: otp.join(''), // Join the OTP array to form a string
      },
    };

    mutate(requestConfig);
  };

  return (
    <BackAndButton
      onSubmit={handleOtp}
      href={'/onboardinguser'}
      BtnText={'Verify'}
      disabled={disabled}
    >
      <IonToast
        isOpen={isError}
        message={(error?.response?.data as ErrorResponse)?.message}
        duration={5000}
      ></IonToast>
      <div className="h-full flex flex-col justify-center">
        <TitleDescription
          heading="Enter Code"
          description={`A Code has been sent to: ${phoneNumber}`}
        />
        <div className="py-6">
          <OTPInput
            setDisabled={setDisabled}
            otp={otp}
            setOTP={setOTP}
            handleResend={handleResend}
          />
        </div>
      </div>
    </BackAndButton>
  );
};

export default OTPUser;
