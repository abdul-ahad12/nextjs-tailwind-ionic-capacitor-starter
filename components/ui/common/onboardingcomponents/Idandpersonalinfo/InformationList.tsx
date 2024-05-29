import React from 'react';
import Information from './Information';

export interface InformationProps {
  logo?: boolean;
  logourl?: string;
  title: string;
  body: string;
  buttonText: string;
  buttonText2: string;
  buttonColor?: string;
  textcolor?: any;
  key: string;
}

interface InformationListProps {
  data: InformationProps[];
  onTakePhoto: (index: number, key: string) => void;
  photoStatus: { [key: number]: boolean };
}

const InformationList: React.FC<InformationListProps> = ({
  data,
  onTakePhoto,
  photoStatus,
}) => {
  return (
    <div className="flex flex-col gap-7 pb-6">
      {data?.map((info, index) => (
        <Information
          key={index}
          className="flex flex-col gap-5 bg-notifications p-5 rounded-md"
        >
          {info.logo && <img className="w-12" src={info.logourl} />}
          <div className="">
            <Information.text className={`font-medium ${info.textcolor}`}>
              {info.title}
            </Information.text>
            <Information.text typography="body">{info.body}</Information.text>
            {photoStatus && photoStatus[index] && (
              <Information.text className="text-green-500">
                Photo Taken
              </Information.text>
            )}
          </div>
          <div className="flex gap-6 w-[50%]">
            {/* <Information.button className="text-[14px]">
              {info.buttonText}
            </Information.button> */}
            {onTakePhoto && (
              <Information.button
                className="text-[14px] "
                color="primary"
                onClick={() => onTakePhoto(index, info.key)}
              >
                {info.buttonText2}
              </Information.button>
            )}
          </div>
        </Information>
      ))}
    </div>
  );
};

export default InformationList;
