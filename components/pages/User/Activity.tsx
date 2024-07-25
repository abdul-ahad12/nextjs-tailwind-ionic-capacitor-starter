import React, { useEffect, useState } from 'react';
import CustomerActivityHeader from '../../ui/common/Layouts/CustomerActivityHeader';
import HeightFullLayout from '../../ui/common/Layouts/HeightFullLayout';
import { Button } from '../../ui/common/button';
import { useHistory } from 'react-router';
import { baseURL } from '../../../utils/definations/axios/url';
import useDynamicGetRequest from '../../../utils/supportingFns/getCall';
import ActivityLoading from '../../ui/common/svgs/ActivityLoading';
import { InspectionsStore } from './GlobalStore';
import { ImageWithText, Inspection } from '@components/ui/common';

export enum tabs {
  TODAYSINSPECTION = 'Ongoing Inspections',
  SCHEDULEDINSPECTION = 'History',
  INSPECTIONREQUESTS = 'Refund',
}

interface InspectionDataItem {
  typography: string;
  firstText: string;
  name: string;
  imageUrl: string;
  dateTime: string;
  earningText: string;
  carModalText: string;
  description: string;
  orderId: string;
}

const Activity = () => {
  const [activeState, setActiveState] = useState(tabs.TODAYSINSPECTION);
  const [activeTab, setActiveTab] = useState<string>('vehicle');
  const [refresh, setrefresh] = useState(false);

  const history = useHistory();
  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  console.log(data);

  useEffect(() => {
    makeRequest(`${baseURL}/booking`, 'GET');
  }, [refresh]);

  let filteredBookings: any[] = [];
  let filteredBookings1: any[] = [];

  if (data && data.success && data.data) {
    filteredBookings = data.data.filter(
      (booking: any) =>
        booking.mechanicId &&
        !booking.Order[0].isFullfilled &&
        booking.ownerId === customerData?.customer.id,
    );
    InspectionsStore.update(s => {
      s.bookings = filteredBookings1;
    });
  }

  if (data && data.success && data.data) {
    filteredBookings1 = data.data.filter(
      (booking: any) =>
        booking.mechanicId &&
        booking.Order[0].isFullfilled &&
        booking.ownerId === customerData?.customer.id,
    );

    InspectionsStore.update(s => {
      s.bookings = filteredBookings1;
    });
  }

  if (
    (activeState === tabs.TODAYSINSPECTION && filteredBookings.length === 0) ||
    activeState === tabs.INSPECTIONREQUESTS ||
    (activeState === tabs.SCHEDULEDINSPECTION && filteredBookings1.length === 0)
  ) {
    return (
      <CustomerActivityHeader
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setActiveState={setActiveState}
        activeState={activeState}
        tabs={tabs}
        refresh
        onRefresh={() => {
          console.log('in here');
          setrefresh(!refresh);
        }}
      >
        {activeTab === 'vehicle' ? (
          <HeightFullLayout>
            <ImageWithText
              imageUrl={<ActivityLoading />}
              text="Nothing for you now! Come Back Later"
            />
            <Button
              className="mt-12"
              onClick={() => {
                history.replace('/appuser/selectlocation');
              }}
            >
              Book Now
            </Button>
          </HeightFullLayout>
        ) : (
          <div>
            <Inspection
              showDetails={true}
              firstText={'Basic Service'} // Assuming package name is used for firstText
              name={'Real Estate Agent'} // Assuming owner's phone number is used for name
              imageUrl={'/mechanic/inspection/inspection.png'} // Assuming mechanic's profile picture is used for imageUrl
              dateTime={'12th may'}
              earningText={'$140'}
              carModalText={'Land'} // Assuming carType is used for carModalText
              description={'address'} // Assuming street address is used for description
              orderId={''}
              realEstate
            />
          </div>
        )}
      </CustomerActivityHeader>
    );
  }
  console.log(filteredBookings1);
  return (
    <CustomerActivityHeader
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      setActiveState={setActiveState}
      activeState={activeState}
      tabs={tabs}
      refresh
      onRefresh={() => {
        console.log('in here');
        setrefresh(!refresh);
      }}
    >
      <div className="gap-3 flex flex-col relative">
        {activeState === tabs.TODAYSINSPECTION &&
          filteredBookings.map((booking: any, index: number) => (
            <Inspection
              showDetails={true}
              key={index}
              firstText={'Basic Service'} // Assuming package name is used for firstText
              name={'Mechanic'} // Assuming owner's phone number is used for name
              imageUrl={'/mechanic/inspection/inspection.png'} // Assuming mechanic's profile picture is used for imageUrl
              dateTime={booking?.dateTimeOfBooking}
              earningText={'$140'}
              carModalText={booking?.vehicle.carType} // Assuming carType is used for carModalText
              description={'address'} // Assuming street address is used for description
              orderId={booking?.id}
            />
          ))}

        {activeState === tabs.SCHEDULEDINSPECTION && activeTab === 'vehicle' ? (
          filteredBookings1.map((booking, index) => (
            <Inspection
              showDetails={true}
              key={index}
              firstText={'Basic Service'} // Assuming package name is used for firstText
              name={'Mechanic'} // Assuming owner's phone number is used for name
              imageUrl={'/mechanic/inspection/inspection.png'} // Assuming mechanic's profile picture is used for imageUrl
              dateTime={booking?.dateTimeOfBooking}
              earningText={'$140'}
              carModalText={booking?.vehicle.carType} // Assuming carType is used for carModalText
              description={'address'} // Assuming street address is used for description
              orderId={booking?.id}
            />
          ))
        ) : (
          <div>
            {' '}
            <Inspection
              showDetails={true}
              firstText={'Basic Service'} // Assuming package name is used for firstText
              name={'Real Estate Agent'} // Assuming owner's phone number is used for name
              imageUrl={'/realestate/forsale.jpg'} // Assuming mechanic's profile picture is used for imageUrl
              dateTime={'12th may'}
              earningText={'$140'}
              carModalText={'Land'} // Assuming carType is used for carModalText
              description={'address'} // Assuming street address is used for description
              orderId={''}
              realEstate
            />
          </div>
        )}
      </div>
    </CustomerActivityHeader>
  );
};

export default Activity;
