import React from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonToolbar,
} from '@ionic/react';
import { Text } from '../../../ui/common/text';
import IconTextButton from '../../../ui/common/mechanic/resuable/IconTextButton';
import { RightArrowSvg } from '../../../ui/common/svgs';
import { DocumentSvg } from '../../../ui/common/svgs/DocumentSvg';
import { Phone } from '../../../ui/common/svgs/Phone';
import { Email } from '../../../ui/common/svgs/Email';
import { Filter } from '../../../ui/common/svgs/Filter';
import ImageWithText from '../../../ui/common/mechanic/resuable/ImageWithText';
import { Button } from '../../../ui/common/button';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
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
