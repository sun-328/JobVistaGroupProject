import React from 'react';

export const Heading = ({id, className, children}) => {
  return (
    <h2 id={id} className={className}>{children}</h2>
  )
}
