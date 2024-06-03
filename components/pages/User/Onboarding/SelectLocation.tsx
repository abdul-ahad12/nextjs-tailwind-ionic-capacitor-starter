import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import SearchComponent from '../../../ui/common/GMaps/Search';
import { Button } from '../../../ui/common/button';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { LocationStore } from './store';
import { BookingStore } from '../BookingFlow/store';
import { Text } from '../../../ui/common/text';

const SelectLocation: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null); // Update type here
  const autocompleteService = useRef<any>(null);
  const modal = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const history = useHistory();

  // console.log(selectedPlace);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      // console.log('Google Maps Autocomplete Service initialized');
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
    // console.log('Input value changed: ', inputValue);
    if (inputValue && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: inputValue },
        (predictions: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // console.log('Predictions: ', predictions);
            setSuggestions(predictions);
          } else {
            // console.log('Error fetching predictions: ', status);
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

  const onSubmit = (data: any, error: any) => {
    console.log(data);
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

    console.log(BookingStore.getRawState());

    setisOpen(false);
    history.push('/contactseller');
  };

  const fields = [
    {
      fieldName: 'city',
      inputType: 'text',
      label: 'Enter City',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'zipcode',
      inputType: 'text',
      label: 'PinCode',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'name',
      inputType: 'text',
      label: 'Enter Your House Name',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'landmark',
      inputType: 'text',
      label: 'Landmark',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'suburb',
      inputType: 'text',
      label: 'Suburb',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'street',
      inputType: 'text',
      label: 'Street',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
  ];

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <MapComponent selectedPlace={selectedPlace} />
      </IonContent>
      <div className="flex justify-center w-full absolute bottom-3">
        <div className="w-[90%] bg-white px-2 pb-2 rounded-primary">
          <div className="p-[10px] flex flex-col justify-between">
            <Text typography="modalHeader" className="pb-2">
              Where is your Vehicle?
            </Text>
            <SearchComponent
              inputValue={inputValue}
              setInputValue={setInputValue}
              suggestions={suggestions}
              handleSelect={handleSelect}
            />
          </div>
          <Button
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
              ref={modal}
              title={'Location of Inspection'}
              btnText={'Confirm And Proceed'}
              trigger={'open-modal'}
              onSubmit={handleSubmit(onSubmit)}
            >
              <DynamicFieldsGenerate errors={errors} fields={fields} />
            </Modal>
          </FormProvider>
        </div>
      </div>
    </IonPage>
  );
};

export default SelectLocation;
