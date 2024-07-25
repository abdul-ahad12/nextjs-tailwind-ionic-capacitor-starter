import React, { useState } from 'react';
import TitleDescription from '../../../ui/common/TitleDescription';
import PackageOffer from '../../../ui/common/user/PackageOffer';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import Tabs from '../../../ui/common/Layouts/TabsBooking';

const Package = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const history = useHistory();

  const handleSelectPackage = (packageName: any) => {
    setSelectedPackage(packageName);
  };

  const servicesPackage1 = {
    packageName: 'Basic Service',
    data: [
      'Engine Oil Change',
      'Oil Filtering',
      'Brake Inspection',
      'Battery Check',
    ],
  };

  const servicesPackage2 = {
    packageName: 'Premium Service',
    data: [
      'Full Car Wash',
      'Coolant Top up',
      'Air Filtering Cleaning',
      'Wax and Polish',
    ],
  };

  return (
    <BackAndButton
      back
      title='Package'
      BtnText="Next"
      onSubmit={() => {
        history.push('/ppsraddon');
      }}
    >
      <div className="w-full">
        <Tabs activeTab={3} />

        <div className="flex flex-col items-center text-center gap-4">
          <TitleDescription
            heading="Select the package that suits your requirement"
            description="Currently, we offer a single package designed to meet your needs, but stay tuned – more exciting options are coming soon!"
          />
          <div className="flex justify-center gap-4">
            <PackageOffer
              title="Basic Service"
              services={servicesPackage1.data}
              price="$123"
              selectable
              isSelected={selectedPackage === 'Basic Service'}
              onSelect={() => handleSelectPackage('Basic Service')}
            />
            {/* <PackageOffer
              title="Premium Service"
              services={servicesPackage2.data}
              price="$135"
              selectable
              isSelected={selectedPackage === 'Premium Service'}
              onSelect={() => handleSelectPackage('Premium Service')}
            /> */}
          </div>
        </div>
      </div>
    </BackAndButton>
  );
};

export default Package;
