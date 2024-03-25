import React from 'react'

export const Bold = ({children, id, className}) => {
  return (
    <b id={id} className={className}>{children}</b>
  )
}