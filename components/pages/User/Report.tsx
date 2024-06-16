import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BackAndButton from '../../ui/common/Layouts/BackAndButton';
import useDynamicGetRequest from '../../../utils/supportingFns/getCall';
import { baseURL } from '../../../utils/definations/axios/url';
import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonButton,
} from '@ionic/react';
import { DownloadOutline } from 'react-ionicons';
import { Text } from '../../ui/common/text';

const SingleReport = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');

  const { data, error, loading, makeRequest } = useDynamicGetRequest();
  useEffect(() => {
    if (orderId) {
      console.log(`Order ID: ${orderId}`);
      makeRequest(`${baseURL}/inspection-report/booking/${orderId}`, 'GET');
    }
  }, [orderId]);

  console.log(data);

  const report = data && data.data[0];

  const handleDownload = (url: string) => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); // You can customize the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const dateTimeOfBooking = new Date(report?.booking?.dateTimeOfBooking);
  const readableFormat = dateTimeOfBooking.toLocaleString(); // Adjust the format as per your requirement
  const [date, time] = readableFormat.split(',').map(part => part.trim());

  return (
    <BackAndButton
      back
      title="Report"
      BtnText="Download Report"
      onSubmit={() => handleDownload(report.url)}
    >
      <Text className="text-tertiary font-semibold text-[1.5rem]">
        Inspection Report
      </Text>
      {report && (
        <>
          <div>
            <IonRow className="justify-between py-10 mb-5 border-b border-[#A0A0A0] border-opacity-30">
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.60988 6.90735C9.11739 6.90735 8.70898 6.49895 8.70898 6.00645V2.40285C8.70898 1.91036 9.11739 1.50195 9.60988 1.50195C10.1024 1.50195 10.5108 1.91036 10.5108 2.40285V6.00645C10.5108 6.49895 10.1024 6.90735 9.60988 6.90735Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M19.2193 6.90735C18.7268 6.90735 18.3184 6.49895 18.3184 6.00645V2.40285C18.3184 1.91036 18.7268 1.50195 19.2193 1.50195C19.7118 1.50195 20.1202 1.91036 20.1202 2.40285V6.00645C20.1202 6.49895 19.7118 6.90735 19.2193 6.90735Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M12.0122 17.4177C11.8561 17.4177 11.6999 17.3817 11.5558 17.3216C11.3996 17.2615 11.2795 17.1774 11.1594 17.0693C10.9432 16.8411 10.811 16.5408 10.811 16.2165C10.811 16.0603 10.8471 15.9042 10.9071 15.76C10.9672 15.6159 11.0513 15.4838 11.1594 15.3636C11.2795 15.2555 11.3996 15.1714 11.5558 15.1114C11.9882 14.9192 12.5288 15.0273 12.8651 15.3636C13.0813 15.5919 13.2134 15.9042 13.2134 16.2165C13.2134 16.2885 13.2014 16.3726 13.1894 16.4567C13.1774 16.5288 13.1534 16.6009 13.1173 16.6729C13.0933 16.745 13.0573 16.8171 13.0092 16.8891C12.9732 16.9492 12.9131 17.0093 12.8651 17.0693C12.6369 17.2855 12.3245 17.4177 12.0122 17.4177Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M16.2163 17.4177C16.0602 17.4177 15.904 17.3817 15.7599 17.3216C15.6037 17.2615 15.4836 17.1774 15.3635 17.0693C15.3154 17.0093 15.2674 16.9492 15.2193 16.8891C15.1713 16.8171 15.1353 16.745 15.1112 16.6729C15.0752 16.6009 15.0512 16.5288 15.0392 16.4567C15.0271 16.3726 15.0151 16.2885 15.0151 16.2165C15.0151 15.9042 15.1473 15.5919 15.3635 15.3636C15.4836 15.2555 15.6037 15.1714 15.7599 15.1114C16.2043 14.9192 16.7329 15.0273 17.0692 15.3636C17.2854 15.5919 17.4175 15.9042 17.4175 16.2165C17.4175 16.2885 17.4055 16.3726 17.3935 16.4567C17.3815 16.5288 17.3575 16.6009 17.3214 16.6729C17.2974 16.745 17.2614 16.8171 17.2133 16.8891C17.1773 16.9492 17.1172 17.0093 17.0692 17.0693C16.841 17.2855 16.5286 17.4177 16.2163 17.4177Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M12.0122 21.6222C11.6999 21.6222 11.3876 21.4901 11.1594 21.2739C10.9432 21.0457 10.811 20.7334 10.811 20.421C10.811 20.2649 10.8471 20.1087 10.9071 19.9646C10.9672 19.8084 11.0513 19.6763 11.1594 19.5682C11.6038 19.1238 12.4206 19.1238 12.8651 19.5682C12.9732 19.6763 13.0573 19.8084 13.1173 19.9646C13.1774 20.1087 13.2134 20.2649 13.2134 20.421C13.2134 20.7334 13.0813 21.0457 12.8651 21.2739C12.6369 21.4901 12.3245 21.6222 12.0122 21.6222Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M16.2163 21.6217C15.904 21.6217 15.5917 21.4896 15.3635 21.2734C15.2554 21.1653 15.1713 21.0331 15.1112 20.877C15.0512 20.7328 15.0151 20.5767 15.0151 20.4205C15.0151 20.2644 15.0512 20.1082 15.1112 19.9641C15.1713 19.8079 15.2554 19.6758 15.3635 19.5677C15.6398 19.2914 16.0602 19.1593 16.4446 19.2433C16.5286 19.2554 16.6007 19.2794 16.6728 19.3154C16.7449 19.3394 16.8169 19.3755 16.889 19.4236C16.9491 19.4596 17.0091 19.5196 17.0692 19.5677C17.2854 19.7959 17.4175 20.1082 17.4175 20.4205C17.4175 20.7328 17.2854 21.0451 17.0692 21.2734C16.841 21.4896 16.5286 21.6217 16.2163 21.6217Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M24.6245 11.8204H4.20412C3.71163 11.8204 3.30322 11.4119 3.30322 10.9195C3.30322 10.427 3.71163 10.0186 4.20412 10.0186H24.6245C25.117 10.0186 25.5254 10.427 25.5254 10.9195C25.5254 11.4119 25.117 11.8204 24.6245 11.8204Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M19.2191 27.3277H9.60954C5.22516 27.3277 2.70264 24.8052 2.70264 20.4208V10.2106C2.70264 5.82623 5.22516 3.30371 9.60954 3.30371H19.2191C23.6035 3.30371 26.126 5.82623 26.126 10.2106V20.4208C26.126 24.8052 23.6035 27.3277 19.2191 27.3277ZM9.60954 5.10551C6.1741 5.10551 4.50444 6.77518 4.50444 10.2106V20.4208C4.50444 23.8562 6.1741 25.5259 9.60954 25.5259H19.2191C22.6546 25.5259 24.3242 23.8562 24.3242 20.4208V10.2106C24.3242 6.77518 22.6546 5.10551 19.2191 5.10551H9.60954Z"
                    fill="#276EF1"
                  />
                </svg>

                <Text className="text-sm text-black font-medium">{date}</Text>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2436 15.3158C11.4357 15.3158 8.33643 12.2166 8.33643 8.40865C8.33643 4.60069 11.4357 1.50146 15.2436 1.50146C19.0516 1.50146 22.1508 4.60069 22.1508 8.40865C22.1508 12.2166 19.0516 15.3158 15.2436 15.3158ZM15.2436 3.30334C12.4327 3.30334 10.1383 5.59773 10.1383 8.40865C10.1383 11.2196 12.4327 13.514 15.2436 13.514C18.0545 13.514 20.3489 11.2196 20.3489 8.40865C20.3489 5.59773 18.0545 3.30334 15.2436 3.30334Z"
                    fill="#276EF1"
                  />
                  <path
                    d="M25.5623 27.3283C25.0698 27.3283 24.6614 26.9199 24.6614 26.4274C24.6614 22.2831 20.433 18.9196 15.2436 18.9196C10.0542 18.9196 5.8258 22.2831 5.8258 26.4274C5.8258 26.9199 5.41738 27.3283 4.92486 27.3283C4.43235 27.3283 4.02393 26.9199 4.02393 26.4274C4.02393 21.298 9.05716 17.1177 15.2436 17.1177C21.43 17.1177 26.4633 21.298 26.4633 26.4274C26.4633 26.9199 26.0548 27.3283 25.5623 27.3283Z"
                    fill="#276EF1"
                  />
                </svg>

                <Text className="text-sm font-medium text-black">
                  Mechanic: Ben Williams
                </Text>
              </div>
            </IonRow>
          </div>
          <IonAccordionGroup>
            {[
              {
                value: 'engineAndPeripherals',
                label: 'Engine and Peripherals',
                content: report.engineAndPeripherals,
              },
              {
                value: 'transmissionDrivetrain',
                label: 'Transmission and Drivetrain',
                content: report.transmissionDrivetrain,
              },
              {
                value: 'bodyStructure',
                label: 'Body Structure',
                content: report.bodyStructure,
              },
              {
                value: 'interior',
                label: 'Interior',
                content: report.interior,
              },
              {
                value: 'suspensionAndBrakes',
                label: 'Suspension and Brakes',
                content: report.suspensionAndBrakes,
              },
              {
                value: 'wheelsAndTires',
                label: 'Wheels and Tires',
                content: report.wheelsAndTires,
              },
              {
                value: 'finalChecks',
                label: 'Final Checks',
                content: report.finalChecks,
              },
            ].map(section => (
              <IonAccordion
                key={section.value}
                value={section.value}
                className=""
              >
                <IonItem slot="header" className="bg-gray-200">
                  <Text className="text-lg font-semibold py-3 text-black">
                    {section.label}
                  </Text>
                </IonItem>
                <div className="bg-black" slot="content">
                  <IonList>{renderSection(section.content)}</IonList>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
          <div>
            <IonItem className="my-4">
              <IonLabel>
                <Text className="text-md font-semibold text-black">Additional Comments</Text>
                <p className="mt-2">{report.additionalComments}</p>
              </IonLabel>
            </IonItem>
            <IonItem className="my-4">
              <IonLabel>
                <h2 className="text-xl font-semibold">Recommendation</h2>
                <p className="mt-2">
                  Purchase: {report.recommendation.purchase ? 'Yes' : 'No'}
                </p>
                <p className="mt-2">
                  Repairs Needed:{' '}
                  {report.recommendation.repairsNeeded.join(', ')}
                </p>
                <p className="mt-2">
                  Estimated Repair Costs: $
                  {report.recommendation.estimatedRepairCosts}
                </p>
              </IonLabel>
            </IonItem>
          </div>
        </>
      )}
    </BackAndButton>
  );
};

export default SingleReport;

const renderSection = (sectionData: any) => {
  return (
    <div className="flex flex-col gap-6">
      {Object.keys(sectionData).map(key => {
        const item = sectionData[key];
        return (
          <div key={key} className="my-2 flex flex-col gap-1">
            <Text className="text-lg font-semibold text-tertiary capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </Text>
            <div className="flex items-center gap-2">
              {' '}
              <Text className="font-bold">Rating:</Text> {item.rating}
            </div>
            <Text className="font-bold">Comments:</Text>
            <Text> {item.comments}</Text>
            {item.images &&
              item.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${key} ${index}`}
                  className="w-full mt-2 rounded-lg"
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};
