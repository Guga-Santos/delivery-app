import React from 'react';
import NavBar from '../components/navBar';
import DetailsList from '../components/detailsList';
import DetailsHeader from '../components/detailsHeader';

export default function OrderDetails() {
  return (
    <>
      <NavBar />
      <div className="detailsContainer">
        <DetailsHeader />
        <DetailsList />
      </div>
    </>
  );
}
