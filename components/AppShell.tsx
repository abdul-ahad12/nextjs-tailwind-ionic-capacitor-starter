'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import '../styles/font/silka/stylesheet.css';
import '../styles/global.css';
import { ContactSeller } from './pages/User/BookingFlow/ContactSeller';
import { WhichSeller } from './pages/User/BookingFlow/WhichService';
import CreateAccount from './pages/User/Onboarding/CreateAccount';
import OnBoardingUser from './pages/User/Onboarding/OnBoarding';
import EnableLocation from './pages/User/BookingFlow/EnableLocation';
import Package from './pages/User/BookingFlow/Package';
import PackageMoreDetails from './pages/User/BookingFlow/PackageMoreDetails';
import SelectDateTime from './pages/User/BookingFlow/SelectDateTime';
import Payments from './pages/User/BookingFlow/Payments';
import BookingPlacedSuccessfully from './pages/User/BookingFlow/BookingPlacedSuccessfully';
import LookingForMechanic from './pages/User/BookingFlow/LookingForMechanic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleDetails from './pages/User/BookingFlow/VehicleDetails';
import MechanicBooked from './pages/User/BookingFlow/MechanicBooked';
import LoginUser from './pages/User/Authflow/Login';
import LandingUser from './pages/User/Authflow/Landing';
import SignupUser from './pages/User/Authflow/Signup';
import OTPUser from './pages/User/Authflow/OTP';
import OTPLoginUser from './pages/User/Authflow/OtpLogin';
import TabsUser from './pages/User/Home/Tabs';
import SingleReport from './pages/User/Report';
import MechDetails from './pages/User/BookingFlow/mechDetails';
import SingleBookingDetails from './pages/User/Activity/SingleBookingDetails';
import RealEstatePackage from './pages/User/RealEstateFlow/RealEstatePackage';
import { LandOwnerInfo } from './pages/User/RealEstateFlow/LandOwnerInfo';
import RealEstateSelectDateTime from './pages/User/RealEstateFlow/SelectDateTime';
import LookingForRealEstateAgent from './pages/User/RealEstateFlow/LookingForRealEstate';
import RealEstateReportView from './pages/User/RealEstateFlow/RealestateReport';
import PPSRReport from './pages/User/BookingFlow/NegotiateOnYourBehalf';
import NegotiateOnYourBehalf from './pages/User/BookingFlow/NegotiateOnYourBehalf';
import PPSRAddons from './pages/User/BookingFlow/PpsrAddons';

setupIonicReact({});

// window
//   .matchMedia('(prefers-color-scheme: dark)')
//   .addEventListener('change', async status => {
//     try {
//       await StatusBar.setStyle({
//         style: status.matches ? Style.Dark : Style.Light,
//       });
//     } catch {}
//   });

const AppShell = () => {
  const queryClient = new QueryClient();

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/" render={() => <LandingUser />} />
            <Route path="/contactseller" render={() => <ContactSeller />} />
            <Route path="/whichseller" render={() => <WhichSeller />} />
            <Route path="/vehicledetails" render={() => <VehicleDetails />} />
            <Route path="/onboardinguser" render={() => <CreateAccount />} />
            <Route path="/onboardinguser1" render={() => <OnBoardingUser />} />
            <Route path="/enablelocation" render={() => <EnableLocation />} />
            {/* <Route path="/selectlocation" render={() => <SelectLocation />} /> */}
            <Route path="/package" render={() => <Package />} />
            <Route path="/ppsraddon" render={() => <PPSRAddons />} />
            <Route
              path="/packagemoredetails"
              render={() => <PackageMoreDetails />}
            />
            <Route path="/selectdatetime" render={() => <SelectDateTime />} />
            <Route path="/payments" render={() => <Payments />} />
            <Route
              path="/bookingplacedsuccessfully"
              render={() => <BookingPlacedSuccessfully />}
            />
            <Route
              path="/lookingformechanic"
              render={() => <LookingForMechanic />}
            />
            <Route path="/mechanicbooked" render={() => <MechanicBooked />} />
            <Route path="/loginuser" render={() => <LoginUser />} />
            <Route path="/signupuser" render={() => <SignupUser />} />
            <Route path="/otpuser" render={() => <OTPUser />} />
            <Route path="/otploginuser" render={() => <OTPLoginUser />} />
            <Route path="/appuser" render={() => <TabsUser />} />
            <Route path="/singlereport" render={() => <SingleReport />} />
            <Route path="/mechdetails" render={() => <MechDetails />} />
            <Route
              path="/singleactivity"
              render={() => <SingleBookingDetails />}
            />
            <Route
              path="/negotiateonyourbehalf"
              render={() => <NegotiateOnYourBehalf />}
            />

            {/* RealEstate */}
            <Route path="/landownerinfo" render={() => <LandOwnerInfo />} />
            <Route path="/realestatepackage" render={() => <RealEstatePackage />} />
            <Route path="/realestatedateandtime" render={() => <RealEstateSelectDateTime />} />
            <Route path="/lookingforrealestate" render={() => <LookingForRealEstateAgent />} />
            <Route path="/realestatereportview" render={() => <RealEstateReportView />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
};

export default AppShell;
