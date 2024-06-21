import React, { useEffect, useRef, useState, useMemo } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { Text } from '../../../ui/common/text';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { DynamicFieldsGenerate } from '../../../ui/common/inputComponent/DynamicFieldsGenerate';
import { UserStore } from './store';
import { Geolocation, Position } from '@capacitor/geolocation';
import { useDynamicRequest } from '../../../../utils/definations/axios/axiosInstance';
import { baseURL, phoneCode } from '../../../../utils/definations/axios/url';
import { CustomerGlobalStore } from '../GlobalStore';
import { addNotification } from '../../../../utils/supportingFns/notifications';
import SearchComponent from '../../../ui/common/GMaps/Search';

const extractAddressComponent = (
  addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
  type: string,
) => {
  if (addressComponents) {
    for (let component of addressComponents) {
      if (component.types.includes(type)) {
        return component.long_name;
      }
    }
  }
  return '';
};

const CreateAccount = () => {
  const history = useHistory();
  const [latlng, setlatlng] = useState<Position | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const autocompleteService = useRef<any>(null);
  const [postalCode, setPostalCode] = useState('');

  const { mutate, isPending, isError, error, isSuccess, data } =
    useDynamicRequest(
      {},
      {
        onSuccess: (data: any) => {
          console.log('Customer Created:', data);
          localStorage.setItem('customerdata', JSON.stringify(data.data));
          addNotification('You Created Your Account');

          console.log(CustomerGlobalStore.getRawState());
          history.push('/onboardinguser1');
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
        },
        onSettled: () => {
          console.log('Login mutation settled');
          // Handle any cleanup or final actions
        },
      },
    );

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = formMethods;

  useEffect(() => {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setlatlng(coordinates);
    };

    printCurrentPosition();
  }, []);

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
    service.getDetails({ placeId: placeId }, (place: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
        const postalCode = extractPostalCode(place?.address_components);
        if (postalCode) {
          setPostalCode(postalCode);
        }
        // Update form values with place details
        reset({
          city: extractAddressComponent(
            place.address_components,
            'administrative_area_level_1',
          ),
          suburb: extractAddressComponent(
            place.address_components,
            'sublocality_level_1',
          ),
          street: extractAddressComponent(place.address_components, 'route'),
          zipcode: postalCode || '',
        });
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
        {
          input: inputValue,
          componentRestrictions: {
            country: 'AU',
          },
        },
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

  useEffect(() => {
    const subscription = formMethods.watch(values => {
      const requiredFieldsFilled = fields.every(field => {
        return field.config.required ? values[field.fieldName] : true;
      });
      setIsFormValid(requiredFieldsFilled && Object.keys(errors).length === 0);
    });
    return () => subscription.unsubscribe();
  }, [formMethods, errors]);

  const fields = useMemo(
    () => [
      {
        fieldName: 'firstName',
        inputType: 'text',
        label: 'Firstname',
        defaultValue: '',
        config: {
          required: 'Required',
        },
      },
      {
        fieldName: 'lastName',
        inputType: 'text',
        label: 'LastName',
        defaultValue: '',
        config: {
          required: 'Required',
        },
      },
      {
        fieldName: 'email',
        inputType: 'text',
        label: 'Email',
        defaultValue: '',
        config: {
          required: 'Required',
        },
        validation: {
          required: 'Email is Required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Incorrect Email',
          },
        },
      },
      {
        fieldName: 'street',
        inputType: 'text',
        label: 'Street',
        defaultValue: selectedPlace
          ? extractAddressComponent(selectedPlace?.address_components, 'route')
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
          ? extractAddressComponent(
              selectedPlace?.address_components,
              'sublocality_level_1',
            )
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
          ? extractAddressComponent(
              selectedPlace?.address_components,
              'administrative_area_level_1',
            )
          : '',
        config: {
          required: 'Required',
        },
      },
      {
        fieldName: 'zipcode',
        inputType: 'text',
        label: 'Pin Code',
        defaultValue: postalCode || '',
        config: {
          required: 'Required',
        },
        validation: {
          pattern: {
            value: /^\d{4}$/,
            message: 'Pin Code must be a 4-digit number',
          },
        },
      },
    ],
    [selectedPlace, postalCode],
  );

  const extractPostalCode = (
    addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
  ) => {
    return extractAddressComponent(addressComponents, 'postal_code');
  };

  const onSubmit = (data: any) => {
    const phoneNumber = UserStore.getRawState().phoneNumber;
    UserStore.update(s => {
      s.firstName = data.firstName;
      s.lastName = data.lastName;
      s.email = data.email;
      s.phoneNumber = `${phoneCode}${phoneNumber}`;
      s.address = {
        ...s.address, // keep existing address fields
        lat: latlng?.coords.latitude || 0,
        long: latlng?.coords.longitude || 0,
        zipcode: data.zipcode,
        street: data.street,
        suburb: data.suburb,
        city: data.city,
      };
    });

    const payload = UserStore.getRawState();
    console.log('payload', payload);
    const requestConfig = {
      method: 'post',
      url: `${baseURL}/auth/signup/customer`,
      data: payload,
    };

    mutate(requestConfig);
  };

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        onSubmit={handleSubmit(onSubmit)}
        BtnText={'Create'}
        disabled={!isFormValid || isSubmitting}
      >
        <div className="h-full flex flex-col items-center justify-between">
          <div className="flex flex-col w-full">
            <TitleDescription
              heading="Create Account"
              description="Enter All Your Personal Details Correctly"
            />
            <Text className="text-[#1A202F]">
              Enter your address (Make sure to provide an accurate location)
            </Text>
            <SearchComponent
              inputValue={inputValue}
              setInputValue={setInputValue}
              suggestions={suggestions}
              handleSelect={handleSelect}
              top
            />
            <div className="w-full flex flex-col gap-5 mt-[-1.7rem]">
              <DynamicFieldsGenerate fields={fields} errors={errors} />
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
            <input type="checkbox" />
            <Text className="text-secondary">
              Allow Inspectly to send updates on +21674894
            </Text>
          </div> */}
        </div>
      </BackAndButton>
    </FormProvider>
  );
};

export default CreateAccount;
