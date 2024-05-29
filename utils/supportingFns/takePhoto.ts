import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async (): Promise<UserPhoto> => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + '.jpeg';
    const newPhoto = {
      filepath: fileName,
      webviewPath: photo.webPath,
    };

    return newPhoto;
  };

  const updatePhotos = (index: number, newPhoto: UserPhoto) => {
    setPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index] = newPhoto;
      return updatedPhotos;
    });
  };
  const deletePhoto = (filepath: string) => {
    setPhotos(prevPhotos =>
      prevPhotos.filter(photo => photo.filepath !== filepath),
    );
  };

  return {
    photos,
    takePhoto,
    updatePhotos,
    deletePhoto,
  };
}
