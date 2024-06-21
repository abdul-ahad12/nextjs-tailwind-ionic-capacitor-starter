import React, { useRef, useEffect } from 'react';
import { Text } from '../text';

interface IOTPInput {
  setDisabled: (disabled: boolean) => void;
  otp: string[];
  setOTP: (otp: string[]) => void;
  handleResend: () => any;
}

const OTPInput: React.FC<IOTPInput> = ({
  setDisabled,
  otp = ['', '', '', '', '', ''],
  setOTP,
  handleResend,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (isNaN(Number(value))) return; // Only allow numeric input

    // Ensure only a single character is used
    const newValue = value.slice(0, 1);

    // Update OTP array with the new value at the specified index
    const newOTP = [...otp];
    newOTP[index] = newValue;
    setOTP(newOTP);

    // Move to the next input field automatically
    if (newValue !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    checkCompletion(newOTP);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move to the previous input field when backspace is pressed and current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const checkCompletion = (otpArray: string[]) => {
    const isComplete = otpArray.every(value => value !== '');
    setDisabled(!isComplete);
  };

  useEffect(() => {
    checkCompletion(otp);
  }, [otp]);

  return (
    <div className="flex flex-col gap-4 items-center w-full text-[Silka]">
      <div className="flex justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            className="w-11 h-9 text-3xl mx-1 border rounded-primary text-center border-[#E8E9EA] focus:border-tertiary focus:outline-none"
            type="text"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e)}
            onKeyDown={e => handleKeyDown(index, e)}
            ref={el => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div onClick={handleResend}>
        <Text>Resend Code</Text>
      </div>
    </div>
  );
};

export default OTPInput;
