import React, { useEffect, useRef, useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';
import { Text } from '../../../ui/common/text';
import InputComponent from '../../../ui/common/inputComponent';
import SearchComponent from '../../../ui/common/GMaps/Search';
import { useHistory } from 'react-router';

const CreateAccount = () => {

  const history =useHistory()
  const [showReferralInput, setShowReferralInput] = useState(false);

  const toggleReferralInput = () => {
    setShowReferralInput(!showReferralInput);
  };

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const autocompleteService = useRef<any>(null);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      console.log('Google Maps Autocomplete Service initialized');
    }
  }, []);
  const handleSelect = (place:any) => {
    setInputValue(place.description);
    setSuggestions([]); // Close the suggestions by setting an empty array
    // Fetch place details using the place_id
    getPlaceDetails(place.place_id);
  };

  const getPlaceDetails = (placeId:any) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );
    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
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
        (predictions:any, status:any) => {
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

  const handleSubmit=()=>{
    history.push("/onboardinguser1")
  }



  return (
    <BackAndButton onSubmit={handleSubmit} BtnText={'Create'}>
      <div className="h-full flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <TitleDescription
            heading="Create Account"
            description="Enter the complete address of where the vehicle is located "
          />
          <div className="py-10 w-full flex flex-col gap-5">
            <InputComponent text="First Name" />
            <InputComponent text="Last Name" />
            <InputComponent text="Email Optional" placeholder="Email" />

            <div className="flex flex-col gap-2">
            <Text className='text-[#1A202F]'>Your Location</Text>
              <SearchComponent
                inputValue={inputValue}
                setInputValue={setInputValue}
                suggestions={suggestions}
                handleSelect={handleSelect}
              />
            </div>

            {showReferralInput && <InputComponent text="Referral Code" />}
          </div>
          {!showReferralInput && (
            <div onClick={toggleReferralInput} className="w-full">
              {' '}
              <Text className="text-tertiary font-[600] cursor-pointer">
                Do you have a referral code?
              </Text>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <Text className="text-secondary">
            Allow Inspectly to send updates on +21674894
          </Text>
        </div>
      </div>
    </BackAndButton>
  );
};

export default CreateAccount;
