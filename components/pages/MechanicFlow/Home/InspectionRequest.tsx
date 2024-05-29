import React from 'react';
import Inspection from '../../../ui/common/mechanic/resuable/mechanicinspection/Inspection';
import ImageWithText from '../../../ui/common/mechanic/resuable/ImageWithText';
import { AddImageSvg } from '../../../ui/common/svgs';
import Image from 'next/image';
import INS from '../../../../public/mechanic/inspection/inspection.png';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { EmptyArray } from '../../../ui/common/svgs/EmptyArray';
import HeightFullLayout from '../../../ui/common/Layouts/HeightFullLayout';

const InspectionRequest = () => {
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
    {
      typography: 'premiumService',
      firstText: 'Second Inspection',
      name: 'Jane Doe',
      imageUrl: '/mechanic/inspection/inspection.png',
      dateTime: '2024-05-14',
      earningText: '150$',
      carModalText: 'Honda Civic',
      description: 'Another description',
      orderId: '98654',
    },
  ];

  if (inspectionData.length === 0) {
    return (
      <HeightFullLayout>
        <ImageWithText
          imageUrl={<EmptyArray />}
          text="At the moment, there are no inspection requests to display."
        />
      </HeightFullLayout>
    );
  }
  return (
    <IonPage>
      <IonHeader className="ion-padding" collapse="fade">
        <IonToolbar>inspection request</IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-6">
          {inspectionData.map((inspection, index) => (
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
              inspectionRequest={true}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InspectionRequest;
