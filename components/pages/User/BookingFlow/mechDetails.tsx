import React, { useEffect, useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { baseURL } from '../../../../utils/definations/axios/url';

const MechDetails = () => {
  const history = useHistory();
  const { makeRequest, data, loading, error } = useDynamicGetRequest();
  const customerData = JSON.parse(localStorage.getItem('customerdata'));
  const customerId = customerData.customer.id;
  const [mechanicDetails, setMechanicDetails] = useState(null);

  useEffect(() => {
    findMechs();
  }, []);

  const findMechs = () => {
    const requestConfig = {
      method: 'get',
      url: `${baseURL}/booking`,
    };

    makeRequest(requestConfig.url, requestConfig.method);
  };

  useEffect(() => {
    if (data && data.data.length > 0) {
      const mechanic = data.data.find(
        booking =>
          booking.ownerId === customerId &&
          booking.mechanic &&
          booking.Order &&
          booking.Order.length > 0 &&
          !booking.Order[0].isFullfilled,
      );
      if (mechanic) {
        setMechanicDetails(mechanic.mechanic);
      }
    }
  }, [data, customerId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <BackAndButton
        title="Mechanic Details"
        BtnText="Go to Dashboard"
        onSubmit={() => {
          history.push('/appuser/activity');
        }}
      >
        {mechanicDetails ? (
          <div className="text-center">
            <img
              src={mechanicDetails.profilePic || '/notifications/profile.svg'}
              alt="Mechanic Profile"
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
            <div className="mb-2">
              <p className="text-lg font-semibold">Phone Number:</p>
              <p className="text-xl font-bold">{mechanicDetails.phoneNumber}</p>
            </div>
            <p className="text-gray-700">
              The mechanic has agreed to all the terms.
            </p>
          </div>
        ) : (
          <p>No mechanic found matching the criteria.</p>
        )}
      </BackAndButton>
    </div>
  );
};

export default MechDetails;
