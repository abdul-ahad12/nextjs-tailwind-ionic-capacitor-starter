import React from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { Text } from '../../../ui/common/text';

const PrivacyPolicy = () => {
  return (
    <BackAndButton BtnText={'Agree and Continue'}>
      <div className="w-full flex flex-col items-center ">
        <Text typography="header">Privacy Policy</Text>
        <div className="w-full flex flex-col gap-6 py-10">
          <Text className="text-large font-bold">
            Why did Serviceklick create this commitment?
          </Text>
          <Text className="text-secomdary">
            This commitment is an important step towards creating a global
            community where everyone can truly belong. Discrimination prevents
            partners, clients, and their families from feeling included and
            welcomed, and we have no tolerance for it. Building a Serviceklick
            where everyone can belong hinges on knowing.
          </Text>
        </div>
        <div className="w-full flex flex-col gap-6 py-10">
          <Text className="text-large font-bold">
            Why did Serviceklick create this commitment?
          </Text>
          <Text className="text-secomdary">
            This commitment is an important step towards creating a global
            community where everyone can truly belong. Discrimination prevents
            partners, clients, and their families from feeling included and
            welcomed, and we have no tolerance for it. Building a Serviceklick
            where everyone can belong hinges on knowing.
          </Text>
        </div>
      </div>
    </BackAndButton>
  );
};

export default PrivacyPolicy;
