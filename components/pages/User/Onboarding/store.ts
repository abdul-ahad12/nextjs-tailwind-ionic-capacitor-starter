// store.js
import { Store } from 'pullstate';

const LocationStore = new Store({
  selectedLocation: null,
});

export default LocationStore;
