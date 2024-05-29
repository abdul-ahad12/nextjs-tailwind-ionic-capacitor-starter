import React from 'react';
import { Personalsvg } from '../../svgs';
import { Text } from '../../text';
import { Button } from '../../button';

const Information = ({ children, className }: any) => {
  return <div className={className}>{children}</div>;
};

export default Information;

Information.logo = Personalsvg;
Information.text = Text;
Information.button = Button;
