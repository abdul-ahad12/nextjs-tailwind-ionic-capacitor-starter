import React, { useState } from 'react';
import MechanicFlow from '../../ui/common/Layouts/MechanicFlow';
import HeightFullLayout from '../../ui/common/Layouts/HeightFullLayout';
import ImageWithText from '../../ui/common/mechanic/resuable/ImageWithText';
import { EmptyArray } from '../../ui/common/svgs/EmptyArray';
import Inspection from '../../ui/common/mechanic/resuable/mechanicinspection/Inspection';
import { Button } from '../../ui/common/button';
import { useHistory } from 'react-router';

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
  const inspectionData1: InspectionDataItem[] = [
    // {
    //   typography: 'basicService',
    //   firstText: 'Basic Inspection',
    //   name: 'John Doe',
    //   imageUrl: '/mechanic/inspection/inspection.png',
    //   dateTime: '2024-05-13',
    //   earningText: '100$',
    //   carModalText: 'Toyota Camry',
    //   description: '10-5-19/21 Masabtank Hyderabad',
    //   orderId: '1234',
    // },
    // {
    //   typography: 'premiumService',
    //   firstText: 'Basi Inspection',
    //   name: 'Jane Doe',
    //   imageUrl: '/mechanic/inspection/inspection.png',
    //   dateTime: '2024-05-14',
    //   earningText: '150$',
    //   carModalText: 'Honda Civic',
    //   description: '10-5-19/21 Masabtank Hyderabad',
    //   orderId: '98654',
    // },
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

  if (
    activeState === tabs.SCHEDULEDINSPECTION &&
    inspectionData1.length === 0
  ) {
    return (
      <MechanicFlow
        setActiveState={setActiveState}
        activeState={activeState}
        tabs={tabs}
      >
        <HeightFullLayout>
          <ImageWithText
            imageUrl={<EmptyArray />}
            text="No Scheduled Inspections. Take a break or stay tuned. More bookings coming soon!"
          />
          <Button
          className='mt-12'
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
  return (
    <MechanicFlow
      setActiveState={setActiveState}
      activeState={activeState}
      tabs={tabs}
    >
      <div className="gap-3 flex flex-col">
        {activeState === tabs.TODAYSINSPECTION &&
          inspectionData.map((inspection, index) => (
            <Inspection
              dropDown={true}
              key={index}
              firstText={inspection.firstText}
              name={inspection.name}
              imageUrl={inspection.imageUrl}
              dateTime={inspection.dateTime}
              earningText={inspection.earningText}
              carModalText={inspection.carModalText}
              description={inspection.description}
              orderId={inspection.orderId}
            />
          ))}
        {activeState === tabs.SCHEDULEDINSPECTION &&
          inspectionData1.map((inspection, index) => (
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
            />
          ))}

        {activeState === tabs.INSPECTIONREQUESTS &&
          inspectionData2.map((inspection, index) => (
            <Inspection
              dropDown={true}
              typography={inspection.typography}
              key={index}
              firstText={inspection.firstText}
              name={inspection.name}
              dateTime={inspection.dateTime}
              earningText={inspection.earningText}
              carModalText={inspection.carModalText}
              description={inspection.description}
              orderId={inspection.orderId}
            //   inspectionRequest={true}
            />
          ))}
      </div>
    </MechanicFlow>
  );
};

export default Activity;
