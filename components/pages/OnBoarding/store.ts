// store.js
import { Store } from 'pullstate';

const userDetailsStore = new Store({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  isPhoneVerified: true,
  email: '',
  role: 'MECHANIC',
});

const mechanicStore = new Store({
  profilePic: '',
  certifications: [],
  licences: [],
  hasAgreedToPolicies: true,
  vehicleTypes: 'SEDAN',
  vehicleUseType: 'NONCOMMERCIAL',
  vehicleFuelType: 'PETROL',
});

const approvalRequestStore = new Store({
  abn: '',
  experienceYears: '',
  certificate_3: '',
  certificate_4: '',
  publicLiabilityInsurance: '',
  ausIdentificationDoc: '',
  workshopAddress: {
    lat: Number,
    long: Number,
    zipcode: '',
    street: '',
    suburb: '',
    city: '',
  },
});

const addressStore = new Store({
  lat: 0,
  long: 0,
  zipcode: '',
  street: '',
  suburb: '',
  city: '',
});

export const ImageStore = new Store({
  id_front: null,
  id_back: null,
  cert_3: null,
  cert_4: null,
  pli: null,
  pii: null,
  profile_picture: null,
});

export { userDetailsStore, approvalRequestStore, mechanicStore, addressStore };
