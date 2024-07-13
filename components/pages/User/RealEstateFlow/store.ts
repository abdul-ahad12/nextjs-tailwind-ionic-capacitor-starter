import { Store } from 'pullstate';

export const RealEstateBookingStore = new Store({
  customerId: '',
  packageName: 'Basic Service',
  amount: 100,
  service: 'PRE_PURCHASE_INSPECTION',
  location: {
    locationAddress: {
      lat: 0,
      long: 0,
      zipcode: '',
      name: '',
      landmark: '',
      street: '',
      suburb: '',
      city: '',
    },
  
  },
  seller: {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
  },
});
