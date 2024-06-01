import { Store } from 'pullstate';



const CustomerGlobalStore = new Store({
    customerId: '',
    phoneNumber: '',
    lastName: '',
    userId: '',
    email: '',
    profilePic: '',
    bookingDetails: {

    }
});

export { CustomerGlobalStore };
