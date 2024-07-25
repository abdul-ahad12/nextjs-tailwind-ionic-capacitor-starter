import { IonFooter, IonModal } from '@ionic/react';
import React from 'react';
import { Text } from './text';
import { Button } from './button';
import { GreenTick } from './svgs';

interface IModal {
  ref?: any;
  trigger?: string;
  initialBreakpoint?: number;
  breakpoints?: number[];
  title: string;
  btnText?: string;
  children: React.ReactNode;
  onSubmit?: (state?: any) => any;
  isOpen?: boolean;
  placed?: boolean;
  searching?: boolean;
  disabled?: boolean;
  onDidDismiss?: () => void; // Add onDidDismiss prop
}

const Modal: React.FC<IModal> = ({
  ref,
  trigger,
  title,
  btnText,
  children,
  onSubmit,
  isOpen,
  searching,
  placed,
  disabled,
  onDidDismiss, // Add onDidDismiss prop
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      ref={ref}
      trigger={trigger}
      initialBreakpoint={1}
      breakpoints={searching ? [0.2, 1] : [0, 1]}
      className="rounded-xl"
      backdropDismiss={false}
      onDidDismiss={onDidDismiss} // Use onDidDismiss prop
    >
      <div className="flex w-full pt-12 pb-5 flex-col justify-between items-center px-[1rem] h-full overflow-scroll">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="flex gap-3 items-center justify-center w-full">
            {placed && <GreenTick />}
            <Text typography="modalHeader">{title}</Text>
          </div>
          {children}
        </div>
        {btnText && (
          <IonFooter>
            <Button disabled={disabled} onClick={onSubmit}>
              {btnText}
            </Button>
          </IonFooter>
        )}
      </div>
    </IonModal>
  );
};

export default Modal;
