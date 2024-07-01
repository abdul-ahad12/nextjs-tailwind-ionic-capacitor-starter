import { BackAndButton } from '@components/ui';
import { AccountComp, BorderTextNumber, IconTextButton } from '@components/ui/common';
import { Button } from '@components/ui/common/button';
import { RightArrowSvg } from '@components/ui/common/svgs';
import { DocumentSvg } from '@components/ui/common/svgs/DocumentSvg';
import { baseURL } from '@utils/definations/axios/url';
import useDynamicGetRequest from '@utils/supportingFns/getCall';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';


const UserProfile = () => {
  const history = useHistory();

  const { data, error, loading, makeRequest } = useDynamicGetRequest();
  console.log(data);

  const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';
  useEffect(() => {
    // Example usage of makeRequest function
    makeRequest(`${baseURL}/user/mechanic/${mechId}`, 'GET');
  }, []);

  const borderTextNumberData = [
    { text: 'Todays Inspections ', number: 20, borderColor: 'black' },
    { text: 'Todays Earnings', number: 10, borderColor: 'green-500' },
    // Add more objects as needed
  ];

  const iconTextButtonData = [
    {
      icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Account Settings',
      bgcolor: 'bg-white', // Example background color
      href: '/app/accountsetting',
    },
    {
      icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
      text: 'My Documents',
      bgcolor: 'bg-white', // Example background color
      href: '/app/documents',
    },
    {
      icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Support',
      bgcolor: 'bg-white', // Example background color
      href: '/app/support',
    },
    {
      icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Privacy Policy',
      bgcolor: 'bg-white', // Example background color
      href: '#',
    },
    // Add more objects as needed
  ];
  return (
    <BackAndButton back title="Profile">
      {loading && (
        <div>loading..</div>
      )}
      <div className="flex flex-col gap-6">
        <AccountComp
          direction={'bg-notifications'}
          imageUrl={
            data?.data.profilepic
              ? data?.data.profilepic
              : '/notifications/profile.svg'
          }
          name={data?.data?.user.firstName}
          rating={data?.data?.rating}
        />
        <div className="flex justify-betwen gap-4">
          {/* Map the borderTextNumberData array and render BorderTextNumber component */}
          {borderTextNumberData.map((item, index) => (
            <div key={index}>
              <BorderTextNumber
                key={index}
                text={item.text}
                number={item.number}
                borderColor={item.borderColor}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {/* Map the iconTextButtonData array and render IconTextButton component */}
          {iconTextButtonData.map((item, index) => (
            <div
              key={index}
              className="w-full"
              onClick={() => {
                history.push(item.href);
              }}
            >
              <IconTextButton
                key={index}
                svgcomp={<RightArrowSvg />}
                icon={item.icon}
                text={item.text}
                bgcolor={item.bgcolor}
              />
            </div>
          ))}
        </div>
        <div className="w-fit">
          <Button
            onClick={() => {
              history.replace('/landing');
            }}
            className="text-red-500 w-full items-start"
            color="secondary"
          >
            {'('}&#x2192; <span className="ml-3">Log Out</span>
          </Button>
        </div>
      </div>
    </BackAndButton>
  );
};

export default UserProfile;

