import React, { useEffect, useState } from 'react';
import MechanicFlow from '../../ui/common/Layouts/MechanicFlow';
import ImageWithText from '../../ui/common/mechanic/resuable/ImageWithText';
import { EmptyArray } from '../../ui/common/svgs/EmptyArray';
import HeightFullLayout from '../../ui/common/Layouts/HeightFullLayout';
import { Text } from '../../ui/common/text';
import { useHistory } from 'react-router';
import useDynamicGetRequest from '../../../utils/supportingFns/getCall';
import { baseURL } from '../../../utils/definations/axios/url';

const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';

const WaitingScreen = () => {
  const history = useHistory();
  const [accepted, setAccepted] = useState(false);

  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  console.log(data)

  useEffect(() => {
    makeRequest(`${baseURL}/user/mechanic/${mechId}`, 'GET');
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data.approvalRequest.status === 'ACCEPTED') {
        setAccepted(true);
      } else {
        setAccepted(false);
      }
    }
  }, [data]);

  const [approved, setapproved] = useState(true);

  const handleSubmit = () => {
    if (accepted) {
      history.push('/app');
    } else {
      history.push('/');
    }
  };

  return (
    <MechanicFlow
      BtnText={accepted ? 'Get Started' : 'Go to login'}
      waitingScreen
      onSubmit={handleSubmit}
      approved={approved}
    >
      {loading && <div>loading...</div>}
      <HeightFullLayout>
        <div className="mt-[-4rem]">
          <ImageWithText
            imageUrl={<EmptyArray />}
            text={
              accepted
                ? 'Congratulations! You have been verified and approved to work on our platform. Welcome aboard!'
                : 'Please wait while our team reviews your documents. This process may take some time. Thank you for your patience.'
            }
          />
        </div>
        {!approved && (
          <Text className="absolute bottom-10 text-secondary font-semibold underline">
            Contact Support
          </Text>
        )}
      </HeightFullLayout>
    </MechanicFlow>
  );
};

export default WaitingScreen;
