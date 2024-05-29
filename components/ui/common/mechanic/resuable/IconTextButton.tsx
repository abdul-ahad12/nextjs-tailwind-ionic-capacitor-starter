import React from 'react';
import { Text } from '../../text';
import { Button } from '../../button';
import { RightArrowSvg } from '../../svgs';

interface IconTextButtonProps {
  icon?: React.ReactNode;
  text?: string;
  onButtonClick?: () => void;
  bgcolor?: string;
  svgcomp: any;
  labeltext?: string;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  text,
  onButtonClick,
  bgcolor,
  svgcomp,
  labeltext,
}) => {
  return (
    <div
      onClick={onButtonClick ? onButtonClick : () => console.log('click')}
      className={`flex items-center justify-between px-3 py-2  border-b border-gray-300 text-black rounded-md ${bgcolor}`}
    >
      <div className="flex items-center">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <Text className="flex text-green-400 " typography="body">
            {labeltext}
          </Text>
          {text && (
            <Text
              className="flex text-black w-fit text-[16px] font-medium"
              typography="cardsheader"
            >
              {text}
            </Text>
          )}
        </div>
      </div>
      <div>
        {onButtonClick && (
          <Button
            // onClick={onButtonClick}
            className="flex items-center  text-gray-900 bg-transparent focus:outline-none"
          >
            {svgcomp}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IconTextButton;
