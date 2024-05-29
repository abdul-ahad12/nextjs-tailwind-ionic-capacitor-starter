import React from 'react';
import { Text } from '../../../text';

const AccountComp = ({
  direction,
  imageUrl,
  name,
  rating,
  items,
  motorspecialist,
}: any) => {
  return (
    <div
      className={`flex ${direction}  px-5 py-5 rounded-primary  items-center gap-3 `}
    >
      <div>
        <img src={imageUrl} alt="profile notifications" className="min-w-12 " />
      </div>
      <div className={`flex  flex-col ${items}  gap-1`}>
        <Text className="text-[#1A202F] font-semibold text-[17px]">{name}</Text>
        <Text className=" text-[15px] text-[#1A202FCC]">{motorspecialist}</Text>
        <Text className=" text-[15px] text-[#1A202FCC]">
          <span className="text-black">&#9733;</span> {rating}
        </Text>
      </div>
    </div>
  );
};

export default AccountComp;
