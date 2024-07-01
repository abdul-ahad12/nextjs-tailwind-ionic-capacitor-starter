import { Store } from 'pullstate';

export const AllBookingStore = new Store({
  data: {
    data: [],
    success: false,
    message: '',
  },
});
