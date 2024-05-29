import React from 'react';
import { Geolocation } from '@capacitor/geolocation';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import TitleDescription from '../../ui/common/TitleDescription';
import { useHistory } from 'react-router';
import {
  addressStore,
  approvalRequestStore,
  mechanicStore,
  userDetailsStore,
} from './store';
import { useDynamicRequest } from '../../../utils/definations/axios/axiosInstance';
import { baseURL } from '../../../utils/definations/axios/url';

const TermsAndCondition = () => {
  const history = useHistory();
  const user = userDetailsStore.useState();
  const address = addressStore.useState();
  const mechanic = mechanicStore.useState();
  const approvalRequest = approvalRequestStore.useState();

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Successful', data);
          // history.push('/waitingscreen');

          // Handle success logic, e.g., store user data, redirect, etc.
        },
        onError: error => {
          console.error('Failed:', error);
          // Handle error logic, e.g., show error message
        },
        onSettled: () => {
          console.log('Mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

  const handleSubmit = () => {
    // history.push('/waitingscreen');
    console.log(user, address, mechanic, approvalRequest);
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/signup/mechanic`,
      // url: `/api/v1/auth/signup/mechanic`,
      data: {
        user: user,
        address: address,
        mechanic: mechanic,
        approvalRequest: approvalRequest,
      },
    };
    mutate(requestConfig);
  };

  const quesAndAns = [
    {
      question: 'Why did Serviceklick create this commitment?',
      answer:
        'This commitment is an important step towards creating a global community where everyone can truly belong. Discrimination prevents partners, clients, and their families from feeling included and welcomed, and we have no tolerance for it. Building a Serviceklick where everyone can belong hinges on knowing that everyone in our community understands.',
    },
    {
      question: 'Why did Serviceklick create this commitment?',
      answer:
        'This commitment is an important step towards creating a global community where everyone can truly belong. Discrimination prevents partners, clients, and their families from feeling included and welcomed, and we have no tolerance for it. Building a Serviceklick where everyone can belong hinges on knowing that everyone in our community understands.',
    },
    {
      question: 'Why did Serviceklick create this commitment?',
      answer:
        'This commitment is an important step towards creating a global community where everyone can truly belong. Discrimination prevents partners, clients, and their families from feeling included and welcomed, and we have no tolerance for it. Building a Serviceklick where everyone can belong hinges on knowing that everyone in our community understands.',
    },
    {
      question: 'Why did Serviceklick create this commitment?',
      answer:
        'This commitment is an important step towards creating a global community where everyone can truly belong. Discrimination prevents partners, clients, and their families from feeling included and welcomed, and we have no tolerance for it. Building a Serviceklick where everyone can belong hinges on knowing that everyone in our community understands.',
    },
  ];

  return (
    <OnBoardingLayout
      onClick={handleSubmit}
      back
      heading={isPending ? 'Loading...' : 'Terms & Conditions'}
      description={''}
      BtnText={'Agree and Continue'}
    >
      {quesAndAns.map((item, index) => (
        <div key={index}>
          <TitleDescription
            className={'text-[17px] mt-5'}
            heading={item.question}
            description={item.answer}
          />
        </div>
      ))}
    </OnBoardingLayout>
  );
};

export default TermsAndCondition;
