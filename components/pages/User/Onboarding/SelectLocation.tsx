import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import SearchComponent from '../../../ui/common/GMaps/Search';
import { Button } from '../../../ui/common/button';
import MapComponent from '../../../ui/common/GMaps/Maps';
import Modal from '../../../ui/common/modals';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import LocationStore from './store';

const SelectLocation: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null); // Update type here
  const autocompleteService = useRef<any>(null);
  const modal = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      console.log('Google Maps Autocomplete Service initialized');
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
    console.log('Input value changed: ', inputValue);
    if (inputValue && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: inputValue },
        (predictions: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log('Predictions: ', predictions);
            setSuggestions(predictions);
          } else {
            console.log('Error fetching predictions: ', status);
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
    setisOpen(false);
    history.push('/contactseller');
  };

  const fields = [
    {
      fieldName: 'City',
      inputType: 'text',
      label: 'Enter City',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'Zipcode',
      inputType: 'text',
      label: 'Enter Zipcode',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'House Name',
      inputType: 'text',
      label: 'Enter Your House Name',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'Landmark',
      inputType: 'text',
      label: 'Enter Landmark',
      defaultValue: '',
      config: {
        required: 'Required',
      },
    },
    {
      fieldName: 'Street',
      inputType: 'text',
      label: 'Enter Street',
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
      <IonFooter className="ion-padding">
        <div className="p-[10px] flex flex-col justify-between">
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
      </IonFooter>
    </IonPage>
  );
};

export default SelectLocation;
