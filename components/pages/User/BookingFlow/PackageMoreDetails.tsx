import React from 'react';
import Image from 'next/image';
import CarImg from '../../../../public/user/moredetails.png';
import { Text } from '../../../ui/common/text';
import { GreenTick } from '../../../ui/common/svgs';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';

const PackageMoreDetails = () => {
  const details = [
    { text: '4 Hrs Taken', img: CarImg },
    { text: '1000 Kms or 1 month warranty', img: CarImg },
    { text: 'Every 5000 Kms or 3 Months', img: CarImg },
    { text: 'Free Pick-up or Drop', img: CarImg },
  ];
  const WhatsInclude = [
    { text: 'Oil change', img: GreenTick },
    { text: '1000 Kms or 1 month warranty', img: GreenTick },
    { text: 'Filter Change', img: GreenTick },
    { text: 'Basic Service', img: GreenTick },
    { text: 'Oil change', img: GreenTick },
    { text: '1000 Kms or 1 month warranty', img: GreenTick },
    { text: 'Filter Change', img: GreenTick },
    { text: 'Basic Service', img: GreenTick },
    { text: 'Oil change', img: GreenTick },
    { text: '1000 Kms or 1 month warranty', img: GreenTick },
    { text: 'Filter Change', img: GreenTick },
    { text: 'Basic Service', img: GreenTick },
    { text: 'Oil change', img: GreenTick },
    { text: '1000 Kms or 1 month warranty', img: GreenTick },
    { text: 'Filter Change', img: GreenTick },
    { text: 'Basic Service', img: GreenTick },
  ];

  return (
    <BackAndButton back title='Package Details'>
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 mt-4">
        {details.map((detail, index) => (
          <LogoText
            key={index}
            img={detail.img}
            text={detail.text}
            className="text-[#474747] font-medium"
          />
        ))}
      </div>
      <div className="border " />
      <div className="flex flex-col gap-3 mt-5">
        <Text typography="cardsheader" className="mb-5">
          What’s included?
        </Text>
        {WhatsInclude.map((detail, index) => (
          <LogoText
            className="font-medium"
            key={index}
            svg={<GreenTick />}
            text={detail.text}
          />
        ))}
      </div>
      <div className="flex justify-between text-black py-10">
        <Text typography="body" className="text-black">
          Basic Service
        </Text>
        <Text typography="body" className="text-black">
          $ 23
        </Text>
      </div>
    </div></BackAndButton>
  );
};

export default PackageMoreDetails;

interface LogoTextProps {
  img?: any;
  text: string;
  className?: string;
  svg?: any;
}

const LogoText: React.FC<LogoTextProps> = ({ img, text, className, svg }) => {
  return (
    <div>
      <div className="flex gap-3 items-center">
        {img && <Image src={img} alt="icon" width={24} height={24} />}
        {svg && <div>{svg}</div>}
        <Text typography="services" className={className}>
          {text}
        </Text>
      </div>
    </div>
  );
};
