import React from 'react';
import {
  IonRouterLink,
} from '@ionic/react';
import { Text } from '../../../../ui/common/text';
import { Phone } from '../../../../ui/common/svgs/Phone';
import { Email } from '../../../../ui/common/svgs/Email';
import BackAndButton from '../../../../ui/common/Layouts/BackAndButton';
import { IconTextButton } from '@components/ui/common';
const Support = () => {
  const iconTextButtonData = [
    {
      text: '+61 12345678',
      bgcolor: 'bg-[#F1F1F199]', // Example background color
    },
    {
      text: '+61 385920471',
      bgcolor: 'bg-[#F1F1F199]', // Example background color
    },

    // Add more objects as needed
  ];
  return (
    <BackAndButton back title="Support">
      <div className="flex flex-col gap-6">
        <Text className="font-semibold" typography="cardsheader">
          Need help with your inspections or documents?
        </Text>
        {iconTextButtonData.map((item, index) => (
          <IonRouterLink key={index} href={`tel:${item.text}`}>
            {' '}
            <IconTextButton
              key={index}
              svgcomp={<Phone />}
              text={item.text}
              bgcolor={item.bgcolor}
              onButtonClick={() => {
                console.log('hello');
              }}
            />
          </IonRouterLink>
        ))}
        <Text className="font-semibold" typography="cardsheader">
          Have any other queries? Email us.
        </Text>
        <IonRouterLink href="mailto:help@inspectly.com">
          {' '}
          <IconTextButton
            svgcomp={<Email />}
            text={'help@inspectly.com'}
            bgcolor={'bg-[#F1F1F199]'}
            onButtonClick={() => {
              console.log('hello');
            }}
          />
        </IonRouterLink>
        {/* Map the notificationDa ta array and render SingleNotifications component */}
      </div>
    </BackAndButton>
  );
};

export default Support;
