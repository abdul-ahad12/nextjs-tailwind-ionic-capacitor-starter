interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

// Define the interface for the getPlaceDetails function
interface GetPlaceDetails {
  (placeId: string, setSelectedPlace: (place: any) => void, setPostalCode: (postalCode: string) => void, reset: (values: any) => void): void;
}

// Define the function to extract an address component
export const extractAddressComponent = (
  addressComponents: AddressComponent[] | undefined,
  type: string,
): string => {
  if (addressComponents) {
    for (let component of addressComponents) {
      if (component.types.includes(type)) {
        return component.long_name;
      }
    }
  }
  return '';
};

// Define the function to extract the postal code
const extractPostalCode = (
  addressComponents: AddressComponent[] | undefined,
): string => {
  return extractAddressComponent(addressComponents, 'postal_code');
};

// Implement the getPlaceDetails function
export const getPlaceDetails: GetPlaceDetails = (
  placeId,
  setSelectedPlace,
  setPostalCode,
  reset,
) => {
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
