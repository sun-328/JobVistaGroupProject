import React from 'react';
import { Image } from '../ImageTag/Image';
import Style from '../Logo/Logo.module.css';

export const Logo = (props) => {
  return (
    <Image src='../../Images/logo(1).png' id={Style.logo} />
  )
}
