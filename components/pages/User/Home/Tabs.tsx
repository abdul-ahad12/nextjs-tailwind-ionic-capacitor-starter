import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import SelectLocation from './SelectLocation';
import Activity from '../Activity';
import ProfileUser from '../BookingFlow/ProfileUser';
import { Text } from '../../../ui/common/text';
import AllNotifications from './Notifications/AllNotifications';
import AccountSetting from './Profile/AccountSetting';
import Support from './Profile/Support';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { useEffect } from 'react';
import { baseURL } from '../../../../utils/definations/axios/url';
import { useStoreState } from 'pullstate';
import { AllBookingStore, REResponseBookingStore } from './store';
import { tabs } from '../../../../utils/tabs';

const TabsUser = () => {
  const history = useHistory();
  const currentDir = history.location.pathname;


  const { data: apiData, error, makeRequest } = useDynamicGetRequest();
  const { data:reData, error:reError,makeRequest:reMakeRequest } = useDynamicGetRequest();
  const storeData = useStoreState(AllBookingStore, s => s.data);
  const restoreData = useStoreState(REResponseBookingStore, s => s.data);
console.log(reData)


  useEffect(() => {
    if (storeData.data.length === 0) {
      makeRequest(`${baseURL}/booking`, 'GET');
    }
    if (restoreData.data.length === 0) {
      reMakeRequest(`${baseURL}/re-booking`, 'GET');
    }
  }, [storeData,restoreData]);

  useEffect(() => {
    if (apiData && !error) {
      AllBookingStore.update(s => {
        s.data = apiData;
      });
    }
    if (reData) {
      console.log("here in")
      REResponseBookingStore.update(s => {        
        s.data = reData;
      });
    }
  }, [apiData, error,reData,reError]);

  console.log(REResponseBookingStore.getRawState())

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/appuser/selectlocation"
          component={SelectLocation}
          exact={true}
        />
        <Route path="/appuser/activity" component={Activity} exact={true} />
        <Route
          path="/appuser/notifications"
          component={AllNotifications}
          exact={true}
        />
        <Route path="/appuser/profile" component={ProfileUser} exact={true} />
        <Route
          path="/appuser/accountsetting"
          component={AccountSetting}
          exact={true}
        />
        <Route path="/appuser/support" component={Support} exact={true} />
        <Route
          path="/appuser"
          render={() => <Redirect to="/appuser/selectlocation" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {tabs.map((data, idx) => {
          return (
            <IonTabButton key={idx} tab={data.tab} href={data.href}>
              <div
                className={`${currentDir == data.href ? 'opacity-100' : 'opacity-40'} flex flex-col items-center justify-center `}
              >
                <img className={``} src={data.icon} />
                <Text className="font-semibold text-secomdary text-small">
                  {data.title}
                </Text>
              </div>
            </IonTabButton>
          );
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsUser;
