import React from 'react';
import { Image } from '../ImageTag/Image';
import Style from '../MainLogo/MainLogo.module.css';

export const MainLogo = () => {
  return (
    <Image src='../../Images/Logo.png' id={Style.logo} />
  )
}
