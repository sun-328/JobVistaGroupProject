import React from 'react'

export const Input = (props) => {
  return (
    <input list={props.list} ref={props.ref} name={props.name} checked={props.checked} onChange={props.onChange} type={props.type} placeholder={props.placeholder} id={props.id} className={props.className} required={props.required}></input>
  )
}
