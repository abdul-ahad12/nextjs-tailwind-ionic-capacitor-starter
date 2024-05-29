import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useStoreState } from 'pullstate';
import MyStore from '../Authflow/store';
import { addressStore, userDetailsStore } from './store';
import { DynamicFieldsGenerate } from '../../ui/common/inputComponent/DynamicFieldsGenerate';
import { GeolocationPosition, Geolocation } from '@capacitor/geolocation';
import OnBoardingLayout from '../../ui/common/Layouts/OnBoardingLayout';

interface LocationData {
  city: string;
  street: string;
  zipCode: string;
}

const OnBoarding: React.FC = () => {
  const history = useHistory();
  const phoneNumber = useStoreState(MyStore, s => s.phoneNumber);
  const [currentCoordinates, setCurrentCoordinates] =
    useState<GeolocationPosition | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!currentCoordinates) return;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${currentCoordinates.coords.latitude}&lon=${currentCoordinates.coords.longitude}&format=json`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        setLocation({
          zipCode: data.address.postcode,
          city: data.address.city,
          street: data.address.road,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, [currentCoordinates]);

  useEffect(() => {
    const printCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setCurrentCoordinates(coordinates);
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    };

    printCurrentPosition();
  }, []);

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data: any) => {
    userDetailsStore.update(s => {
      s.firstName = data.firstName;
      s.lastName = data.lastName;
      s.phoneNumber = phoneNumber;
      s.email = data.email;
    });
    addressStore.update(s => {
      if (currentCoordinates) {
        s.lat = currentCoordinates.coords.latitude;
        s.long = currentCoordinates.coords.longitude;
      }
      s.zipcode = data.zipcode;
      s.city = data.city;
      s.street = data.street;
      s.suburb = data.suburb;
    });

    history.push('/docspage');
  };

  const fields = [
    {
      fieldName: 'firstName',
      inputType: 'text',
      label: 'First Name',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'First Name is required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
      },
    },
    {
      fieldName: 'lastName',
      inputType: 'text',
      label: 'Last Name',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'Last Name is required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
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
        required: 'Email',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple regex for email validation
          message: 'Invalid email address',
        },
      },
    },
    {
      fieldName: 'city',
      inputType: 'text',
      label: 'City',
      placeholder: location ? location.city : '',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'City is Required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
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
      validation: {
        required: 'Suburb is required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
      },
    },
    {
      fieldName: 'street',
      inputType: 'text',
      label: 'Street',
      placeholder: location ? location.street : '',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'Street is required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
      },
    },
    {
      fieldName: 'zipcode',
      inputType: 'text',
      label: 'ZipCode',
      placeholder: location ? location.zipCode : '',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'ZipCode is required',
        minLength: { value: 2, message: 'Minimum length is 2 characters' },
      },
    },

    // {
    //   fieldName: 'email',
    //   inputType: 'text',
    //   label: 'Email Address',
    //   defaultValue: '',
    //   config: {
    //     required: 'Required',
    //   },
    // },
    // {
    //   fieldName: 'Bio(optional)',
    //   inputType: 'text',
    //   label: 'Bio(optional)',
    //   defaultValue: '',
    //   config: {
    //     required: 'Required',
    //   },
    // },
  ];

  return (
    <FormProvider {...formMethods}>
      <OnBoardingLayout
        heading={'User Details'}
        description={'Provide your personal information to proceed.'}
        BtnText={'Continue'}
        onClick={handleSubmit(onSubmit)}
      >
        <DynamicFieldsGenerate errors={errors} fields={fields} />
      </OnBoardingLayout>
    </FormProvider>
  );
};

export default OnBoarding;
