import React from 'react';
import OrderSummary from '../../../ui/common/user/OrderSummary';
import { text } from 'stream/consumers';
import BookingAccordion from '../../../ui/common/user/BookingAccordian';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import RadioButtonGroup from '@components/ui/common/user/RadioButtonGroup';

const Payments = () => {
  const history = useHistory();
  const items = [
    { text: 'Premium Package', price: '$123' },
    { text: 'Service Fee', price: '$50' },
    { text: 'Total', price: '$173' },
    // Add more items as needed
  ];

  const bookingDetails = [
    {
      title: 'Booking 1',
      bookingdetails: [
        {
          heading: 'Room Type',
          details: [
            { description: 'Registration Number', price: '$100' },
            { description: 'Model', price: '$80' },
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
    {
      title: 'Booking 2',
      bookingdetails: [
        {
          heading: 'Room Type',
          details: [{ description: 'Double Room', price: '$100' }],
        },
        {
          heading: 'Additional Services',
          details: [
            { description: 'Breakfast', price: '$20' },
            { description: 'Airport Pickup', price: '$50' },
          ],
        },
      ],
    },
    {
      title: 'Booking 3',
      bookingdetails: [
        {
          heading: 'Additional Services',
          details: [{ description: 'Airport Pickup', price: '$50' }],
        },
      ],
    },
  ];

  const options = [
    { id: 1, label: 'Master Card', src: '/payments/master.png' },
    { id: 2, label: 'Visa Card', src: '/payments/visa.png' },
    { id: 3, label: 'Paypal', src: '/payments/paypal.png' },
  ];

  return (
    <BackAndButton
      title="Payment"
      back
      BtnText="Place Booking"
      onSubmit={() => {
        history.replace('/bookingplacedsuccessfully');
      }}
    >
      <div className="p-3">
        <OrderSummary items={items} />
        <div className="flex flex-col gap-5">
          {bookingDetails.map((booking, index) => (
            <BookingAccordion
              key={index}
              title={booking.title}
              bookingdetails={booking.bookingdetails}
              edit={true}
            />
          ))}
        </div>
        <RadioButtonGroup options={options} />
      </div>
    </BackAndButton>
  );
};

export default Payments;

2;
