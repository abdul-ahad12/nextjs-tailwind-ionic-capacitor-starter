import React, { useEffect, useState } from 'react';
import HeightFullLayout from '../../../../ui/common/Layouts/HeightFullLayout';
import { Text } from '../../../../ui/common/text';
import BackAndButton from '../../../../ui/common/Layouts/BackAndButton';
import {
  Notification,
  getNotifications,
} from '../../../../../utils/supportingFns/notifications';
import { ImageWithText, SingleNotifications } from '../../../../ui/common';

const AllNotifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);
  // Create an array of notification data
  const notificationData: Notification[] = [];

  // Render "empty" if the array is empty
  if (notifications.length === 0) {
    return (
      <BackAndButton back title="Notifications">
        <HeightFullLayout>
          <ImageWithText
            imageUrl={'/img/notificationsloading.svg'}
            text="At the moment, there are no inspection requests to display."
          />
        </HeightFullLayout>
      </BackAndButton>
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
          <Text typography="body">Recent</Text>
          {/* Map the notificationData array and render SingleNotifications component */}
          {notifications?.map((notification, index) => (
            <SingleNotifications
              direction="bg-notifications"
              key={index}
              imageUrl={'/notifications/bell.svg'}
              text={notification.message}
              name={notification.timestamp}
            />
          ))}
        </div>
      </div>
    </BackAndButton>
  );
};

export default AllNotifications;
