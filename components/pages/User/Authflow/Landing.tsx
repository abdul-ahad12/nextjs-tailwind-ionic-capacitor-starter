import { IonContent, IonFooter, IonPage, IonRouterLink } from '@ionic/react';
import React from 'react';
import { Button } from '../../../ui/common/button';
import ImageCarousel from '../../../ui/common/Authentication/ImageCarousel';

const LandingUser = () => {
  // const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full flex flex-col justify-center items-center">
          <img className='w-[80%]' src="/logo.jpg" />

          <ImageCarousel
            slides={[
              {
                img: '/img/auth/imagecarousel1.svg',
              },
              {
                img: '/img/auth/imagecarousel1.svg',
              },
              {
                img: '/img/auth/imagecarousel1.svg',
              },
            ]}
          />
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="flex flex-col gap-2">
          <IonRouterLink href="/loginuser" routerDirection="forward">
            {' '}
            <Button
            // onClick={() => {
            //   history.push('/login');
            // }}
            >
              Login
            </Button>
          </IonRouterLink>
          <IonRouterLink href="/signupuser" routerDirection="forward">{' '}
          <div
            
            className="w-full  text-[17px] py-[15px] rounded-primary font-bold flex justify-center border border-black text-black cursor-pointer"
          >
            Sign Up
          </div>
          </IonRouterLink>
          {/* <Button color="secondary">Sign Up</Button> */}
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default LandingUser;
