// store.js
import { Store } from 'pullstate';


const UserStore = new Store({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: {
    lat: 0,
    long: 0,
    zipcode: '',
    street: '',
    suburb: '',
    city: '',
  },
  role: 'CUSTOMER',
});

export { LocationStore, UserStore };
