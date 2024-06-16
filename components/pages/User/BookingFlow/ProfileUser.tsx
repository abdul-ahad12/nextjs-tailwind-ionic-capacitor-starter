// import React, { useEffect } from 'react';
// import { RightArrowSvg } from '../../../ui/common/svgs';
// import BorderTextNumber from '../../../ui/common/mechanic/resuable/BorderTextNumber';
// import IconTextButton from '../../../ui/common/mechanic/resuable/IconTextButton';
// import { DocumentSvg } from '../../../ui/common/svgs/DocumentSvg';
// import AccountComp from '../../../ui/common/mechanic/resuable/mechanicinspection/AccountComp';
// import { Button } from '../../../ui/common/button';
// import { useHistory } from 'react-router';
// import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
// import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
// import { baseURL } from '../../../../utils/definations/axios/url';

// const UserProfile = () => {
//   const history = useHistory();

//   // const { data, error, loading, makeRequest } = useDynamicGetRequest();
//   // console.log(data);

//   // const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';
//   // useEffect(() => {
//   //   // Example usage of makeRequest function
//   //   makeRequest(`${baseURL}/user/mechanic/${mechId}`, 'GET');
//   // }, []);

//   const borderTextNumberData = [
//     { text: 'Todays Inspections ', number: 20, borderColor: 'black' },
//     { text: 'Todays Earnings', number: 10, borderColor: 'green-500' },
//     // Add more objects as needed
//   ];

//   const iconTextButtonData = [
//     {
//       icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
//       text: 'Account Settings',
//       bgcolor: 'bg-white', // Example background color
//       href: '/app/accountsetting',
//     },
//     {
//       icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
//       text: 'My Documents',
//       bgcolor: 'bg-white', // Example background color
//       href: '/app/documents',
//     },
//     {
//       icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
//       text: 'Support',
//       bgcolor: 'bg-white', // Example background color
//       href: '/app/support',
//     },
//     {
//       icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
//       text: 'Privacy Policy',
//       bgcolor: 'bg-white', // Example background color
//       href: '#',
//     },
//     // Add more objects as needed
//   ];
//   return (
//     <BackAndButton back title="Profile">
//       <div className="flex flex-col gap-6">
//         <AccountComp
//           direction={'bg-notifications'}
//           imageUrl={
//             data?.data.profilepic
//               ? data?.data.profilepic
//               : '/notifications/profile.svg'
//           }
//           name={data?.data?.user.firstName}
//           rating={data?.data?.rating}
//         />
//         <div className="flex justify-betwen gap-4">
//           {/* Map the borderTextNumberData array and render BorderTextNumber component */}
//           {borderTextNumberData.map((item, index) => (
//             <div key={index}>
//               <BorderTextNumber
//                 key={index}
//                 text={item.text}
//                 number={item.number}
//                 borderColor={item.borderColor}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col gap-5 mt-5">
//           {/* Map the iconTextButtonData array and render IconTextButton component */}
//           {iconTextButtonData.map((item, index) => (
//             <div
//               key={index}
//               className="w-full"
//               onClick={() => {
//                 history.push(item.href);
//               }}
//             >
//               <IconTextButton
//                 key={index}
//                 svgcomp={<RightArrowSvg />}
//                 icon={item.icon}
//                 text={item.text}
//                 bgcolor={item.bgcolor}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="w-fit">
//           <Button
//             onClick={() => {
//               history.replace('/landing');
//             }}
//             className="text-red-500 w-full items-start"
//             color="secondary"
//           >
//             {'('}&#x2192; <span className="ml-3">Log Out</span>
//           </Button>
//         </div>
//       </div>
//     </BackAndButton>
//   );
// };

// export default UserProfile;

import React from 'react';
import { RightArrowSvg } from '../../../ui/common/svgs';
import BorderTextNumber from '../../../ui/common/mechanic/resuable/BorderTextNumber';
import IconTextButton from '../../../ui/common/mechanic/resuable/IconTextButton';
import { DocumentSvg } from '../../../ui/common/svgs/DocumentSvg';
import AccountComp from '../../../ui/common/mechanic/resuable/mechanicinspection/AccountComp';
import { Button } from '../../../ui/common/button';
import { useHistory } from 'react-router';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import AccountSvg from '../../../ui/common/svgs/AccountSvg';
import SupportSvg from '../../../ui/common/svgs/SupportSvg';
import PrivacyAndPolicy from '../../../ui/common/svgs/PrivacyAndPolicy';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Text } from '../../../ui/common/text';

const ProfileUser = () => {
  const history = useHistory();

  const customerDataString = localStorage.getItem('customerdata');
  const customerData = customerDataString
    ? JSON.parse(customerDataString)
    : null;

  const borderTextNumberData = [
    { text: 'Todays Inspections ', number: 20, borderColor: 'black' },
    { text: 'Todays Earnings', number: 10, borderColor: 'green-500' },
    // Add more objects as needed
  ];

  const iconTextButtonData = [
    {
      icon: <AccountSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Account Settings',
      bgcolor: 'bg-white', // Example background color
      href: '/appuser/accountsetting',
    },
    // {
    //   icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
    //   text: 'My Documents',
    //   bgcolor: 'bg-white', // Example background color
    //   href: '/app/documents',
    // },
    {
      icon: <SupportSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Support',
      bgcolor: 'bg-white', // Example background color
      href: '/appuser/support',
    },
    {
      icon: <PrivacyAndPolicy />, // Assuming you have an AddImageSvg component imported
      text: 'Privacy Policy',
      bgcolor: 'bg-white', // Example background color
      href: '#',
    },
    // Add more objects as needed
  ];
  return (
    // <BackAndButton back title="Profile">
    <IonPage>
      <IonHeader className="shadow-none">
        <div className="h-[12rem] bg-[#f4f4f5] flex items-center px-[5%] justify-between">
          <Text className="text-black font-semibold text-[1.5rem]">
            Hello, {customerData?.firstName}
          </Text>
          <img className="w-[9rem] mt-4" src="/user/userProfile.svg" />
        </div>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-6">
          <AccountComp
            direction={'border border-[#D9D9D9] rounded-lg'}
            imageUrl="/notifications/profile.svg"
            name={`${customerData?.firstName} ${customerData?.firstName}`}
            rating={'Rating'}
            user
            phoneNumber={customerData.customer.phoneNumber}
          />

          <div className="flex flex-col gap-5 mt-5">
            {/* Map the iconTextButtonData array and render IconTextButton component */}
            {iconTextButtonData.map((item, index) => (
              <div
                key={index}
                className="w-full"
                onClick={() => {
                  history.push(item.href);
                }}
              >
                <IconTextButton
                  key={index}
                  svgcomp={<RightArrowSvg />}
                  icon={item.icon}
                  text={item.text}
                  bgcolor={item.bgcolor}
                />
              </div>
            ))}
          </div>
          <div className="w-fit">
            <Button
              onClick={() => {
                localStorage.clear();
                history.replace('/');
              }}
              className="text-red-500 w-full items-start"
              color="secondary"
            >
              {'('}&#x2192; <span className="ml-3">Log Out</span>
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
    // </BackAndButton>
  );
};

export default ProfileUser;
