'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import '../styles/font/silka/stylesheet.css';
import '../styles/global.css';
import OnBoarding from './pages/OnBoarding';
import DocsPage from './pages/OnBoarding/DocsPage';
import ProfilePhoto from './pages/OnBoarding/ProfilePhoto';
import MechanicTabs from './pages/MechanicFlow/MechanicTabs';
import Signup from './pages/Authflow/Signup';
import OTP from './pages/Authflow/OTP';
import Landing from './pages/Authflow/Landing';
import Login from './pages/Authflow/Login';
import Abn from './pages/OnBoarding/Abn';
import BusinessDetails from './pages/OnBoarding/BusinessDetails';
import MechanicExperienceSurvey from './pages/OnBoarding/MechanicExperienceSurvey';
import VechileType from './pages/OnBoarding/VechicleType';
import FuelType from './pages/OnBoarding/FuelType';
import TermsAndCondition from './pages/OnBoarding/TermsAndCondition';
import ScheduleInspection from './pages/MechanicFlow/Home/ScheduledInspection';
import InspectionRequest from './pages/MechanicFlow/Home/InspectionRequest';
import Reports from './pages/MechanicFlow/Reports/Reports';
import OngoingReports from './pages/MechanicFlow/Reports/OngoingInspection';
import ResendOtp from './pages/Authflow/ResendOtp';
import WaitingScreen from './pages/MechanicFlow/waitingScreen';
import Tabs from './pages/Tabs';
import { ContactSeller } from './pages/User/BookingFlow/ContactSeller';
import { WhichSeller } from './pages/User/BookingFlow/WhichService';
import CreateAccount from './pages/User/Onboarding/CreateAccount';
import OnBoardingUser from './pages/User/Onboarding/OnBoarding';
import EnableLocation from './pages/User/BookingFlow/EnableLocation';
import SelectLocation from './pages/User/Onboarding/SelectLocation';
import Package from './pages/User/BookingFlow/Package';
import PackageMoreDetails from './pages/User/BookingFlow/PackageMoreDetails';
import SelectDateTime from './pages/User/BookingFlow/SelectDateTime';
import Payments from './pages/User/BookingFlow/Payments';
import BookingPlacedSuccessfully from './pages/User/BookingFlow/BookingPlacedSuccessfully';
import LookingForMechanic from './pages/User/BookingFlow/LookingForMechanic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateReport from './pages/MechanicFlow/Reports/CreateReport';
import OTPLogin from './pages/Authflow/OtpLogin';
import VehicleDetails from './pages/User/BookingFlow/VehicleDetails';
import MechanicBooked from './pages/User/BookingFlow/MechanicBooked';
import LoginUser from './pages/User/Authflow/Login';
import LandingUser from './pages/User/Authflow/Landing';
import SignupUser from './pages/User/Authflow/Signup';
import OTPUser from './pages/User/Authflow/OTP';
import OTPLoginUser from './pages/User/Authflow/OtpLogin';
import TabsUser from './pages/Tabs';

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
            <Route path="/onboarding" render={() => <OnBoarding />} />
            <Route path="/docspage" render={() => <DocsPage />} />
            <Route path="/profilephoto" render={() => <ProfilePhoto />} />
            <Route path="/abn" render={() => <Abn />} />
            <Route path="/mechanic" render={() => <MechanicTabs />} />
            <Route path="/landing" render={() => <Landing />} />
            <Route path="/otp" render={() => <OTP />} />
            <Route path="/resendotp" render={() => <ResendOtp />} />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/businessdetails" render={() => <BusinessDetails />} />
            <Route
              path="/mechanicexperiencesurvey"
              render={() => <MechanicExperienceSurvey />}
            />
            <Route path="/vechiletype" render={() => <VechileType />} />
            <Route path="/fueltype" render={() => <FuelType />} />
            <Route
              path="/termsandcondition"
              render={() => <TermsAndCondition />}
            />
            <Route
              path="/scheduleinspection"
              render={() => <ScheduleInspection />}
            />
            <Route
              path="/inspectionrequest"
              render={() => <InspectionRequest />}
            />
            <Route path="/reports" render={() => <Reports />} />
            <Route path="/ongoingreports" render={() => <OngoingReports />} />
            <Route path="/app" render={() => <Tabs />} />
            <Route path="/waitingscreen" render={() => <WaitingScreen />} />
            <Route path="/createreport" render={() => <CreateReport />} />
            <Route path="/otplogin" render={() => <OTPLogin />} />

            {/* USER */}

            <Route path="/contactseller" render={() => <ContactSeller />} />
            <Route path="/whichseller" render={() => <WhichSeller />} />
            <Route path="/vehicledetails" render={() => <VehicleDetails />} />
            <Route path="/onboardinguser" render={() => <CreateAccount />} />
            <Route path="/onboardinguser1" render={() => <OnBoardingUser />} />
            <Route path="/enablelocation" render={() => <EnableLocation />} />
            {/* <Route path="/selectlocation" render={() => <SelectLocation />} /> */}
            <Route path="/package" render={() => <Package />} />
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
            <Route path="/" render={() => <LandingUser />} />
            <Route path="/otpuser" render={() => <OTPUser />} />
            <Route path="/otploginuser" render={() => <OTPLoginUser />} />
            <Route path="/appuser" render={() => <TabsUser />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
};

export default AppShell;
