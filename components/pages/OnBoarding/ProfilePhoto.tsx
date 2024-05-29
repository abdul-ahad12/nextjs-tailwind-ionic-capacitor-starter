import React, { useState } from 'react';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { AddImageSvg } from '../../ui/common/svgs';
import { useHistory } from 'react-router';
import {
  UserPhoto,
  usePhotoGallery,
} from '../../../utils/supportingFns/takePhoto';
import { updateImage } from './storeActions/UploadPhotos';
import { ImageStore } from './store';
import { useDynamicRequest } from '../../../utils/definations/axios/axiosInstance';
import { baseURL } from '../../../utils/definations/axios/url';

const ProfilePhoto = () => {
  const { takePhoto, photos, updatePhotos, deletePhoto } = usePhotoGallery();
  const history = useHistory();
  const [selectedPhoto, setSelectedPhoto] = useState<UserPhoto | null>(null);

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: data => {
          console.log('Successful', data);
          // Handle success logic, e.g., store user data, redirect, etc.
        },
        onError: error => {
          console.error('Upload failed:', error);
          // history.push("/abn")
          // Handle error logic, e.g., show error message
        },
        onSettled: () => {
          console.log('Upload mutation settled');
        },
      },
    );

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   const imageStore = ImageStore.getRawState();

  //   for (const key in imageStore) {
  //     const photo = imageStore[key];
  //     if (photo) {
  //       const { filepath, webviewPath } = photo;
  //       try {
  //         const response = await fetch(webviewPath);
  //         const blob = await response.blob();
  //         const file = new File([blob], filepath, {
  //           type: blob.type,
  //         });
  //         formData.append(key, file);
  //       } catch (error) {
  //         console.error(`Error processing file for ${key}:`, error);
  //       }
  //     }
  //   }

  //   // Log FormData entries
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }

  //   const requestConfig = {
  //     method: 'put',
  //     url: `${baseURL}/file-upload/mech`,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     data: formData,
  //   };
  //   mutate(requestConfig);
  // };

  const handlePhoto = async () => {
    const newPhoto = await takePhoto();
    setSelectedPhoto(newPhoto);
    updateImage('profile_picture', newPhoto);
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    if (selectedPhoto) {
      deletePhoto(selectedPhoto.filepath);
    }
  };

  return (
    <OnBoardingLayout
      back
      onClick={() => {
        history.push('/abn');
      }}
      BtnText={'Next'}
      heading={'Add a Profile Photo'}
      description={
        'Upload or select a profile photo to personalize your account'
      }
      disabled={selectedPhoto ? false : true}
    >
      <div className="relative flex justify-center h-96 items-center">
        {selectedPhoto ? (
          <>
            <img
              src={selectedPhoto.webviewPath}
              alt="Selected"
              className="rounded-lg"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
            >
              X
            </button>
          </>
        ) : (
          <div onClick={handlePhoto}>
            <AddImageSvg />
          </div>
        )}
      </div>

      <div></div>
    </OnBoardingLayout>
  );
};

export default ProfilePhoto;
