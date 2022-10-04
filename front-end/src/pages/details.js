import React from 'react';
import DetailsHeader from '../components/detailsHeader';
import NavBar from '../components/navBar';

export default function OrderDetails() {
  return (
    <>
      <NavBar />
      <div
        className="detailsContainer"
        style={
          {
            background: '#036b52',
            width: '100vw',
            height: '88.8vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderTop: '5vh solid white' }
        }
      >
        <DetailsHeader />
      </div>
    </>
  );
}
