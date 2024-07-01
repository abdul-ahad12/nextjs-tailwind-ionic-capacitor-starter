import { IonContent, IonHeader, IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import AccountSvg from '../../../ui/common/svgs/AccountSvg';
import SupportSvg from '../../../ui/common/svgs/SupportSvg';
import PrivacyAndPolicy from '../../../ui/common/svgs/PrivacyAndPolicy';
import { Text } from '../../../ui/common/text';
import { AccountComp, IconTextButton } from '../../../ui/common';
import { RightArrowSvg } from '../../../ui/common/svgs';
import { Button } from '../../../ui/common/button';


const ProfileUser = () => {
  const history = useHistory();

  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const iconTextButtonData = [
    {
      icon: <AccountSvg />, 
      text: 'Account Settings',
      bgcolor: 'bg-white', 
      href: '/appuser/accountsetting',
    },
    {
      icon: <SupportSvg />, 
      text: 'Support',
      bgcolor: 'bg-white', 
      href: '/appuser/support',
    },
    {
      icon: <PrivacyAndPolicy />, 
      text: 'Privacy Policy',
      bgcolor: 'bg-white', 
      href: '#',
    },
    // Add more objects as needed
  ];
  return (
    // <BackAndButton back title="Profile">
    <IonPage>
      <IonHeader className="shadow-none">
        <div className="h-[12rem] bg-[#f4f4f5] flex items-center px-[5%] justify-between">
          <Text className="text-black font-semibold text-[1.5rem]">
            Hello, {customerData?.firstName}
          </Text>
          <img className="w-[9rem] mt-4" src="/user/userProfile.svg" />
        </div>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-6">
          <AccountComp
            direction={'border border-[#D9D9D9] rounded-lg'}
            imageUrl="/notifications/profile.svg"
            name={`${customerData?.firstName} ${customerData?.firstName}`}
            rating={'Rating'}
            user
            phoneNumber={customerData?.customer.phoneNumber}
          />

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
                localStorage.clear();
                history.replace('/landing');
              }}
              className="text-red-500 w-full items-start"
              color="secondary"
            >
              {'('}&#x2192; <span className="ml-3">Log Out</span>
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileUser;
