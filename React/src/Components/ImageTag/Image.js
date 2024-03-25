import React from 'react'

export const Image = (props) => {
  return (
    <img src={props.src} alt={props.alt} id={props.id} className={props.className} onClick={props.onClick}></img>
  )
}
