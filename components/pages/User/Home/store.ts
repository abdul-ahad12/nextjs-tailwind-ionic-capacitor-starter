import { Store } from 'pullstate';

export const AllBookingStore = new Store({
  data: {
    data: [],
    success: false,
    message: '',
  },
});

export const REResponseBookingStore = new Store({
  data: {
    data: [],
    success: false,
    message: '',
  },
});