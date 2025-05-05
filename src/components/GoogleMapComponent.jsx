import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './GoogleMapComponent.scss';

const containerStyle = {
  width: '100%',
  height: '350px',
};

const center = {
  lat: 50.41950,
  lng: 30.55646,
};

const GoogleMapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBzGIy8Wif122Videic9NNx8dZ1GIFcLZs',
  });

  if (!isLoaded) {
    return <div>Map loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      className='m'
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
