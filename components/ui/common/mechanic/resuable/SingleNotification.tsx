import React from 'react';
import { Text } from '../../text';

interface SingleNotificationsProps {
  imageUrl: any;
  text: string;
  name: string;
  direction?: string;
}

const SingleNotifications: React.FC<SingleNotificationsProps> = ({
  imageUrl,
  text,
  name,
  direction,
}) => {
  return (
    <div
      className={`flex ${direction}  p-3 rounded-primary  items-center gap-3 `}
    >
      {/* <img src={imageUrl} alt="Image" className="max-w-full max-h-1/2" /> */}
      <div>
        <img
          src={imageUrl}
          alt="profile notifications"
          className="w-8"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <Text className="text-[#1A202F] font-medium text-[16px] ">{text}</Text>
        <Text className="text-[#767982] text-small ">{name}</Text>
      </div>
    </div>
  );
};

export default SingleNotifications;
