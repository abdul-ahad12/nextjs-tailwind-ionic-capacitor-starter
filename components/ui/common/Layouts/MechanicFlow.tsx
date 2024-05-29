import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Button } from '../button';
import { Text } from '../text';
import { useHistory } from 'react-router';
import { tabs } from '../../../pages/MechanicFlow/Home/TodaysInspection';

interface IMechanicFlow {
  children: React.ReactNode;
  BtnText?: string;
  onSubmit?: () => any;
  disabled?: boolean;
  page1?: boolean;
  setActiveState?: (state: any) => void;
  activeState?: string;
  waitingScreen?: boolean;
  approved?:boolean;
}

const MechanicFlow: React.FC<IMechanicFlow> = ({
  children,
  BtnText,
  onSubmit,
  disabled,
  page1,
  setActiveState,
  activeState,
  waitingScreen,
  approved,
}) => {
  const name = 'Ben Williams';

  const history=useHistory()

  const topBar = [
    {
      id: 0,
      text: tabs.TODAYSINSPECTION,
    },
    {
      id: 1,
      text: tabs.SCHEDULEDINSPECTION,
    },
    {
      id: 2,
      text: tabs.INSPECTIONREQUESTS,
    },
  ];

  return (
    <IonPage>
      <IonHeader id="header" collapse="fade">
        <IonToolbar>
          <div className={`shadow-xl px-5 pt-5 ${waitingScreen && 'pb-5'}`}>
            <div className="flex gap-2">
              <img src="/img/favicon.svg" className="w-[3rem]"></img>
              <div className="flex flex-col justify-center">
                <Text className="text-secondary">Good Morning</Text>
                <div onClick={()=>{
                  history.push("/app/profile")
                }}><Text className="text-tertiary font-semibold">{name}</Text></div>
              </div>
            </div>
            {!waitingScreen && (
              <div className="grid grid-cols-3 gap-3 pt-8">
                {topBar.map(data => {
                  return (
                    <div
                      key={data.id}
                      onClick={() => {
                        if (setActiveState) {
                          setActiveState(data.text);
                        }
                      }}
                      className={`w-full text-center ${data.text === activeState && 'border-b-2'} border-black pb-5`}
                    >
                      <Text
                        className={`text-secondary ${data.text === activeState && 'font-semibold'} font-medium leading-[17px]`}
                      >
                        {data.text}
                      </Text>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>

      {approved && (
        <IonFooter className="ion-padding">
          <div>
            {BtnText && (
              <Button onClick={onSubmit} disabled={disabled}>
                {BtnText}
              </Button>
            )}
          </div>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default MechanicFlow;
