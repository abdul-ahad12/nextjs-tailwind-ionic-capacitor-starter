import React, { useState } from 'react';
import { Text } from '../../../text';
import TitleDescription from '../../../TitleDescription';
import { motion } from 'framer-motion';
import { Button } from '../../../button';
import { IonToast } from '@ionic/react';

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
  acceptReport?: boolean;
  onClick?: () => any;
}

const Inspection: React.FC<UserActivityProps> = ({
  firstText,
  name,
  imageUrl,
  dateTime,
  earningText,
  carModalText,
  description,
  orderId,
  viewReport,
  dropDown,
  inspectionRequest,
  acceptReport,
  onClick,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-7 justify-between rounded-lg bg-[#F1F1F199] border-gray-300 pt-5 px-5 ">
        <div className="flex justify-between">
          <div
            className={
              firstText == 'Basic Service'
                ? `px-2 py-1 bg-[#FFE5DD] rounded-[4px]`
                : `px-2 py-1 bg-[#D3EAB7] rounded-[4px]`
            }
          >
            <Text className="text-secondary font-semibold">{firstText}</Text>
          </div>
          <Text>Order ID: {orderId}</Text>
        </div>
        <div className="flex gap-2 items-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-md mr-2"
            />
          )}
          <div>
            <Text typography="cardsheader">{name}</Text>
            <Text>{description}</Text>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <div className="w-fit">
              <Text typography="cardsheader">{dateTime}</Text>
              <Text>Date & Time</Text>
            </div>
            {dropDown && (
              <button onClick={toggleDropdown} className="focus:outline-none">
                <svg
                  className={`w-6 h-6 fill-current text-gray-600 transform transition-transform ${
                    showDropdown ? 'rotate-180' : ''
                  }`}
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.50044 14.0005C8.94628 14.0005 8.39211 13.7755 7.97253 13.3339L2.81086 7.90052C2.58128 7.65885 2.58128 7.25885 2.81086 7.01719C3.04044 6.77552 3.42044 6.77552 3.65003 7.01719L8.81169 12.4505C9.19169 12.8505 9.80919 12.8505 10.1892 12.4505L15.3509 7.01719C15.5804 6.77552 15.9604 6.77552 16.19 7.01719C16.4196 7.25885 16.4196 7.65885 16.19 7.90052L11.0284 13.3339C10.6088 13.7755 10.0546 14.0005 9.50044 14.0005Z"
                    fill="#292D32"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="w-fit">
            {viewReport && (
              <Button color="secondary" className="focus:outline-none">
                View report
              </Button>
            )}
          </div>
          {showDropdown && (
            <motion.div
              initial={false}
              animate={{ height: showDropdown ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className={`overflow-hidden flex flex-col mt-4 gap-4`}
            >
              <div>
                <Text typography="cardsheader">{earningText}</Text>
                <Text>Earnings</Text>
              </div>
              <div>
                <Text typography="cardsheader">{carModalText}</Text>
                <Text>Vehicle Details</Text>
              </div>
            </motion.div>
          )}
        </div>
        <div className="w-fit">
          {viewReport && (
            <Button color="secondary" className="focus:outline-none">
              View report
            </Button>
          )}
        </div>
      </div>
      {acceptReport && (
        <Button
          onClick={onClick}
          color="accept"
          className="flex w-full justify-center items-center"
        >
          <div className="flex gap-2 items-center justify-center">
            Create Report
          </div>
        </Button>
      )}

      {inspectionRequest && (
        <div className="flex gap-3">
          <Button
            id="headerAnchor"
            color="accept"
            className="flex w-full justify-center items-center"
          >
            <div className="flex gap-2 items-center justify-center">
              <img src="/img/tick.svg" />
              Accept
            </div>
          </Button>
          <Button id="footerAnchor" color="reject">
            ✖ Reject
          </Button>
        </div>
      )}
      <IonToast
        className="text-center font-semibold"
        trigger="headerAnchor"
        position="top"
        positionAnchor="header"
        message="Booking has been successfully accepted!"
        duration={2000}
        color={'success'}
      ></IonToast>
      <IonToast
        className="text-center font-semibold"
        trigger="footerAnchor"
        position="top"
        positionAnchor="header"
        message="The booking has been rejected"
        duration={2000}
        color={'warning'}
        animated
      ></IonToast>
    </div>
  );
};

export default Inspection;
