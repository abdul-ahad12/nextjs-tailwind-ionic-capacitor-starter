import React from 'react';
import { Text } from '../../text';
import ActivityLoading from '../../svgs/ActivityLoading';

interface ImageWithTextProps {
  imageUrl?: any;
  text: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, text }) => {
  return (
    <div className="flex flex-col items-center justify-center px-5">
      {/* <img src={imageUrl} alt="Image" className="max-w-full max-h-1/2" />
      <div className="loader ml-[-2rem]"></div> */}
      <img src='/user/activitywaiting.png' className='w-[90%]' />
      {/* <ActivityLoading /> */}
      <Text className="text-[#1A202F] text-[14px] text-center">
        {text}
      </Text>
    </div>
  );
};

export default ImageWithText;
