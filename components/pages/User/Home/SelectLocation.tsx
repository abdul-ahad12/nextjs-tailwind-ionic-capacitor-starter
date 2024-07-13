import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import SearchComponent from '../../../ui/common/GMaps/Search';
import { Button } from '../../../ui/common/button';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { LocationStore } from '../Onboarding/store';
import { BookingStore } from '../BookingFlow/store';
import { Text } from '../../../ui/common/text';
import { AllBookingStore } from './store';
import { CustomerGlobalStore } from '../GlobalStore';
import { io } from 'socket.io-client';
import { socketURL } from '../../../../utils/definations/axios/url';
import { AccountComp, DynamicFieldsGenerate, SingleNotifications } from '../../../ui/common';
import { RealEstateBookingStore } from '../RealEstateFlow/store';

const SelectLocation: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [bookingStatusModal, setBookingStatusModal] = useState(false);
  const [lookForMechanicModal, setLookForMechStatusModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null); // Update type here
  const autocompleteService = useRef<any>(null);
  const [isOpen, setisOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('vehicle');
  console.log(activeTab);
  const history = useHistory();

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

  const handleSelect = (place: any) => {
    setInputValue(place.description);
    setSuggestions([]); // Close the suggestions by setting an empty array
    // Fetch place details using the place_id
    getPlaceDetails(place.place_id);
  };

  const getPlaceDetails = (placeId: string) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
        LocationStore.update((s: any) => {
          // Update the store
          s.selectedLocation = place;
        });
      } else {
        console.error('Error fetching place details:', status);
        setSelectedPlace(null); // Set selectedPlace to null if details fetching fails
        LocationStore.update((s: any) => {
          // Reset the store if fetching fails
          s.selectedLocation = null;
        });
      }
    });
  };

  useEffect(() => {
    if (inputValue && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: inputValue,
          componentRestrictions: {
            country: 'AU',
          }, // Restrict to Melbourne, Victoria, Australia
        },
        (predictions: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        },
      );
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;
  const isModalFormValid = () => {
    return formMethods.formState.isValid && selectedPlace;
  };

  const onSubmit = (data: any, error: any) => {
    if (activeTab === 'vehicle') {
      BookingStore.update(s => {
        s.vehicle.vehicleAddress = {
          ...s.vehicle.vehicleAddress,
          lat: selectedPlace.geometry.location.lat(),
          long: selectedPlace.geometry.location.lng(),
          city: data.city,
          landmark: data.landmark,
          name: data.name,
          street: data.street,
          suburb: data.suburb,
          zipcode: data.zipcode,
        };
      });
      setisOpen(false);
      history.push('/contactseller');
    } else {
      RealEstateBookingStore.update(s => {
        s.location.locationAddress = {
          ...s.location.locationAddress,
          lat: selectedPlace.geometry.location.lat(),
          long: selectedPlace.geometry.location.lng(),
          city: data.city,
          landmark: data.landmark,
          name: data.name,
          street: data.street,
          suburb: data.suburb,
          zipcode: data.zipcode,
        };
      });
      setisOpen(false);
      history.push('/landownerinfo');
    }
  };

  const fields = [
    {
      fieldName: 'street',
      inputType: 'text',
      label: 'Street',
      defaultValue: selectedPlace
        ? selectedPlace.address_components.find((component: any) =>
            component.types.includes('route'),
          )?.long_name || ''
        : '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'suburb',
      inputType: 'text',
      label: 'Suburb',
      defaultValue: selectedPlace
        ? selectedPlace.address_components.find((component: any) =>
            component.types.includes('locality'),
          )?.long_name || ''
        : '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'city',
      inputType: 'text',
      label: 'State',
      defaultValue: selectedPlace
        ? selectedPlace.address_components.find((component: any) =>
            component.types.includes('locality'),
          )?.long_name || ''
        : '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'zipcode',
      inputType: 'text',
      label: 'PinCode',
      defaultValue: selectedPlace
        ? selectedPlace.address_components.find((component: any) =>
            component.types.includes('postal_code'),
          )?.long_name || ''
        : '',
      config: {
        required: 'Required',
      },
    },
    // {
    //   fieldName: 'name',
    //   inputType: 'text',
    //   label: 'House Name',
    //   defaultValue: '',
    //   config: {
    //     required: 'Required',
    //   },
    // },
    // {
    //   fieldName: 'landmark',
    //   inputType: 'text',
    //   label: 'Landmark',
    //   defaultValue: '',
    //   config: {
    //     required: 'Required',
    //   },
    // },
  ];
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
  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const customerId = customerData?.customer.id;

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
      setLookForMechStatusModal(false);
      history.push('/mechdetails');
      // setResponse(message)
    });

    // Cleanup function to run when the component unmounts or customerId changes
    return () => {
      socket.off('booking-update');
      socket.disconnect();
    };
  }, [customerId]);

  const { data } = AllBookingStore.getRawState();

  let mechanicBooked: any[] = [];

  if (data && data.success && data.data) {
    mechanicBooked = data.data.filter(
      (booking: any) =>
        booking.mechanicId &&
        !booking.Order[0].isFullfilled &&
        booking.ownerId === customerData?.customer.id,
    );
  }

  let lookingForMechanic: any[] = [];
  if (data && data.success && data.data) {
    lookingForMechanic = data.data.filter(
      (booking: any) =>
        !booking.Order[0].isFullfilled &&
        booking.ownerId === customerData?.customer.id,
    );
  }

  console.log(lookingForMechanic);

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <MapComponent selectedPlace={selectedPlace} />
      </IonContent>
      <div className="absolute top-2 left-2 flex  items-center text-customWhite">
        <img src="/smalllogo.svg" className="w-24" />
        <Text className="ml-[-1rem] text-lg font-semibold text-customWhite">
          Hello, {customerData?.firstName}
        </Text>
      </div>
      {mechanicBooked.length != 0 ? (
        <div
          onClick={() => {
            setBookingStatusModal(true);
          }}
        >
          <AccountComp
            direction={'flex '}
            imageUrl="/notifications/profile.svg"
            name="Ben Williams"
            rating={'Rating | 200+ services '}
            items={'items-start'}
            motorspecialist={'AC Motor'}
            modalOpen
          />{' '}
        </div>
      ) : lookingForMechanic.length != 0 ? (
        <div
          onClick={() => {
            setLookForMechStatusModal(true);
          }}
        >
          <AccountComp
            direction={'flex '}
            imageUrl="/notifications/profile.svg"
            name="Still Looking for A Mechanic"
            items={'items-keft'}
            motorspecialist={'Hold Tight'}
            modalOpen
          />{' '}
        </div>
      ) : (
        // <div className="flex justify-center w-full absolute bottom-3">
        //   <div className="w-[90%] bg-white px-2 pb-2 rounded-primary">
        //     <div className="p-[10px] flex flex-col justify-between">
        //       <Text typography="modalHeader" className="pb-2">
        //         Where is your Vehicle?
        //       </Text>
        //       <SearchComponent
        //         inputValue={inputValue}
        //         setInputValue={setInputValue}
        //         suggestions={suggestions}
        //         handleSelect={handleSelect}
        //       />
        //     </div>
        //     <Button
        //       id="open-modal"
        //       onClick={() => {
        //         setisOpen(true);
        //       }}
        //     >
        //       Next
        //     </Button>
        //     <FormProvider {...formMethods}>
        //       <Modal
        //         isOpen={isOpen}
        //         title={'Location of Inspection'}
        //         btnText={'Confirm And Proceed'}
        //         onSubmit={handleSubmit(onSubmit)}
        //         disabled={!isModalFormValid()}
        //       >
        //         <DynamicFieldsGenerate errors={errors} fields={fields} />
        //       </Modal>
        //     </FormProvider>
        //   </div>
        // </div>
        <></>
      )}
      <div className="flex justify-center w-[full] bottom-3">
        <div className="w-[90%] bg-white px-2 pb-2 rounded-primary">
          <SwitchTabs setActiveTab={setActiveTab} activeTab={activeTab} />
          <div className="p-[10px] flex flex-col justify-between">
            <Text typography="modalHeader" className="pb-2">
              Where is the {activeTab === 'vehicle' ? 'Vehicle' : 'Land Location'}
            </Text>
            <SearchComponent
              inputValue={inputValue}
              setInputValue={setInputValue}
              suggestions={suggestions}
              handleSelect={handleSelect}
            />
          </div>
          <Button
            disabled={
              mechanicBooked.length != 0 || lookingForMechanic.length != 0
            }
            id="open-modal"
            onClick={() => {
              setisOpen(true);
            }}
          >
            Next
          </Button>
          <FormProvider {...formMethods}>
            <Modal
              isOpen={isOpen}
              title={'Location of Inspection'}
              btnText={'Confirm And Proceed'}
              onSubmit={handleSubmit(onSubmit)}
              disabled={!isModalFormValid()}
            >
              <DynamicFieldsGenerate errors={errors} fields={fields} />
            </Modal>
          </FormProvider>
        </div>
      </div>

      <Modal
        isOpen={bookingStatusModal}
        btnText="Close"
        title="Mechanic Booked"
        searching
        placed
        onSubmit={() => {
          setBookingStatusModal(false);
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

      <Modal
        isOpen={lookForMechanicModal}
        title="Looking For Mechanic"
        btnText="Close"
        searching
        onSubmit={() => {
          setLookForMechStatusModal(false);
        }}
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
    </IonPage>
  );
};

export default SelectLocation;
