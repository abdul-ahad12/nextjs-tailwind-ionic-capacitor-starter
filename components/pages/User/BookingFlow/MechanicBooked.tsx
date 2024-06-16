import React, { useEffect, useState } from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import { IonContent, IonPage } from '@ionic/react';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { BookingResponseStore } from './store';
import { baseURL, socketURL } from '../../../../utils/definations/axios/url';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { io } from 'socket.io-client';
import { CustomerGlobalStore } from '../GlobalStore';

const MechanicBooked = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const { makeRequest, data, loading, error } = useDynamicGetRequest();

  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const customerId = customerData.customer.id;

  useEffect(() => {
    if (!customerId) {
      return; // Do not proceed until customerId is defined
    }

    // Create a new socket connection
    const socket = io(socketURL, {
      query: { customerId },
    });

    socket.on('connect', () => {
      console.log(`Connected to server as customer: ${customerId}`);
      // Emit a join room event or similar to subscribe to updates for this customer
      console.log(customerId);
      socket.emit('joinRoom', { room: `customer-${customerId}` });
    });

    // Setup event listener for booking updates
    socket.on('booking-update', message => {
      console.log(message);
      CustomerGlobalStore.update(s => {
        s.bookingDetails = message;
      });
      setIsOpen(false);
      history.push('/mechdetails');
      // setResponse(message)
    });

    // Cleanup function to run when the component unmounts or customerId changes
    return () => {
      socket.off('booking-update');
      socket.disconnect();
    };
  }, [customerId, data]);

  const notificationData = [
    {
      imageUrl: '/user/location.png',
      text: 'Inspection Address',
      name: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    },
    {
      imageUrl: '/user/calendar.svg',

      text: 'Slot Selected',
      name: '03:00PM | 27th May 2024',
    },
    {
      imageUrl: '/user/setting.svg',

      text: 'Package',
      name: 'Premium Service',
    },
    {
      imageUrl: '/user/wallet.svg',

      text: 'Total',
      name: '$ 123.6',
    },
  ];

  return (
    <IonPage>
      <IonContent>
        <MapComponent selectedPlace={selectedPlace} />
        <Modal
          isOpen={isOpen}
          // btnText="Done"
          title="Looking For Mechanic"
          // onSubmit={() => {
          //   history.push('/appuser/selectlocation');
          // }}
          // placed
        >
          <div>
            <div>
              {notificationData?.map((notification, index) => (
                <div key={index} className="border-t py-1">
                  <SingleNotifications
                    direction="font-medium"
                    key={index}
                    imageUrl={notification.imageUrl}
                    text={notification.text}
                    name={notification.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal>

        {/* <div className="flex flex-col justify-center gap-20 items-center py-5">
          first
          <div className="flex flex-col justify-center items-center">
        <Text typography="modalHeader" className="p-3">
          Looking for your <span className="text-blue-600 ">mechanic</span>
        </Text>
        <div>
          {notificationData?.map((notification, index) => (
            <div className="border-t py-2">
              <SingleNotifications
                direction="font-medium"
                key={index}
                imageUrl={notification.imageUrl}
                text={notification.text}
                name={notification.name}
              />
            </div>
          ))}
        </div>
      </div>
          second
          <div className="flex flex-col  items-center text-center">
            <Image alt="img" src={Waiting} />
            <TitleDescription
              heading="Booking placed successfully"
              description="Lets look for a mechanic for you!"
            />
          </div>
          third
          <div className="flex flex-col justify-center  ">
            <Text
              typography="modalHeader"
              className="p-3 text-center w-full flex items-center justify-center gap-3"
            >
              <GreenTick /> Mechanic Booked
            </Text>
            <AccountComp
              direction={'flex '}
              imageUrl="/notifications/profile.svg"
              name="Ben Williams"
              rating={'Rating | 200+ services '}
              items={'items-start'}
              motorspecialist={'AC Motor'}
            />
             Map the notificationDa ta array and render SingleNotifications component
            <div>
              {notificationData?.map((notification, index) => (
                <div key={index} className="border-t py-2">
                  <SingleNotifications
                    direction="font-medium"
                    key={index}
                    imageUrl={notification.imageUrl}
                    text={notification.text}
                    name={notification.name}
                  />
                </div>
              ))}
            </div>
          </div> 

     
        </div> */}
      </IonContent>
    </IonPage>
  );
};

export default MechanicBooked;
