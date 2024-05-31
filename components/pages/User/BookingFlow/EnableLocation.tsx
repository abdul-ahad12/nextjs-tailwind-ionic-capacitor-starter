import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';
import { Geolocation } from '@capacitor/geolocation';
import ImageCarousel from '../../../ui/common/Authentication/ImageCarousel';

const EnableLocation = () => {
  const history = useHistory();
  const handleSubmit = async() => {
    // await Geolocation.getCurrentPosition();
    history.push('/appuser/selectlocation');
  };
  return (
    <BackAndButton BtnText="Enabled" onSubmit={handleSubmit}>
      <HeightFullLayout>
        <ImageCarousel
          slides={[
            {
              img: '/img/auth/imagecarousel1.svg',
              title: 'Enable precise location',
              description: 'You’ll need to enable your location in order to use this app.',
            },
          ]}
        />
      </HeightFullLayout>
    </BackAndButton>
  );
};

export default EnableLocation;
