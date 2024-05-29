import Image from 'next/image';
import React from 'react';
import CarImg from '../../../../public/user/carimg.png';
import { GreenTick } from '../svgs';
import { Text } from '../text';
import { useHistory } from 'react-router';

interface PackageOfferProps {
  services: string[];
  price: string;
  title: string;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

const PackageOffer: React.FC<PackageOfferProps> = ({
  services,
  price,
  title,
  selectable = false,
  isSelected = false,
  onSelect,
}) => {
  const history = useHistory();
  const handleClick = () => {
    onSelect();
    history.push('/packagemoredetails');
  };

  return (
    <div
      className={`p-2 flex flex-col items-center gap-4 border rounded-lg w-[156px] ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}
      onClick={handleClick}
    >
      <Image src={CarImg} alt="package" />
      <Text typography="cardsheader">{title}</Text>
      <div className="flex flex-col gap-3">
        {services.map((service, index) => (
          <div className="flex items-center gap-2" key={index}>
            <GreenTick />
            <Text typography="services">{service}</Text>
          </div>
        ))}
      </div>
      <Text typography="cardsheader">{price}</Text>
    </div>
  );
};

export default PackageOffer;
