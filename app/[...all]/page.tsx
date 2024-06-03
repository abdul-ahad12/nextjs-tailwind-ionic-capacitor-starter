import dynamic from 'next/dynamic';
import { lists } from '../../mock';
import '../../styles/font/silka/stylesheet.css';
import '../../styles/global.css';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    // onboarding
    { all: ['lists'] },
    { all: ['test'] },
    { all: ['onboarding'] },
    { all: ['docspage'] },
    { all: ['profilephoto'] },
    { all: ['feed'] },
    { all: ['landing'] },
    { all: ['lists'] },
    { all: ['login'] },
    { all: ['signup'] },
    { all: ['otp'] },
    { all: ['otplogin'] },
    { all: ['resendotp'] },
    { all: ['createaccount'] },
    { all: ['onboarding'] },
    { all: ['privacypolicy'] },
    { all: ['page3'] },
    { all: ['mechanic'] },
    // mechanicflow
    { all: ['todaysinspection'] },
    { all: ['mechanic'] },
    { all: ['abn'] },
    { all: ['businessdetails'] },
    { all: ['mechanicexperiencesurvey'] },
    { all: ['vechiletype'] },
    { all: ['fueltype'] },
    { all: ['termsandcondition'] },
    { all: ['todaysinspection'] },
    { all: ['scheduleinspection'] },
    { all: ['inspectionrequest'] },
    { all: ['reports'] },
    { all: ['ongoingreports'] },
    { all: ['notifications'] },
    { all: ['profile'] },
    { all: ['accountsetting'] },
    { all: ['documents'] },
    { all: ['support'] },
    { all: ['waitingscreen'] },
    { all: ['app'] },
    { all: ['createreport'] },
    // user
    { all: ['contactseller'] },
    { all: ['whichseller'] },
    { all: ['onboardinguser'] },
    { all: ['onboardinguser1'] },
    { all: ['enablelocation'] },
    { all: ['selectlocation'] },
    { all: ['package'] },
    { all: ['packagemoredetails'] },
    { all: ['selectdatetime'] },
    { all: ['payments'] },
    { all: ['bookingplacedsuccessfully'] },
    { all: ['lookingformechanic'] },
    { all: ['vehicledetails'] },
    { all: ['mechanicbooked'] },
    { all: ['user'] },
    { all: ['loginuser'] },
    { all: ['signupuser'] },
    { all: ['otpuser'] },
    { all: ['otploginuser'] },
    { all: ['appuser'] },
    { all: ['singlereport'] },
    { all: ['mechdetails'] },

    // { all: ['app/todaysinspection'] },

    ...lists.map(list => ({ all: ['lists', list.id] })),
    { all: ['settings'] },
  ];
}

export default function Page() {
  return <App />;
}
