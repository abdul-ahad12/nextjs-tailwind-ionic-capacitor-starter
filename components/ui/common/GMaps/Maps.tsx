import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import { soothingDarkMapStyle } from './style';

interface IMapComponent {
  selectedPlace: any;
  lts?: any;
  lngs?: any;
}

const MapComponent: React.FC<IMapComponent> = ({ selectedPlace, lts, lngs }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);



  useEffect(() => {
    const createMap = async () => {
      try {
        if (mapRef.current) {
          const lat = lts
            ? lts
            : selectedPlace &&
              selectedPlace.geometry &&
              selectedPlace.geometry.location
              ? selectedPlace.geometry.location.lat()
              : -37.840935;
          const lng = lngs
            ? lngs
            : selectedPlace &&
              selectedPlace.geometry &&
              selectedPlace.geometry.location
              ? selectedPlace.geometry.location.lng()
              : 144.946457;

          const newMap = await GoogleMap.create({
            id: 'my-map',
            element: mapRef.current,
            apiKey: process.env.API_KEY_GOOGLE || '',
            config: {
              center: { lat, lng },
              zoom: selectedPlace || lts ? 16 : 6,
              disableDefaultUI: true,
              gestureHandling: 'none',
              styles: soothingDarkMapStyle,
            },
          });

          setMap(newMap);
          setMapReady(true); // Map is ready

          if (selectedPlace) {
            // Add a marker to the map if a place is selected
            markerRef.current = await newMap.addMarker({
              coordinate: { lat, lng },
              title: 'Selected Location',
            });
          }
        }
      } catch (error) {
        console.error('Error creating map:', error);
      }
    };

    createMap();
  }, [selectedPlace, lts, lngs]);

  useEffect(() => {
    if (mapReady && map && selectedPlace) {
      const addMarker = async () => {
        try {
          if (markerRef.current) {
            await markerRef.current.setMap(null); // Remove existing marker
          }
          const lat = selectedPlace.geometry.location.lat();
          const lng = selectedPlace.geometry.location.lng();
          markerRef.current = await map.addMarker({
            coordinate: { lat, lng },
            title: 'Selected Location',
          });
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      };

      addMarker();
    }
  }, [mapReady, map, selectedPlace]);

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
