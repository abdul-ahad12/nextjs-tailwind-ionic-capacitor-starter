import React, { useState } from 'react';
import { Text } from '../../../text';
import TitleDescription from '../../../TitleDescription';
import { motion } from 'framer-motion';
import { Button } from '../../../button';
import { IonRouterLink } from '@ionic/react';

interface UserActivityProps {
  firstText: string;
  name: string;
  description: string;
  imageUrl?: string;
  dateTime: string;
  earningText?: string;
  carModalText?: string;
  orderId?: string;
  viewReport?: boolean;
  dropDown?: boolean;
  typography?: any;
  inspectionRequest?: boolean;
  imageurl2: string;
}

const BasicReport: React.FC<UserActivityProps> = ({
  firstText,
  name,
  imageUrl,
  imageurl2,
  dateTime,
  orderId,
  typography,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-7 justify-between rounded-lg bg-[#F1F1F199] border-gray-300 py-10 px-5 ">
        <div className="flex justify-between">
          <Text typography={typography}>{firstText}</Text>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-5 h-5 rounded-md mr-2"
          />

          <div>
            <Text typography="cardsheader">{name}</Text>
            <Text typography="body">Order ID :{orderId}</Text>
          </div>
        </div>
        {/* second */}
        <div className="flex gap-2 items-center">
          <img
            src={imageurl2}
            alt="Profile"
            className="w-5 h-5 rounded-md mr-2"
          />
          <div>
            <Text typography="cardsheader">{dateTime}</Text>
          </div>
        </div>
        <div className="w-fit border-[1px] px-3 border-black rounded-md">
         <a href='/InspectionReport.pdf' download={"Report"}> <Button color="secondary">View Report</Button></a>
        </div>
      </div>
    </div>
  );
};

export default BasicReport;
