// actions.ts

import { ImageStore } from '../store';

interface ImageData {
  filepath: string;
  webviewPath: string;
}

type ImageKey = keyof ImageData;

export const updateImage = (key: any, image: any) => {
  ImageStore.update((s: any) => {
    s[key] = image;
  });
};

export const resetImages = () => {
  ImageStore.update(s => {
    s.id_front = null;
    s.id_back = null;
    s.cert_3 = null;
    s.cert_4 = null;
    s.pli = null;
    s.pii = null;
    s.profile_picture = null;
  });
};
