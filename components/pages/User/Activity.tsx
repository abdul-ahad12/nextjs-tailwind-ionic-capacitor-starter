import React, { useEffect, useState } from 'react';
import MechanicFlow from '../../ui/common/Layouts/MechanicFlow';
import HeightFullLayout from '../../ui/common/Layouts/HeightFullLayout';
import ImageWithText from '../../ui/common/mechanic/resuable/ImageWithText';
import { EmptyArray } from '../../ui/common/svgs/EmptyArray';
import Inspection from '../../ui/common/mechanic/resuable/mechanicinspection/Inspection';
import { Button } from '../../ui/common/button';
import { useHistory } from 'react-router';
import { baseURL } from '../../../utils/definations/axios/url';
import useDynamicGetRequest from '../../../utils/supportingFns/getCall';
import ActivityLoading from '../../ui/common/svgs/ActivityLoading';
import { InspectionsStore } from './GlobalStore';

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
  const history = useHistory();
  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  useEffect(() => {
    makeRequest(`${baseURL}/booking`, 'GET');
  }, []);

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
      <MechanicFlow
        setActiveState={setActiveState}
        activeState={activeState}
        tabs={tabs}
      >
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
      </MechanicFlow>
    );
  }
  console.log(filteredBookings1);
  return (
    <MechanicFlow
      setActiveState={setActiveState}
      activeState={activeState}
      tabs={tabs}
    >
      <div className="gap-3 flex flex-col">
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

        {activeState === tabs.SCHEDULEDINSPECTION &&
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
          ))}
      </div>
    </MechanicFlow>
  );
};

export default Activity;
