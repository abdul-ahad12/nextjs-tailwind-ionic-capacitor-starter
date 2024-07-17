import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Button } from '../button';
import { Text } from '../text';
import { useHistory } from 'react-router';
import SwitchTabs from '../inputComponent/SwitchTabs';

interface ICustomerActivityHeader {
  children: React.ReactNode;
  BtnText?: string;
  onSubmit?: () => any;
  disabled?: boolean;
  page1?: boolean;
  setActiveState?: (state: any) => void;
  activeState?: string;
  waitingScreen?: boolean;
  approved?: boolean;
  tabs?: any;
  refresh?: boolean;
  onRefresh?: () => any;
  setActiveTab?: (state: any) => void;
  activeTab?:string
}

const CustomerActivityHeader: React.FC<ICustomerActivityHeader> = ({
  children,
  BtnText,
  onSubmit,
  disabled,
  setActiveState,
  activeState,
  waitingScreen,
  approved,
  tabs,
  refresh,
  onRefresh,
  setActiveTab,
  activeTab

}) => {
  const [isRotating, setIsRotating] = useState(false);

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

  const handleClick = () => {
    if (onRefresh) {
      onRefresh();
    }
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000); // Remove the class after the animation completes
  };

  return (
    <IonPage>
      <IonHeader id="header" collapse="fade">
        <IonToolbar>
          <div className="grid grid-cols-12">
            {' '}
            <IonTitle className="text-center font-[Silka] w-full flex mt-1  font-semibold  col-start-1 col-end-13 row-span-full">
              Activity
            </IonTitle>
            {refresh && onRefresh && (
              <div
                onClick={handleClick}
                className="col-start-11 col-end-13 row-span-full flex items-center justify-center"
              >
                <svg
                  className={isRotating ? 'rotate' : ''}
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                </svg>
              </div>
            )}
          </div>
          <div className={`shadow-xl px-5 pt-1 ${waitingScreen && 'pb-5 '}`}>
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
      <IonContent className="ion-padding">
        <div className="absolute bottom-5 w-full flex justify-center ml-[-0.5rem]">
          <SwitchTabs setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>

        {/* <div> */}
          {children}
        {/* </div> */}
      </IonContent>

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

export default CustomerActivityHeader;
