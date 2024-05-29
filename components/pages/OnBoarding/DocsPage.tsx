import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { useHistory } from 'react-router';
import InformationList, {
  InformationProps,
} from '../../ui/common/onboardingcomponents/Idandpersonalinfo/InformationList';
import {
  usePhotoGallery,
  UserPhoto,
} from '../../../utils/supportingFns/takePhoto';
import axios from 'axios';
import { updateImage } from './storeActions/UploadPhotos';
import { ImageStore } from './store';

const DocsPage = () => {
  const history = useHistory();
  const { photos, takePhoto, updatePhotos } = usePhotoGallery();
  const [photoStatus, setPhotoStatus] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [namedPhotos, setNamedPhotos] = useState<{ [key: string]: UserPhoto }>(
    {},
  );

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

  const handleSubmit = () => {
    console.log(ImageStore);
    history.push('/profilephoto');
  };

  const uploadPhotos = (photos: { [key: string]: UserPhoto }) => {
    console.log('Uploading photos to S3:', photos);
    Object.keys(photos).forEach(async key => {
      const photo = photos[key];
      const formData = new FormData();
      formData.append('file', photo.webviewPath as string);
      formData.append('filename', photo.filepath);

      try {
        await axios.post('YOUR_S3_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(`Uploaded ${key}`);
      } catch (error) {
        console.error(`Error uploading ${key}:`, error);
      }
    });
  };

  const data: InformationProps[] = [
    {
      logo: true,
      logourl: '/mechanic/inspection/docs1.svg',
      title: 'Australian ID Proof(Front)',
      body: 'Add Your Australian ID Proof',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'blue',
      textcolor: 'black',
      key: 'id_front',
    },
    {
      logo: true,
      logourl: '/mechanic/inspection/docs2.svg',
      title: 'Australian ID Proof(Back)',
      body: 'Add Your Australian ID Proof',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'blue',
      textcolor: 'black',
      key: 'id_back',
    },
    {
      logo: true,
      logourl: '/mechanic/inspection/docs3.svg',
      title: 'Certificate III in Light Vehicle',
      body: 'Add Your Certificate III in Light Vehicle',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'green',
      textcolor: 'black',
      key: 'cert_3',
    },
    {
      logo: true,
      logourl: '/mechanic/inspection/docs4.svg',
      title: 'Certificate IV in Light Vehicle',
      body: 'Add Your Certificate IV in Light Vehicle',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'green',
      textcolor: 'black',
      key: 'cert_4',
    },
    {
      logo: true,
      logourl: '/mechanic/inspection/docs1.svg',
      title: 'Public Liability Insurance',
      body: 'Add Your PLI',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'green',
      textcolor: 'black',
      key: 'pli',
    },
    {
      logo: true,
      logourl: '/mechanic/inspection/docs2.svg',
      title: 'Professional Indemnity Insurance',
      body: 'Add Your PII',
      buttonText: 'Add',
      buttonText2: 'Take Photo',
      buttonColor: 'green',
      textcolor: 'black',
      key: 'pii',
    },
  ];

  return (
    <OnBoardingLayout
      back
      heading={'Let’s Add Your ID & Personal Info'}
      description={
        'This process ensures your identity. Verification of identity is a key security measure on Inspectly. You can update these later too'
      }
      BtnText={'Continue'}
      onClick={handleSubmit}
    >
      <InformationList
        data={data}
        onTakePhoto={handleTakePhoto}
        photoStatus={photoStatus}
      />
    </OnBoardingLayout>
  );
};

export default DocsPage;
