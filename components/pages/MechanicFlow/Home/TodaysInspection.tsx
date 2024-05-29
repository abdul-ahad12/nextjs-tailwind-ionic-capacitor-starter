import React, { useEffect, useState } from 'react';
import Inspection from '../../../ui/common/mechanic/resuable/mechanicinspection/Inspection';
import ImageWithText from '../../../ui/common/mechanic/resuable/ImageWithText';

import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { EmptyArray } from '../../../ui/common/svgs/EmptyArray';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';
import MechanicFlow from '../../../ui/common/Layouts/MechanicFlow';
import { Text } from '../../../ui/common/text';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { baseURL } from '../../../../utils/definations/axios/url';

export enum tabs {
  TODAYSINSPECTION = 'Today Inspections',
  SCHEDULEDINSPECTION = 'Scheduled Inspections',
  INSPECTIONREQUESTS = 'Inspection Requests',
}

const TodaysInspection = () => {
  const [activeState, setActiveState] = useState(tabs.TODAYSINSPECTION);
  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';
  useEffect(() => {
    // Example usage of makeRequest function
    makeRequest(`${baseURL}/booking/mechanic/${mechId}`, 'GET');
  }, []);

  console.log(data);

  console.log(activeState);

  const inspectionData = [
    {
      typography: 'premiumService',
      firstText: 'Basic Service',
      name: 'John',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-13',
      earningText: '100$',
      carModalText: 'Toyota Camry',
      description: '10-5-19/21 Masabtank Hyderabad',
      orderId: '6789',
    },
    {
      typography: 'basicService',
      firstText: 'Basic Service',
      name: 'Jane Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-14',
      earningText: '150$',
      carModalText: 'Honda Civic',
      description: '10-5-19/21 Masabtank Hyderabad',
      orderId: '321',
    },
  ];
  const inspectionData1 = [
    {
      typography: 'basicService',
      firstText: 'First Inspection',
      name: 'John Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-13',
      earningText: '100$',
      carModalText: 'Toyota Camry',
      description: '10-5-19/21 Masabtank Hyderabad',
      orderId: '1234',
    },
    {
      typography: 'premiumService',
      firstText: 'Second Inspection',
      name: 'Jane Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-14',
      earningText: '150$',
      carModalText: 'Honda Civic',
      description: '10-5-19/21 Masabtank Hyderabad',
      orderId: '98654',
    },
  ];

  const inspectionData2 = [
    {
      typography: 'basicService',
      firstText: 'First Inspection',
      name: 'John Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-13',
      earningText: '100$',
      carModalText: 'Toyota Camry',
      description: '10-5-19/21 Masabtank Hyderabad',
      orderId: '1234',
    },
    // {
    //   typography: 'premiumService',
    //   firstText: 'Second Inspection',
    //   name: 'Jane Doe',
    //   imageUrl: '/mechanic/inspection/inspection.png',
    //   dateTime: '2024-05-14',
    //   earningText: '150$',
    //   carModalText: 'Honda Civic',
    //   description: '10-5-19/21 Masabtank Hyderabad',
    //   orderId: '98654',
    // },
  ];

  return (
    <MechanicFlow setActiveState={setActiveState} activeState={activeState}>
      <div className="gap-3 flex flex-col">
        <Text>
          {activeState === tabs.TODAYSINSPECTION
            ? ''
            : activeState === tabs.SCHEDULEDINSPECTION
              ? `Scheduled Inspections(${data?.data.length})`
              : `Inspection Requests(${data?.data.length})`}
        </Text>
        hello
      </div>
    </MechanicFlow>
  );
};

export default TodaysInspection;

const TodayBookings = ({ data }) => {
  // Filter today's bookings
  const todayBookings = data?.filter(booking => {
    const bookingDate = new Date(booking.dateTimeOfBooking);
    const today = new Date();
    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <>
      {todayBookings?.map((booking, index:number) => (
        <Inspection
          dropDown={true}
          key={index}
          firstText={booking.package.name}
          name={booking.owner.name}
          imageUrl={booking.owner.profilePic}
          dateTime={booking.dateTimeOfBooking}
          earningText={booking.package.price}
          carModalText={`${booking.vehicle.make} ${booking.vehicle.model}`}
          description={booking.package.description}
          orderId={booking.id}
        />
      ))}
    </>
  );
};

const LoadingScreen = ({ text }) => {
  return (
    <div className="flex h-full py-[6rem] justify-center items-center">
      <ImageWithText imageUrl={<EmptyArray />} text={text} />
    </div>
  );
};



// {activeState === tabs.TODAYSINSPECTION &&
//   inspectionData.length === 0 ? (
//     <LoadingScreen
//       text={
//         'No Scheduled Inspections. Take a break or stay tuned. More bookings coming soon!'
//       }
//     />
//   ) : (
//     <TodayBookings data={inspectionData} />
//   )}

//   {activeState === tabs.SCHEDULEDINSPECTION &&
//   inspectionData1.length === 0 ? (
//     <LoadingScreen
//       text={
//         'No Scheduled Inspections. Take a break or stay tuned. More bookings coming soon!'
//       }
//     />
//   ) : (
//     inspectionData1.map((inspection, index) => (
//       <Inspection
//         dropDown={true}
//         key={index}
//         typography={inspection.typography}
//         firstText={inspection.firstText}
//         name={inspection.name}
//         imageUrl={inspection.imageUrl}
//         dateTime={inspection.dateTime}
//         earningText={inspection.earningText}
//         carModalText={inspection.carModalText}
//         description={inspection.description}
//         orderId={inspection.orderId}
//       />
//     ))
//   )}

//   {activeState === tabs.INSPECTIONREQUESTS &&
//   inspectionData2.length === 0 ? (
//     <LoadingScreen
//       text={
//         'No Scheduled Inspections. Take a break or stay tuned. More bookings coming soon!'
//       }
//     />
//   ) : (
//     inspectionData2.map((inspection, index) => (
//       <Inspection
//         dropDown={true}
//         typography={inspection.typography}
//         key={index}
//         firstText={inspection.firstText}
//         name={inspection.name}
//         dateTime={inspection.dateTime}
//         earningText={inspection.earningText}
//         carModalText={inspection.carModalText}
//         description={inspection.description}
//         orderId={inspection.orderId}
//         inspectionRequest={true}
//       />
//     ))
//   )}