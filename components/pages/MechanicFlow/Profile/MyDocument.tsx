import React, { useState } from 'react';
import InformationList from '../../../ui/common/onboardingcomponents/Idandpersonalinfo/InformationList';
import { Text } from '../../../ui/common/text';
import IconTextButton from '../../../ui/common/mechanic/resuable/IconTextButton';
import { Complete } from '../../../ui/common/svgs/Complete';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { UserPhoto, usePhotoGallery } from '../../../../utils/supportingFns/takePhoto';
import { updateImage } from '../../OnBoarding/storeActions/UploadPhotos';

const MyDocument = () => {
  const { photos, takePhoto, updatePhotos } = usePhotoGallery();
  const [photoStatus, setPhotoStatus] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [namedPhotos, setNamedPhotos] = useState<{ [key: string]: UserPhoto }>(
    {},
  );

  const informationData = [
    {
      key: '1',
      title: 'Pending',
      body: 'Certificate III in Automotive (optional)',
      textcolor: 'text-[#D8B21E] text-[14px]',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
    },
    {
      key: '2',
      title: 'Pending',
      textcolor: 'text-[#D8B21E] text-[14px]',
      body: 'Certificate IV in Automotive (optional)',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
    },
    {
      key: '3',
      title: 'Pending',
      textcolor: 'text-[#D8B21E] text-[14px]',
      body: 'Public Liability Insurance',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
    },
  ];

  const iconTextButtonData = [
    {
      text: 'Australian ID Proof Front',
      labeltext: 'Completed',
      // Example background color
    },
    {
      text: 'Australian ID Proof Back',
      labeltext: 'Completed',
    },

    // Add more objects as needed
  ];

  const handleTakePhoto = async (index: number, key: any) => {
    const newPhoto = await takePhoto();
    setPhotoStatus(prevStatus => ({ ...prevStatus, [index]: true }));
    setNamedPhotos(prevNamedPhotos => ({
      ...prevNamedPhotos,
      [key]: newPhoto,
    }));
    updatePhotos(index, newPhoto);
    updateImage(key, newPhoto);
  };

  return (
    <BackAndButton back title="My Documents" BtnText="Submit">
      <div className="flex flex-col gap-5 ">
        <Text typography="cardsheader" className="mb-3">
          Please{' '}
          <a href="#" className="text-[#276EF1]">
            Contact Support
          </a>{' '}
          for assistance with editing or updating your documents.
        </Text>
        <div className="flex flex-col gap-4">
          {iconTextButtonData.map((item, index) => (
            <IconTextButton
              key={index}
              text={item.text}
              labeltext={item.labeltext}
              bgcolor={'bg-[#F1F1F199]'}
              svgcomp={<Complete />}
              onButtonClick={() => {
                console.log('hello');
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <InformationList
            data={informationData}
            onTakePhoto={handleTakePhoto}
            photoStatus={photoStatus}
          />
        </div>
      </div>
    </BackAndButton>
  );
};

export default MyDocument;
