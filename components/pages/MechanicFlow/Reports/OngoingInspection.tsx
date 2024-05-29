import React, { useEffect } from 'react';
import Inspection from '../../../ui/common/mechanic/resuable/mechanicinspection/Inspection';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { baseURL } from '../../../../utils/definations/axios/url';

const OngoingReports = () => {
  const history = useHistory();

  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';
  useEffect(() => {
    // Example usage of makeRequest function
    makeRequest(`${baseURL}/booking/mechanic/${mechId}`, 'GET');
  }, []);

  console.log(data);

  const inspectionData = [
    {
      typography: 'basicService',
      firstText: 'First Inspection',
      name: 'John Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-13',
      earningText: '100$',
      carModalText: 'Toyota Camry',
      description: 'Some description',
      orderId: '1234',
    },
  ];

  const onClick = () => {
    history.push('/createreport');
  };

  return (
    <BackAndButton back title="Ongoing Inspection">
      <div className="flex flex-col gap-5">
        {/* <TodayBookings data={inspectionData} /> */}

        {inspectionData.map((inspection, index) => (
          <Inspection
            dropDown={true}
            key={index}
            typography={inspection.typography}
            firstText={inspection.firstText}
            name={inspection.name}
            imageUrl={inspection.imageUrl}
            dateTime={inspection.dateTime}
            earningText={inspection.earningText}
            carModalText={inspection.carModalText}
            description={inspection.description}
            orderId={inspection.orderId}
            acceptReport
            onClick={onClick}
          />
        ))}
      </div>
    </BackAndButton>
  );
};

export default OngoingReports;

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
      {todayBookings?.map((booking, index: number) => (
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
