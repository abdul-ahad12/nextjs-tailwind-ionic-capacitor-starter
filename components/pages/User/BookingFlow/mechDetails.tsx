import React, { useEffect, useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { baseURL } from '../../../../utils/definations/axios/url';
import { IonContent, IonPage } from '@ionic/react';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { AccountComp, SingleNotifications } from '../../../ui/common';

const MechDetails = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const { makeRequest, data, loading, error } = useDynamicGetRequest();
  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;
  const customerId = customerData?.customer.id;
  const [mechanicDetails, setMechanicDetails] = useState<any | null>(null);

  useEffect(() => {
    if (data && data.data.length > 0) {
      const mechanic = data.data.find(
        (booking: any) =>
          booking.ownerId === customerId &&
          booking.mechanic &&
          booking.Order &&
          booking.Order.length > 0 &&
          !booking.Order[0].isFullfilled,
      );
      if (mechanic) {
        setMechanicDetails(mechanic.mechanic);
      }
    }
  }, [data, customerId]);

  const notificationData = [
    {
      imageUrl: '/user/location.png',
      text: 'Inspection Address',
      name: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    {
      imageUrl: '/user/calendar.svg',
      text: 'Slot Selected',
      name: '03:00 PM | 27th May 2024',
    },
    {
      imageUrl: '/user/setting.svg',
      text: 'Package',
      name: 'Premium Service',
    },
    {
      imageUrl: '/user/wallet.svg',
      text: 'Total',
      name: '$123.6',
    },
  ];

  return (
    <IonPage>
      <IonContent>
        <MapComponent selectedPlace={selectedPlace} />
        <Modal
          isOpen={isOpen}
          btnText="Go to Activity"
          title="Mechanic Booked"
          searching
          placed
          onSubmit={() => {
            history.push('/appuser/activity');
            setIsOpen(false);
          }}
        >
          <div className="flex  flex-col w-full justify-center ">
            {/* {mechanicDetails ? ( */}
            <AccountComp
              direction={'flex '}
              imageUrl="/notifications/profile.svg"
              name="Ben Williams"
              rating={'Rating | 200+ services '}
              items={'items-start'}
              motorspecialist={'AC Motor'}
            />
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
            {/* ) : (
              <p>No mechanic found matching the criteria.</p>
            )} */}
          </div>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default MechDetails;
