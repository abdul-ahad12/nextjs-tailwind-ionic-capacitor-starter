import React, { useEffect, useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import OrderSummary from '../../../ui/common/user/OrderSummary';
import BookingAccordion from '../../../ui/common/user/BookingAccordian';
import { useHistory, useLocation } from 'react-router';
import { InspectionsStore } from '../GlobalStore';
import { Inspection } from '../../../ui/common';

const SingleBookingDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Get the bookings from the store
    const bookings = InspectionsStore.getRawState().bookings;

    // Find the booking with the matching orderId
    const foundBooking = bookings.find((b: any) => b.id === orderId);
    setBooking(foundBooking);
  }, [orderId]);

  const dateTimeOfBooking = new Date(booking?.dateTimeOfBooking);
  const readableFormat = dateTimeOfBooking.toLocaleString(); // Adjust the format as per your requirement
  console.log(readableFormat); // This will log the date/time in a human-readable format
  const [date, time] = readableFormat.split(',').map(part => part.trim());

  const items = [
    { text: 'Premium Package', price: '$123' },
    { text: 'Service Fee', price: '$50' },
    { text: 'Total', price: '$173' },
    // Add more items as needed
  ];

  const bookingDetails = [
    {
      title: 'Booking Details',
      bookingdetails: [
        {
          heading: 'Vehicle Information',
          details: [
            {
              description: 'Registration Number',
              price: booking?.vehicle.regNumber,
            },
            { description: 'Make', price: booking?.vehicle.make },
            { description: 'Model', price: booking?.vehicle.model },
          ],
        },

        {
          heading: 'Slot',
          details: [
            { description: 'Date', price: date },
            { description: 'Time', price: time },
          ],
        },
        {
          heading: 'Additional Services',
          details: [
            { description: 'Make', price: '$20' },
            { description: 'Makes', price: '$50' },
          ],
        },
      ],
    },
  ];

  return (
    <BackAndButton
      back
      title="Service Details"
      BtnText="View Report"
      disabled={!booking?.Order[0].isFullfilled}
      onSubmit={() => {
        history.push(`/singlereport?orderId=${orderId}`);
      }}
    >
      <Inspection
        firstText={'Basic Service'}
        name={'Mechanic'}
        imageUrl={'/mechanic/inspection/inspection.png'}
        dateTime={booking?.dateTimeOfBooking}
        earningText={'$140'}
        carModalText={booking?.vehicle?.carType}
        description={booking?.address}
        orderId={booking?.id}
      />
      <OrderSummary items={items} />
      <div className="flex flex-col gap-5">
        {bookingDetails.map((booking, index) => (
          <BookingAccordion
            key={index}
            title={booking.title}
            bookingdetails={booking.bookingdetails}
          />
        ))}
      </div>
    </BackAndButton>
  );
};

export default SingleBookingDetails;
