import React, { useState } from 'react';
import TitleDescription from '../../../ui/common/TitleDescription';
import PackageOffer from '../../../ui/common/user/PackageOffer';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import Tabs from '../../../ui/common/Layouts/TabsBooking';

const RealEstatePackage = () => {
  const history = useHistory();



  const packageServics = [
    {
      packageName: 'Expert Property Evaluation',
      imgUrl:"/realestate/img1package.svg"
    },
    {
      packageName: 'Market Positioning & Price Analysis',
      imgUrl:"/realestate/img2package.svg"    },
    {
      packageName: 'Property Condition & Maintenance Review',
      imgUrl:"/realestate/img3package.svg"    },
    {
      packageName: 'Neighborhood Analysis',
      imgUrl:"/realestate/img4package.svg"    },
  ];

  return (
    <BackAndButton
    title='Package'
      back
      BtnText="Next"
      onSubmit={() => {
        history.push('/realestatedateandtime');
      }}
    >
      <div className="w-full">
        <Tabs activeTab={3} />

        <div className="flex flex-col items-center text-center gap-4">
          <TitleDescription
            heading="Services Included"
            description="We offer in detail property inspection report with various features included"
          />
          <div className="grid grid-cols-2 gap-2">
            {packageServics.map((data, index) => {
              return <div key={index}><PackageOffer title={data.packageName} imgUrl={data.imgUrl} realEstate /></div>
            })}
          </div>
        </div>
      </div>
    </BackAndButton>
  );
};

export default RealEstatePackage;
