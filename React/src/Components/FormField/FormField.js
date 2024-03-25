import React, { forwardRef } from 'react';
import { Text } from '../Text/Text';
import Style from '../FormField/FormField.module.css';

export const FormField = forwardRef(({ label, type, placeholder, name, onChange, className, iconClass }, ref) => {
  return (
    <>
      <Text id={Style.text}>{label}</Text>
      <div>
        <div>
          <i className={iconClass}></i>
        </div>
        <input className={className} ref={ref} name={name} type={type} placeholder={placeholder} onChange={onChange} required />
      </div>
    </>
  )
});
