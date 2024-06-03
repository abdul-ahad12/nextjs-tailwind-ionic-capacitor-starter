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

  const soothingDarkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#0e0e0e',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];

  useEffect(() => {
    const createMap = async () => {
      // console.log('Creating map...');
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
          apiKey: 'AIzaSyDCJPkIzo1R6BvJubkeEtmtr1jKK8o_lpM',
          config: {
            center: { lat, lng },
            zoom: selectedPlace || lts ? 16 : 6,
            disableDefaultUI: true,
            gestureHandling: 'none',
            styles: soothingDarkMapStyle,
          },
        });

        // console.log('Map created:', newMap);

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

          // console.log('Marker created:', markerRef.current);
        }
      }
    };

    createMap();
  }, [selectedPlace, lts]);

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
