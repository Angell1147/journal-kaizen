import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md p-4 bg-white ${className}`}>
    {children}
  </div>
);