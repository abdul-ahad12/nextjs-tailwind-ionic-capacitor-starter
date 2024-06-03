import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import SelectLocation from './Onboarding/SelectLocation';
import Reports from '../MechanicFlow/Reports/Reports';
import Activity from './Activity';
import AllNotifications from '../MechanicFlow/Notifications/AllNotifications';
import ProfileUser from './BookingFlow/ProfileUser';
import AccountSetting from '../MechanicFlow/Profile/AccountSetting';
import Support from '../MechanicFlow/Profile/Support';
import { Text } from '../../ui/common/text';


const TabsUser = () => {
  const history = useHistory();
  const currentDir = history.location.pathname;
  console.log(currentDir);
  const tabs = [
    {
      tab: 'tab1',
      href: '/appuser/selectlocation',
      title: 'Home',
      icon: '/img/tabs/home.svg',
    },
    {
      tab: 'tab2',
      href: '/appuser/activity',
      title: 'Activity',
      icon: '/img/tabs/health.svg',
    },
    {
      tab: 'tab3',
      href: '/appuser/notifications',
      title: 'Notifications',
      icon: '/img/tabs/notification.svg',
    },
    {
      tab: 'tab4',
      href: '/appuser/profile',
      title: 'Profile',
      icon: '/img/tabs/profile.svg',
    },
  ];

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/appuser/selectlocation"
          component={SelectLocation}
          exact={true}
        />
        <Route path="/appuser/reports" component={Reports} exact={true} />
        <Route
          path="/appuser/activity"
          component={Activity}
          exact={true}
        />
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
          console.log(currentDir, data.href);
          console.log(currentDir == data.href);
          return (
            <IonTabButton key={idx} tab={data.tab} href={data.href}>
              <div
                className={`${currentDir == data.href ? 'opacity-100':'opacity-40'} flex flex-col items-center justify-center `}
              >
                <img
                  className={``}
                  src={data.icon}
                />
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
