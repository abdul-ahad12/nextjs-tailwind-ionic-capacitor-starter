import React, { useEffect, useRef, useState } from 'react';

import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../ui/common/inputComponent/DynamicFieldsGenerate';
import { useHistory } from 'react-router';
import SearchComponent from '../../ui/common/GMaps/Search';
import { Text } from '../../ui/common/text';
import { approvalRequestStore } from './store';

interface FormData {
  city: string;
  suburb: string;
  street: string;
  zipCode: string;
}

const BusinessDetails = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const autocompleteService = useRef<any>(null);
  const [postalCode, setPostalCode] = useState('');

  console.log('postal', postalCode);
  const history = useHistory();
  const formMethods = useForm<FormData>();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  console.log(isSubmitting);

  const extractPostalCode = (
    addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
  ) => {
    if (addressComponents) {
      for (let component of addressComponents) {
        if (component.types.includes('postal_code')) {
          return component.long_name;
        }
      }
    }
    return null;
  };

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
    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
        const postalCode = extractPostalCode(place?.address_components);
        if (postalCode) {
          setPostalCode(postalCode);
        }
      } else {
        console.error('Error fetching place details:', status);
        setSelectedPlace(null); // Set selectedPlace to null if details fetching fails
      }
    });
  };

  useEffect(() => {
    console.log('Input value changed: ', inputValue);
    if (inputValue && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: inputValue },
        (predictions: any[], status: any) => {
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

  const onSubmit: SubmitHandler<FormData> = data => {
    const { city, suburb, street, zipCode } = data;
    const lat = selectedPlace?.geometry.location.lat();
    const lng = selectedPlace?.geometry.location.lng();

    console.log(city, lat, lng);

    approvalRequestStore.update(s => {
      s.workshopAddress = {
        lat: Number(lat),
        long: Number(lng),
        street: street,
        suburb: suburb,
        city: city,
        zipcode: zipCode, // Include the zipcode property
      };
    });

    history.push('/mechanicexperiencesurvey');
  };

  const fields = [
    {
      fieldName: 'city',
      inputType: 'text',
      label: 'City',
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
    {
      fieldName: 'zipCode',
      inputType: 'text',
      label: 'Zip Code',
      defaultValue: postalCode || '',
      config: {
        required: 'Required',
      },
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <OnBoardingLayout
        back
        heading={'Business Detail'}
        description={''}
        BtnText={'Submit'}
        onClick={handleSubmit(onSubmit)}
      >
        <Text className="text-[#1A202F]">
          Enter your workshop address (Make sure provide accurate location)
        </Text>
        <SearchComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          suggestions={suggestions}
          handleSelect={handleSelect}
          top
        />
        <div className="mt-[-1.7rem]">
          <DynamicFieldsGenerate errors={errors} fields={fields} />
        </div>
      </OnBoardingLayout>
    </FormProvider>
  );
};

export default BusinessDetails;
