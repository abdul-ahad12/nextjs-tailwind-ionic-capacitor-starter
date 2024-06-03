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
  IonButton
} from '@ionic/react';
import { DownloadOutline } from 'react-ionicons';

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

  const handleDownload = (url) => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); // You can customize the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BackAndButton back title="Report">
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md mb-4">
        <h1 className="text-2xl font-bold">Inspection Report</h1>
        {report && (
          <IonButton
            onClick={() => handleDownload(report.url)}
            className="flex items-center bg-blue-600 text-white rounded px-4 py-2"
          >
            <DownloadOutline className="mr-2" />
            Download
          </IonButton>
        )}
      </div>
      {report && (
        <>
          <IonGrid className="p-4">
            <IonRow className="justify-between mb-4">
              <IonCol size="auto">
                <p className="text-lg font-medium">Date: {new Date().toLocaleDateString()}</p>
              </IonCol>
              <IonCol size="auto">
                <p className="text-lg font-medium">Mechanic: {report.mechanicId}</p>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonAccordionGroup>
            {[
              { value: 'engineAndPeripherals', label: 'Engine and Peripherals', content: report.engineAndPeripherals },
              { value: 'transmissionDrivetrain', label: 'Transmission and Drivetrain', content: report.transmissionDrivetrain },
              { value: 'bodyStructure', label: 'Body Structure', content: report.bodyStructure },
              { value: 'interior', label: 'Interior', content: report.interior },
              { value: 'suspensionAndBrakes', label: 'Suspension and Brakes', content: report.suspensionAndBrakes },
              { value: 'wheelsAndTires', label: 'Wheels and Tires', content: report.wheelsAndTires },
              { value: 'finalChecks', label: 'Final Checks', content: report.finalChecks },
            ].map(section => (
              <IonAccordion key={section.value} value={section.value}>
                <IonItem slot="header" className="bg-gray-200">
                  <IonLabel className="text-lg font-semibold">{section.label}</IonLabel>
                </IonItem>
                <div className="p-4 bg-white" slot="content">
                  <IonList>{renderSection(section.content)}</IonList>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
          <div className="p-4">
            <IonItem className="my-4">
              <IonLabel>
                <h2 className="text-xl font-semibold">Additional Comments</h2>
                <p className="mt-2">{report.additionalComments}</p>
              </IonLabel>
            </IonItem>
            <IonItem className="my-4">
              <IonLabel>
                <h2 className="text-xl font-semibold">Recommendation</h2>
                <p className="mt-2">Purchase: {report.recommendation.purchase ? 'Yes' : 'No'}</p>
                <p className="mt-2">Repairs Needed: {report.recommendation.repairsNeeded.join(', ')}</p>
                <p className="mt-2">Estimated Repair Costs: ${report.recommendation.estimatedRepairCosts}</p>
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
  return Object.keys(sectionData).map(key => {
    const item = sectionData[key];
    return (
      <IonItem key={key} className="my-2">
        <IonLabel>
          <h2 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
          <p className="mt-1"><span className="font-bold">Rating:</span> {item.rating}</p>
          <p className="mt-1"><span className="font-bold">Comments:</span> {item.comments}</p>
          {item.images &&
            item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${key} ${index}`}
                className="w-full mt-2 rounded-lg"
              />
            ))}
        </IonLabel>
      </IonItem>
    );
  });
};
