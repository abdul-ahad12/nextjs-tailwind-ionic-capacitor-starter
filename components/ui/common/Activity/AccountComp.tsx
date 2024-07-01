import React from 'react';
import { Text } from '../text';

const AccountComp = ({
  direction,
  imageUrl,
  name,
  rating,
  items,
  motorspecialist,
  user,
  modalOpen,
  phoneNumber,
}: any) => {
  return (
    <div
      className={`flex ${direction}  px-5 py-5 rounded-primary  items-center gap-3 relative`}
    >
      <div>
        <img src={imageUrl} alt="profile notifications" className="min-w-12 " />
      </div>
      <div className={`flex  flex-col ${items}  gap-0`}>
        <Text className="text-[#1A202F] font-semibold text-[17px]">{name}</Text>
        <Text className=" text-[15px] text-[#1A202FCC]">{motorspecialist}</Text>
        {user ? (
          <Text>{phoneNumber}</Text>
        ) : (
          <Text className=" text-[15px] text-[#1A202FCC]">
            {rating && <span className="text-black">&#9733;{rating}</span>}
          </Text>
        )}
      </div>
      {modalOpen && (
        <div className="absolute right-4">
          <svg
            className={`w-6 h-6 fill-current text-gray-600 transform transition-transform -rotate-90`}
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
        </div>
      )}
    </div>
  );
};

export default AccountComp;
