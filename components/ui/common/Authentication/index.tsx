import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import TitleDescription from '../TitleDescription';
import { Button } from '../button';
import InputComponent from '../InputComponent';
import { Text } from '../text';
import { useHistory } from 'react-router';

interface IAuthentication {
  login?: boolean;
  resend?: boolean;
  phoneNumber?: string;
  setPhoneNumber?: (state: string) => void;
  onSubmit?: () => void;
  isPending?: boolean;
  user?: boolean;
}

const Authentication: React.FC<IAuthentication> = ({
  login,
  resend,
  setPhoneNumber = () => {}, // Default function provided here
  phoneNumber = '',
  onSubmit,
  isPending,
  user,
}) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    // history.push('/otp');
  };

  // Determine if the button should be disabled based on the length of the phone number
  const disabled = phoneNumber.length < 10;

  return (
    <IonPage>
      <IonHeader className="ion-padding" collapse="fade">
        <IonToolbar>
          <div className="relative">
            <div className="flex justify-between items-center">
              <IonButtons slot="start">
                <IonBackButton />
              </IonButtons>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
       
        <div className="h-full flex justify-center flex-col">
          <TitleDescription
            heading={
              login
                ? "Let's log you in"
                : resend
                  ? 'Resend Code'
                  : 'Create an account'
            }
            description={
              login
                ? "Welcome back You've been missed!"
                : resend
                  ? 'Please check your mobile number'
                  : 'Create your new account for more services'
            }
          />
          <div className="py-[2rem]">
            <InputComponent
              type="number"
              text={'Phone Number'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
            />
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="flex flex-col mb-[2rem] gap-3">
          <Button onClick={onSubmit} disabled={disabled}>
            {isPending
              ? 'Loading...'
              : login
                ? 'Login'
                : resend
                  ? 'Resend Code'
                  : 'Sign Up'}
          </Button>
          {/* </IonRouterLink> */}
          <div className="flex justify-between items-center gap-5">
            <div className="w-full h-[2px] bg-[#00000026]" />
            <Text>OR</Text>
            <div className="w-full h-[2px] bg-[#00000026]" />
          </div>
          <div className="flex justify-center gap-1 items-center">
            <Text>Dont Have an Account ?</Text>
            <div
              onClick={() => {
                history.replace(
                  login
                    ? user
                      ? '/signupuser'
                      : '/signup'
                    : user
                      ? '/loginuser'
                      : '/login',
                );
              }}
              className="text-small text-tertiary"
            >
              {login ? 'Create' : 'Login'}
            </div>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Authentication;
