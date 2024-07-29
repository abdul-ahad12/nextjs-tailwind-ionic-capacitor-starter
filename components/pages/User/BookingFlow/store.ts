import { Store } from 'pullstate';

const LocationStore = new Store({
  selectedLocation: null,
})

const BookingResponseStore = new Store({
  id: '',
  mechanics: {},
  ppsrLink:""
})

const BookedMechs = new Store({
  mechs: []
})

const BookingStore = new Store({
  customerId: '',
  packageName: 'Basic Service',
  amount: 100,
  service: 'PRE_PURCHASE_INSPECTION',
  // date:'',
  // time:'',
  vehicle: {
    vehicleAddress: {
      lat: 0,
      long: 0,
      zipcode: '',
      name: '',
      landmark: '',
      street: '',
      suburb: '',
      city: '',
    },
    make: '',
    model: '',
    year: '',
    regNumber: '',
  },
  seller: {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
  },
})

export { BookingStore, LocationStore, BookingResponseStore };
