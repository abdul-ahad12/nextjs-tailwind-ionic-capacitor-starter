import React, { useState } from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import Profile from '../../../../public/notifications/profile.svg';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';
import ImageWithText from '../../../ui/common/mechanic/resuable/ImageWithText';
import { EmptyArray } from '../../../ui/common/svgs/EmptyArray';
import EmptyNotifications from '../../../ui/common/svgs/EmptyNotifications';
import { Button } from '../../../ui/common/button';
import { Filter } from '../../../ui/common/svgs/Filter';
import { Text } from '../../../ui/common/text';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import Modal from '../../../ui/common/modals';
import RadioBtn from '../../../ui/common/radioBtn';

const AllNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Create an array of notification data
  const notificationData = [
    {
      imageUrl: '/notifications/profile.svg',
      text: 'New Account created!',
      name: 'Just now ',
    },
    {
      imageUrl: '/notifications/profile.svg',

      text: 'A reference can only be displayed on your public profile photo if the',
      name: '1 min',
    },
    {
      imageUrl: '/notifications/profile.svg',

      text: 'New Account created!',
      name: 'Last',
    },
  ];

  // Render "empty" if the array is empty
  if (notificationData.length === 0) {
    return (
      <HeightFullLayout>
        <ImageWithText
          imageUrl={<EmptyNotifications />}
          text="At the moment, there are no inspection requests to display."
        />
      </HeightFullLayout>
    );
  }

  

  return (
    <BackAndButton back title="Notifications">
      <div>
        {/* <Button
          onClick={() => setIsOpen(true)}
          className="bg-transparent flex text-black items-center gap-3 font-medium text-[16px] w-fit"
        >
          <Filter />
          Filter by
        </Button> */}
   
        <div className="flex flex-col gap-6">
          <Text typography="body">Today&apos;s</Text>
          {/* Map the notificationDa ta array and render SingleNotifications component */}
          {notificationData?.map((notification, index) => (
            <SingleNotifications
              direction="bg-notifications"
              key={index}
              imageUrl={notification.imageUrl}
              text={notification.text}
              name={notification.name}
            />
          ))}
          <Text typography="body">Yesterday</Text>
          {notificationData?.map((notification, index) => (
            <SingleNotifications
              direction="bg-notifications"
              key={index}
              imageUrl={notification.imageUrl}
              text={notification.text}
              name={notification.name}
            />
          ))}
        </div>
      </div>
    </BackAndButton>
  );
};

export default AllNotifications;
