import React from 'react';

export const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-2 mb-2 ${className}`}>
    {children}
  </div>
);