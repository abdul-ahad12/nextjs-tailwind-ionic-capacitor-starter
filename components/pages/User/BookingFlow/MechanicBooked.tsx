import React, { useEffect, useState } from 'react';
import SingleNotifications from '../../../ui/common/mechanic/resuable/SingleNotification';
import { IonContent, IonPage } from '@ionic/react';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { useHistory } from 'react-router';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { BookingResponseStore } from './store';
import { baseURL } from '../../../../utils/definations/axios/url';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';

const MechanicBooked = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const history = useHistory();

  const { makeRequest, data, loading, error } = useDynamicGetRequest()

  const notificationData = [
    {
      imageUrl: '/user/location.png',
      text: 'Inspection Address',
      name: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    },
    {
      imageUrl: '/user/location.png',

      text: 'Slot Selected',
      name: '03:00PM | 27th May 2024',
    },
    {
      imageUrl: '/user/location.png',

      text: 'Package',
      name: 'Premium Service',
    },
    {
      imageUrl: '/user/location.png',

      text: 'Total',
      name: '$ 123.6',
    },
  ]


  useEffect(() => {
    findMechs()
  }, [])

  useEffect(() => {
    if (data) {
      data.data.filter((s: any) => s.ownerId === BookingResponseStore.getRawState().id)

    } else {
      return
    }
  }, [data])

  const findMechs = () => {
    // const bookingDetails = BookingStore.getRawState()
    // const bookingResponse = BookingResponseStore.getRawState()
    // const payload = {
    //   latitude: bookingDetails.vehicle.vehicleAddress.lat,
    //   longitude: bookingDetails.vehicle.vehicleAddress.long,
    //   bookingId: bookingResponse.id
    // }
    // 17.393116,78.444869
    // const payload = { latitude: 17.3868117, longitude: 78.4538802, bookingId: '5e7d06ae-b434-43c3-b472-f3107b91a150' }
    // console.log('payload', payload)
    const requestConfig = {
      method: 'get',
      url: `${baseURL}/booking`,
    };

    makeRequest(requestConfig.url, requestConfig.method)
  }


  return (
    <IonPage>
      <IonContent>
        <MapComponent selectedPlace={selectedPlace} />
        <Modal
          isOpen={true}
          btnText="Done"
          title="Mechanic Booked"
          onSubmit={() => {
            history.push('/appuser/selectlocation');
          }}
          placed
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
