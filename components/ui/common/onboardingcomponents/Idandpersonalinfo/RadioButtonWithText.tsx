// RadioButtonWithText.tsx

import React from 'react';
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
// import './RadioButtonWithText.css'; // Import the custom CSS file

interface RadioButtonWithTextProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
}

const RadioButtonWithText: React.FC<RadioButtonWithTextProps> = ({
  options,
  selectedValue,
  onSelectionChange,
}) => {
  return (
    <IonRadioGroup
      value={selectedValue}
      onIonChange={e => onSelectionChange(e.detail.value)}
    >
      {options.map((option, index) => (
        <IonItem key={index} className="bg-white">
          <IonRadio
            slot="start"
            value={option.value}
            className="custom-radio"
          />

          <IonLabel>{option.label}</IonLabel>
        </IonItem>
      ))}
    </IonRadioGroup>
  );
};

export default RadioButtonWithText;
