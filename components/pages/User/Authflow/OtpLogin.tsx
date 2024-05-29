import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useStoreState } from 'pullstate';
import MyStore from '../../Authflow/store';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import OTPInput from '../../../ui/common/Authentication/OtpInputs';


const OTPLoginUser = () => {
  const history = useHistory();
  const phoneNumber = useStoreState(MyStore, s => s.phoneNumber);
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Initialize state for 6 digits
  const [disabled, setDisabled] = useState(true); // State to track if all fields are filled

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Login successful', data);
          history.push('/app');

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



  const handleOtp = () => {
    history.push("/appuser/selectlocation")
    // const requestConfig = {
    //   method: 'post',
    //   url: `${baseURL}/auth/signup/mechanic/verify`,
    //   data: {
    //     phoneNumber: `+91${phoneNumber}`,
    //     otp: otp.join(''), // Join the OTP array to form a string
    //   },
    // };

    // mutate(requestConfig);
  };

  const handleResend=()=>{
    history.push("/loginuser")
  }

  return (
    <BackAndButton
      onSubmit={handleOtp}
      href={'/onboarding'}
      BtnText={'Verify'}
      disabled={disabled}
    >
      <div className="h-full flex flex-col justify-center">
        <TitleDescription
          heading="Enter OTP"
          description="An OTP has been sent to: +61 1234567"
        />
        <div className="py-6">
          <OTPInput setDisabled={setDisabled} otp={otp} setOTP={setOTP} handleResend={handleResend} />
        </div>
      </div>
    </BackAndButton>
  );
};

export default OTPLoginUser;
