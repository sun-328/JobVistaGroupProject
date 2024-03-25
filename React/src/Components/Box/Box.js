import React from 'react';
import Style from '../Box/Box.module.css';

export const Box = ({icon, title, description, props}) => {
  return (
    <div className={Style.commonStyleBox}>
      <i id={Style.icon}>{icon}</i>
      <h3 id={Style.title}>{title}</h3>
      <p id={Style.description}>{description}</p>
    </div>
  )
}
