import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import ImageCarousel from '../../Authflow/ImageCarousel';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';
import { useHistory } from 'react-router';

const OnBoardingUser = () => {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/enablelocation');
  };

  return (
    <BackAndButton
      BtnText="Next"
      onSubmit={handleSubmit}
      HeaderRightText={'Skip'}
    >
      <HeightFullLayout>
        <ImageCarousel
          slides={[
            {
              img: '/img/auth/imagecarousel1.svg',
              title: 'Book a Mechanic',
              description:
                'Conveniently schedule reliable, certified mechanics for on-site vehicle repairs and maintenance services.',
            },
            {
              img: '/img/auth/imagecarousel1.svg',
              title: 'Get the vehicle Inspected',
              description:
                'Ensure safety and performance with thorough, professional automotive inspections at your convenience.',
            },
            {
              img: '/img/auth/imagecarousel1.svg',
              title: 'Get the Inspection Report',
              description:
                'Receive a detailed, comprehensive assessment of your vehicle’s condition from expert mechanics.',
            },
          ]}
        />
      </HeightFullLayout>
    </BackAndButton>
  );
};

export default OnBoardingUser;
