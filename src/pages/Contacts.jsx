import React from 'react';
import GoogleMapComponent from '../components/GoogleMapComponent';
import './Contacts.scss';

const Contacts = () => {
  return (
    <div className='contacts-container'>
      <p>You can find our office for sdress: 'Bastionnuy line, 11'</p>
      <div onClick={() => window.open(
      'https://www.google.com/maps/dir/?api=1&destination=50.41950,30.55646',
      '_blank'
    )}>
      <GoogleMapComponent />
      </div>
      <p>Contact: +39000000000</p>
      <p>Email: planEvetnts@gmail.com</p>
    </div>

  )
}

export default Contacts;