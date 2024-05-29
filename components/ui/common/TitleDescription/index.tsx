import React from 'react';
import { Text } from '../text';

interface ITitleDescription {
  heading: string;
  description?: string;
  className?: string;
}

const TitleDescription: React.FC<ITitleDescription> = ({
  heading,
  description,
  className,
}) => {
  return (
    <div className="w-full  flex flex-col gap-2 pb-4">
      <Text typography="header" className={className}>
        {heading}
      </Text>
      <Text>{description}</Text>
    </div>
  );
};

export default TitleDescription;
