import React, { useEffect, useState } from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import { IonContent, IonPage } from '@ionic/react';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { useHistory } from 'react-router';
import { BookingResponseStore, BookingStore, LocationStore } from './store';
import { CustomerGlobalStore } from '../GlobalStore';
import { io } from 'socket.io-client';
import { baseURL, socketURL } from '../../../../utils/definations/axios/url';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';

const LookingForMechanic = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
const customerDataString = localStorage.getItem('customerdata');
const customerData = customerDataString ? JSON.parse(customerDataString) : null;
const bookingDetails = BookingStore.getRawState()
const bookingResponse = BookingResponseStore.getRawState()

console.log(bookingDetails,bookingResponse)

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: (data: any) => {
          console.log('Found Mechanics', data)
          BookingResponseStore.update(s => {
            s.mechanics = data
          })
          history.replace('/mechanicbooked')

        },
        onError: (error: any) => {
          console.error('Login failed:', error)
        },
        onSettled: () => {
          console.log('Login mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

    const customerId=customerData.customer.id


  // Ensure the global store has customerId. !IMPORTANT

  useEffect(() => {
    if (!customerId) {
      return // Do not proceed until customerId is defined
    }

    // Create a new socket connection
    const socket = io(socketURL, {
      query: { customerId },
    })

    socket.on('connect', () => {
      console.log(`Connected to server as customer: ${customerId}`)
      // Emit a join room event or similar to subscribe to updates for this customer
      console.log(customerId)
      socket.emit('joinRoom', { room: `customer-${customerId}` })
    })

    // Setup event listener for booking updates
    socket.on('booking-update', (message) => {
      console.log(message)
      CustomerGlobalStore.update(s => {
        s.bookingDetails = message
      })
      // history.push('/mechanicbooked')
      // setResponse(message)

    })

    // Cleanup function to run when the component unmounts or customerId changes
    return () => {
      socket.off('booking-update')
      socket.disconnect()
    }
  }, [customerId, data])

  const findMechs = () => {
  

    // const payload = {
    //   latitude: bookingDetails.vehicle.vehicleAddress.lat,
    //   longitude: bookingDetails.vehicle.vehicleAddress.long,
    //   bookingId: bookingResponse.id
    // }
    // 17.393116,78.444869
    const payload = { latitude: bookingDetails.vehicle.vehicleAddress.lat, longitude: bookingDetails.vehicle.vehicleAddress.long, bookingId: bookingResponse.id }
    console.log('payload', payload)
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/booking/find-mechanics`,
      data: payload,
    };

    mutate(requestConfig)
  }

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
          btnText="Look for Mechanics"
          title="Booking has been Created"
          searching
          onSubmit={() => {
            findMechs()
            setIsOpen(false);
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
