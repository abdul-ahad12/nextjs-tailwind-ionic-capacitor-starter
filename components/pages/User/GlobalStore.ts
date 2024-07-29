import { Store } from 'pullstate';

interface BookingsState {
  bookings: any[];
}

const CustomerGlobalStore = new Store({
  customerId: '',
  phoneNumber: '',
  lastName: '',
  userId: '',
  email: '',
  profilePic: '',
  bookingDetails: {},
});

const InspectionsStore = new Store<BookingsState>({
  bookings: [],
});

const xTokenStore = new Store({
  xToken: '',
});

export { CustomerGlobalStore, InspectionsStore, xTokenStore };
