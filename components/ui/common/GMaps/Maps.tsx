import React, { useEffect, useRef } from 'react';
import { GoogleMap } from '@capacitor/google-maps';

interface IMapComponent {
  selectedPlace: any;
  lts?: any;
  lngs?: any;
}

const MapComponent: React.FC<IMapComponent> = ({
  selectedPlace,
  lts,
  lngs,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const createMap = async () => {
      console.log('Creating map...');
      if (mapRef.current) {
        const lat = lts
          ? lts
          : selectedPlace &&
              selectedPlace.geometry &&
              selectedPlace.geometry.location
            ? selectedPlace.geometry.location.lat()
            : 0;
        const lng = lngs
          ? lngs
          : selectedPlace &&
              selectedPlace.geometry &&
              selectedPlace.geometry.location
            ? selectedPlace.geometry.location.lng()
            : 0;

        const newMap = await GoogleMap.create({
          id: 'my-map',
          element: mapRef.current,
          apiKey: 'AIzaSyDCJPkIzo1R6BvJubkeEtmtr1jKK8o_lpM',
          config: {
            center: { lat, lng },
            zoom: selectedPlace || lts ? 16 : 2, // Zoom out if no selectedPlace
            disableDefaultUI: true,
            gestureHandling: 'none',
          },
        });

        console.log('Map created:', newMap);

        if (selectedPlace) {
          // Add a marker to the map if a place is selected
          markerRef.current = await newMap.addMarker({
            coordinate: { lat, lng },
            // iconUrl:"/img/max.jpg",
            // iconSize:{
            //   width:50,
            //   height:50
            // },
            title: 'Selected Location',
          });

          console.log('Marker created:', markerRef.current);
        }
      }
    };

    createMap();
  }, [selectedPlace,lts]);

  return (
    <div
      ref={mapRef}
      className="z-20 h-screen"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

export default MapComponent;
