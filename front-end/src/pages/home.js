import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {
  useEffect(() => {

  });

  return (
    <Navigate to="/login" />
  );
}
