import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import TodaysInspection from './MechanicFlow/Home/TodaysInspection';
import { Text } from '../ui/common/text';
import Reports from './MechanicFlow/Reports/Reports';
import OngoingReports from './MechanicFlow/Reports/OngoingInspection';
import AllNotifications from './MechanicFlow/Notifications/AllNotifications';
import UserProfile from './MechanicFlow/Profile/UserProfile';
import AccountSetting from './MechanicFlow/Profile/AccountSetting';
import MyDocument from './MechanicFlow/Profile/MyDocument';
import Support from './MechanicFlow/Profile/Support';

const Tabs = () => {
  const history = useHistory();
  const currentDir = history.location.pathname;
  console.log(currentDir);
  const tabs = [
    {
      tab: 'tab1',
      href: '/app/todaysinspection',
      title: 'Home',
      icon: '/img/tabs/home.svg',
    },
    {
      tab: 'tab2',
      href: '/app/reports',
      title: 'Reports',
      icon: '/img/tabs/health.svg',
    },
    {
      tab: 'tab3',
      href: '/app/notifications',
      title: 'Notifications',
      icon: '/img/tabs/notification.svg',
    },
    {
      tab: 'tab4',
      href: '/app/profile',
      title: 'Profile',
      icon: '/img/tabs/profile.svg',
    },
  ];

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/app/todaysinspection"
          component={TodaysInspection}
          exact={true}
        />
        <Route path="/app/reports" component={Reports} exact={true} />
        <Route
          path="/app/ongoingreports"
          component={OngoingReports}
          exact={true}
        />
        <Route
          path="/app/notifications"
          component={AllNotifications}
          exact={true}
        />
        <Route path="/app/profile" component={UserProfile} exact={true} />
        <Route
          path="/app/accountsetting"
          component={AccountSetting}
          exact={true}
        />
        <Route path="/app/documents" component={MyDocument} exact={true} />
        <Route path="/app/support" component={Support} exact={true} />
        <Route
          path="/app"
          render={() => <Redirect to="/app/todaysinspection" />}
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

export default Tabs;
