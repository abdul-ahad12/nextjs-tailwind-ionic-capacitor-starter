import React from 'react';
import Image from 'next/image';
import BookingImg from '../../../../public/user/bookingplaced.png';
import TitleDescription from '../../../ui/common/TitleDescription';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { BookingResponseStore, BookingStore } from './store';
import { CustomerGlobalStore } from '../GlobalStore';
import { baseURL } from '../../../../utils/definations/axios/url';

const BookingPlacedSuccessfully = () => {
  const history = useHistory();


  return (
    <BackAndButton
      BtnText='Find'
      onSubmit={history.push('/lookingformechanic')}
    >
      <HeightFullLayout>
        <div className="flex flex-col  items-center text-center">
          <Image alt="img" src={BookingImg} />
          <TitleDescription
            heading="Booking placed successfully"
            description="Lets look for a mechanic for you!"
          />
        </div>
      </HeightFullLayout>
    </BackAndButton>
  );
};

export default BookingPlacedSuccessfully;
