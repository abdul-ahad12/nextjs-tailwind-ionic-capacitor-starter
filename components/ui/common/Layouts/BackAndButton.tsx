import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Button } from '../button';
import { Text } from '../text';

interface IBackAndButton {
  children: React.ReactNode;
  disabled?: boolean;
  BtnText?: string;
  HeaderRightText?: string;
  back?: boolean;
  onSubmit?: any;
  title?: string;
  href?: string;
}

const BackAndButton: React.FC<IBackAndButton> = ({
  children,
  disabled,
  BtnText,
  HeaderRightText,
  back,
  onSubmit,
  href,
  title,
}) => {
  return (
    <IonPage>
      <IonHeader className="ion-padding" collapse="fade">
        <IonToolbar>
          <div className="relative">
            {title && (
              <IonTitle className="text-center font-[Silka] absolute top-0 w-full flex items-center justify-center h-full font-semibold">
                {title}
              </IonTitle>
            )}
            <div className="flex justify-between items-center">
              {back && (
                <>
                  <IonButtons slot="start">
                    <IonBackButton />
                  </IonButtons>
                </>
              )}
              {HeaderRightText && (
                <Text className="text-tertiary underline">
                  {HeaderRightText}
                </Text>
              )}
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="h-full ">{children}</div>
      </IonContent>

      {BtnText && (
        <IonFooter className="ion-padding">
          <Button href={href} onClick={onSubmit} disabled={disabled}>
            {BtnText}
          </Button>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default BackAndButton;
