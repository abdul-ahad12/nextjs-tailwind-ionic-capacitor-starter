import React from 'react';
import { BackAndButton } from '@components/ui';

const RealEstateReportView = () => {
    const formData = {
        askingPriceCompetitive: {
          value: true,
          justification:
            'Comparable properties in the area are priced competitively.',
        },
        legalOrZoningIssues: {
          value: false,
          justification: '',
        },
        condition: 'Good condition, recently renovated.',
        floodOrDisasterProne: {
          value: false,
          specification: '',
        },
        repairsOrRenovationsNeeded: {
          value: true,
          details: 'Requires roof repairs and kitchen renovation.',
        },
        energyEfficient: {
          value: true,
          details: 'Installed energy-efficient windows and appliances.',
        },
        goodSchoolDistrict: {
          value: true,
          specification: 'Located in a highly rated school district.',
        },
        crimeRate: 'Low crime rate in the area.',
        propertyValueAppreciationPotential: {
          value: true,
          justification:
            'Expected increase in property value due to upcoming developments.',
        },
        medicalFacilities: ['Hospitals', 'Clinics'],
        educationalInstitutions: [
          'Elementary Schools',
          'Middle Schools',
          'High Schools',
        ],
        recreationalFacilities: ['Parks', 'Playgrounds', 'Sports Complexes'],
        shoppingAndDining: ['Supermarkets', 'Restaurants', 'Cafes'],
        transportFacilities: ['Bus Stops', 'Train Stations'],
        emergencyServices: [
          'Police Stations',
          'Fire Stations',
          'Emergency Medical Services',
        ],
        communityServices: ['Libraries', 'Community Centers', 'Post Offices'],
        otherFacilities: [
          'Religious Institutions',
          'Senior Centers',
          'Daycare Centers',
        ],
        neighborhoodVibe:
          'Family-friendly neighborhood with parks and community events.',
        proximityToMainRoads:
          'Close proximity to major highways, convenient for commuting.',
        futureDevelopmentPlans:
          'Future development plans include new residential complexes.',
        parkingAvailability: 'Plenty of parking spaces available on-site.',
      };

  return (
    <BackAndButton title="Report" back>
      <div className="max-w-lg mx-auto shadow-md rounded-lg px-2 pt-6 pb-8 mb-4">
        {/* <h2 className="text-xl font-bold mb-6">Real Estate Report</h2> */}

        {/* Question 1 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            1. Is the property's asking price competitive based on market analysis?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.askingPriceCompetitive.value === true ? 'Yes' : 'No'}
            </span>
            {formData.askingPriceCompetitive.justification && (
              <p className="text-sm text-gray-600">
                {formData.askingPriceCompetitive.justification}
              </p>
            )}
          </div>
        </div>

        {/* Question 2 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            2. Are there any potential legal or zoning issues with the property?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.legalOrZoningIssues.value === true ? 'Yes' : 'No'}
            </span>
            {formData.legalOrZoningIssues.justification && (
              <p className="text-sm text-gray-600">
                {formData.legalOrZoningIssues.justification}
              </p>
            )}
          </div>
        </div>

        {/* Question 3 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            3. Condition of the property:
          </label>
          <span className="mr-4 text-lg font-semibold">{formData.condition}</span>
        </div>

        {/* Question 4 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            4. Is the property in a flood-prone or disaster-prone area?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.floodOrDisasterProne.value === true ? 'Yes' : 'No'}
            </span>
            {formData.floodOrDisasterProne.specification && (
              <p className="text-sm text-gray-600">
                {formData.floodOrDisasterProne.specification}
              </p>
            )}
          </div>
        </div>

        {/* Question 5 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            5. Does the property require any immediate repairs or renovations?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.repairsOrRenovationsNeeded.value === true ? 'Yes' : 'No'}
            </span>
            {formData.repairsOrRenovationsNeeded.details && (
              <p className="text-sm text-gray-600">
                {formData.repairsOrRenovationsNeeded.details}
              </p>
            )}
          </div>
        </div>

        {/* Question 6 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            6. Is the property energy-efficient?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.energyEfficient.value === true ? 'Yes' : 'No'}
            </span>
            {formData.energyEfficient.details && (
              <p className="text-sm text-gray-600">
                {formData.energyEfficient.details}
              </p>
            )}
          </div>
        </div>

        {/* Question 7 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            7. Is the property in a good school district?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.goodSchoolDistrict.value === true ? 'Yes' : 'No'}
            </span>
            {formData.goodSchoolDistrict.specification && (
              <p className="text-sm text-gray-600">
                {formData.goodSchoolDistrict.specification}
              </p>
            )}
          </div>
        </div>

        {/* Question 8 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            8. Crime rate in the area:
          </label>
          <span className="mr-4 text-lg font-semibold">{formData.crimeRate}</span>
        </div>

        {/* Question 9 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            9. Is there potential for property value appreciation in the future?
          </label>
          <div className="flex items-center">
            <span className="mr-4 text-lg font-semibold">
              {formData.propertyValueAppreciationPotential.value === true ? 'Yes' : 'No'}
            </span>
            {formData.propertyValueAppreciationPotential.justification && (
              <p className="text-sm text-gray-600">
                {formData.propertyValueAppreciationPotential.justification}
              </p>
            )}
          </div>
        </div>

        {/* Nearby Facilities */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nearby Facilities:
          </label>
          {/* Medical Facilities */}
          <div>
            <h3 className="text-gray-700 text-sm font-bold mb-2">Medical Facilities:</h3>
            <ul className="list-disc ml-6">
              {formData.medicalFacilities.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Educational Institutions */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Educational Institutions:</h3>
            <ul className="list-disc ml-6">
              {formData.educationalInstitutions.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Recreational Facilities */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Recreational Facilities:</h3>
            <ul className="list-disc ml-6">
              {formData.recreationalFacilities.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Shopping and Dining */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Shopping and Dining:</h3>
            <ul className="list-disc ml-6">
              {formData.shoppingAndDining.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Transport Facilities */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Transport Facilities:</h3>
            <ul className="list-disc ml-6">
              {formData.transportFacilities.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Emergency Services */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Emergency Services:</h3>
            <ul className="list-disc ml-6">
              {formData.emergencyServices.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Community Services */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Community Services:</h3>
            <ul className="list-disc ml-6">
              {formData.communityServices.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>

          {/* Other Facilities */}
          <div className="mt-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Other Facilities:</h3>
            <ul className="list-disc ml-6">
              {formData.otherFacilities.map((facility, index) => (
                <li key={index} className="text-sm text-gray-800">{facility}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Additional Information:
          </label>
          <div className="text-gray-800 text-lg">{formData.neighborhoodVibe}</div>
        </div>

        {/* Additional Comments */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Additional Comments:
          </label>
          <div className="text-gray-800 text-lg">{formData.proximityToMainRoads}</div>
        </div>
      </div>
    </BackAndButton>
  );
};

export default RealEstateReportView;
