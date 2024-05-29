import React from 'react';
import BackAndButton from './BackAndButton';
import TitleDescription from '../TitleDescription';

interface IOnBoardingLayout {
  children: React.ReactNode;
  back?: boolean;
  BtnText?: string;
  disabled?: boolean;
  heading: string;
  description: string;
  onClick?: () => any;
}

const OnBoardingLayout: React.FC<IOnBoardingLayout> = ({
  children,
  back,
  BtnText,
  disabled,
  heading,
  description,
  onClick,
}) => {
  return (
    <BackAndButton
      onSubmit={onClick}
      back={back}
      BtnText={BtnText}
      disabled={disabled}
    >
      <TitleDescription heading={heading} description={description} />
      {children}
    </BackAndButton>
  );
};

export default OnBoardingLayout;
