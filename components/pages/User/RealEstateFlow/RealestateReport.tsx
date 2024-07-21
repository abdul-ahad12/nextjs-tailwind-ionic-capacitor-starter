import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { BackAndButton } from '../../../ui';
import TitleDescription from '../../../ui/common/TitleDescription';

const DisplayAccordion = ({ title, content }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center cursor-pointer px-3 bg-[#f7f7f7] border rounded-md transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold flex-1 text-blue-700">{title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-700 transition-transform duration-300 ease-in-out transform rotate-180" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-700 transition-transform duration-300 ease-in-out" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-3 bg-[#ffffff] border-l border-b border-r rounded-lg border-opacity-10 border-gray-500">
          <div className="text-gray-700">{content}</div>
        </div>
      </div>
    </div>
  );
};

const UserDisplay = () => {
  const [formData, setFormData] = useState({
    // Existing form data
    medicalFacilities: ['Hospital A', 'Clinic B', 'Pharmacy C'],
    educationalInstitutions: ['School X', 'College Y', 'University Z'],
    recreationalFacilities: ['Park M', 'Gym N', 'Swimming Pool O'],
    shoppingAndDining: ['Mall P', 'Restaurant Q', 'Grocery Store R'],
    transportFacilities: ['Bus Stop S', 'Train Station T', 'Metro Station U'],
    emergencyServices: ['Police Station V', 'Fire Station W', 'Emergency Medical Center X'],
    communityServices: ['Community Center Y', 'Public Library Z', 'Post Office A'],
    otherFacilities: ['Bank B', 'ATM C'],
    neighborhoodVibe: 'Friendly and welcoming, with a mix of young families and retirees.',
    proximityToMainRoads: 'The property is located 2 blocks away from the main road.',
    futureDevelopmentPlans: 'There are plans for new residential complexes and a shopping center in the area.',
    parkingAvailability: 'Ample parking space available with both street and private parking options.',
    additionalComments: 'The neighborhood is quiet and has a lot of green spaces.',
  
    // New questions
    priceCompetitive: 'Yes',
    priceCompetitiveJustification: 'The property is priced 10% lower than similar properties in the area. This makes it a very attractive option for potential buyers looking for good value in a competitive market.',
    legalZoningIssues: 'No',
    legalZoningJustification: 'The property is in a zone with no known restrictions or issues. This ensures that the new owner will have a smooth experience with no unexpected legal challenges.',
    propertyCondition: 'Good',
    propertyConditionDetails: 'The property has been well-maintained and recently renovated. It features modern amenities and a fresh, updated look, making it move-in ready for new owners.',
    floodDisasterProne: 'No',
    floodDisasterDetails: 'The property is not in a flood-prone area according to local maps. This provides peace of mind to the owner knowing that the risk of flood damage is minimal.',
    repairsRenovationsNeeded: 'No',
    repairsRenovationsDetails: 'No immediate repairs or renovations are needed. The property has been kept in excellent condition, reducing the need for additional investment after purchase.',
    energyEfficient: 'Yes',
    energyEfficientDetails: 'The property has energy-efficient windows and insulation. These features help reduce energy costs and contribute to a more environmentally friendly home.',
    goodSchoolDistrict: 'Yes',
    goodSchoolDistrictDetails: 'The property is located within a highly-rated school district. This makes it an ideal location for families with children, ensuring access to quality education.',
    crimeRate: 'Low',
    crimeRateDetails: 'The crime rate in the area is lower than the city average. The neighborhood is considered safe, providing a secure environment for residents.',
    valueAppreciation: 'High',
    valueAppreciationJustification: 'The area has seen consistent value increases due to ongoing development and demand. This trend is expected to continue, making it a sound investment for future property value growth.'
  });
  

  return (
    <BackAndButton back title="Report">
      <TitleDescription
        heading="Here is the Report for your Inspection"
        description="This report provides a comprehensive overview of the inspected property, detailing conditions, findings, and recommendations for necessary repairs or improvements to ensure optimal safety and functionality"
      />
      <div className="pb-4">
        <DisplayAccordion
          title="Asking Price Competitive?"
          content={
            formData.priceCompetitive +
            (formData.priceCompetitiveJustification
              ? `: ${formData.priceCompetitiveJustification}`
              : '')
          }
        />
        <DisplayAccordion
          title="Legal/Zoning Issues?"
          content={
            formData.legalZoningIssues +
            (formData.legalZoningJustification
              ? `: ${formData.legalZoningJustification}`
              : '')
          }
        />
        <DisplayAccordion
          title="Property Condition"
          content={
            formData.propertyCondition +
            (formData.propertyConditionDetails
              ? `: ${formData.propertyConditionDetails}`
              : '')
          }
        />
        <DisplayAccordion
          title="Flood/Disaster Prone?"
          content={
            formData.floodDisasterProne +
            (formData.floodDisasterDetails
              ? `: ${formData.floodDisasterDetails}`
              : '')
          }
        />
        <DisplayAccordion
          title="Repairs/Renovations Needed?"
          content={
            formData.repairsRenovationsNeeded +
            (formData.repairsRenovationsDetails
              ? `: ${formData.repairsRenovationsDetails}`
              : '')
          }
        />
        <DisplayAccordion
          title="Energy Efficient?"
          content={
            formData.energyEfficient +
            (formData.energyEfficientDetails
              ? `: ${formData.energyEfficientDetails}`
              : '')
          }
        />
        <DisplayAccordion
          title="Good School District?"
          content={
            formData.goodSchoolDistrict +
            (formData.goodSchoolDistrictDetails
              ? `: ${formData.goodSchoolDistrictDetails}`
              : '')
          }
        />
        <DisplayAccordion
          title="Crime Rate"
          content={
            formData.crimeRate +
            (formData.crimeRateDetails ? `: ${formData.crimeRateDetails}` : '')
          }
        />
        <DisplayAccordion
          title="Value Appreciation Potential"
          content={
            formData.valueAppreciation +
            (formData.valueAppreciationJustification
              ? `: ${formData.valueAppreciationJustification}`
              : '')
          }
        />
        <DisplayAccordion
          title="Medical Facilities"
          content={formData.medicalFacilities.join(', ')}
        />
        <DisplayAccordion
          title="Educational Institutions"
          content={formData.educationalInstitutions.join(', ')}
        />
        <DisplayAccordion
          title="Recreational Facilities"
          content={formData.recreationalFacilities.join(', ')}
        />
        <DisplayAccordion
          title="Shopping and Dining"
          content={formData.shoppingAndDining.join(', ')}
        />
        <DisplayAccordion
          title="Transport Facilities"
          content={formData.transportFacilities.join(', ')}
        />
        <DisplayAccordion
          title="Emergency Services"
          content={formData.emergencyServices.join(', ')}
        />
        <DisplayAccordion
          title="Community Services"
          content={formData.communityServices.join(', ')}
        />
        <DisplayAccordion
          title="Other Facilities/Comments"
          content={formData.otherFacilities}
        />
      </div>
    </BackAndButton>
  );
};

export default UserDisplay;
