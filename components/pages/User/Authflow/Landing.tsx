import { IonContent, IonFooter, IonPage, IonRouterLink } from '@ionic/react';
import React, { useEffect, useRef } from 'react';
import { Button } from '../../../ui/common/button';
import ImageCarousel from '../../../ui/common/Authentication/ImageCarousel';
import { gsap } from 'gsap';

const LandingUser = () => {
  // const history = useHistory();
  const logoRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const logo = logoRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;

    if (logo && content && footer) {
      const logoTl = gsap.timeline();
      const contentTl = gsap.timeline();

      logoTl
        .set(logo, {
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          position: 'fixed',
          width: '100%',
        })
        .to(logo, {
          delay: 1.5, // Wait for 3 seconds
          opacity: 1,
          duration: 0.8,
          xPercent: 0,
          yPercent: 0,
          left: '10%',
          top: '10%',
          position: 'absolute',
          ease: 'power2.out',
          width: '80%',
        });

      contentTl
        .set(content, { opacity: 0 })
        .set(footer, { opacity: 0 })
        .to([content, footer], {
          opacity: 1,
          duration: 0.5,
          stagger: 0.3,
          ease: 'power2.out',
          delay: 2,
        });

      logoTl.eventCallback('onComplete', () => {
        contentTl.play();
      });
    }
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full flex flex-col justify-center items-center">
          <img ref={logoRef} className="w-[80%]" src="/logo.jpg" />
          <div ref={contentRef}>
            <ImageCarousel
              slides={[
                {
                  img: '/img/auth/imagecarousel1.svg',
                },
                {
                  img: '/img/auth/landing1.svg',
                },
                {
                  img: '/img/auth/landing2.svg',
                },
              ]}
            />
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <div ref={footerRef} className="flex flex-col gap-2">
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
          <IonRouterLink href="/signupuser" routerDirection="forward">
            {' '}
            <div className="w-full  text-[17px] py-[15px] rounded-primary font-bold flex justify-center border border-black text-black cursor-pointer">
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
