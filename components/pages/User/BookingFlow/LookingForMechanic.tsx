import React, { useState } from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import { IonContent, IonPage } from '@ionic/react';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { useHistory } from 'react-router';
import { BookingStore, LocationStore } from './store';

const LookingForMechanic = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  // Ensure that BookingStore and LocationStore are correctly implemented and imported.

  const notificationData = [
    {
      imageUrl: '/user/location.png',
      text: 'Inspection Address',
      name: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    {
      imageUrl: '/user/location.png',
      text: 'Slot Selected',
      name: '03:00 PM | 27th May 2024',
    },
    {
      imageUrl: '/user/location.png',
      text: 'Package',
      name: 'Premium Service',
    },
    {
      imageUrl: '/user/location.png',
      text: 'Total',
      name: '$123.6',
    },
  ];

  return (
    <IonPage>
      <IonContent>
        {/* Render the map component */}
        <MapComponent
          selectedPlace={
            LocationStore.getRawState().selectedLocation || selectedPlace
          }
        />

        {/* Render the modal */}
        <Modal
          isOpen={isOpen}
          btnText="Go Home"
          title="Looking for your Mechanic"
          searching
          onSubmit={() => {
            setIsOpen(false);
            history.push('/appuser/selectlocation');
          }}
        >
          <div>
            {/* Map through notificationData to render SingleNotifications */}
            {notificationData.map((notification, index) => (
              <div key={index} className="border-t py-1">
                <SingleNotifications
                  direction="font-medium"
                  imageUrl={notification.imageUrl}
                  text={notification.text}
                  name={notification.name}
                />
              </div>
            ))}
          </div>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default LookingForMechanic;
