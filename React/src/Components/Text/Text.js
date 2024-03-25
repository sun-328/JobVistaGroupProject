import React from 'react'

export const Text = ({id, className, children, onClick}) => {
  return (
    <p onClick={onClick} id={id} className={className}>{children}</p>
  )
}
