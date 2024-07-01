import React from 'react';

interface BorderTextNumberProps {
  text: string;
  number: number;
  borderColor?: string;
}

const BorderTextNumber: React.FC<BorderTextNumberProps> = ({
  text,
  number,
  borderColor,
}) => {
  return (
    <div className="border-gray-300 rounded-primary border-[1px] ">
      <div
        className={`border-${borderColor} px-4  rounded-primary py-4 flex flex-col border-l-[7px] w-full h-[120px]`}
      >
        <div className="mr-4 mb-2">{text}</div>
        <div className="text-[25px] font-bold">${number}</div>
      </div>
    </div>
  );
};

export default BorderTextNumber;
