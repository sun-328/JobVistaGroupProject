import React, { useContext } from 'react';
import { Error } from '../ErrorPage/Error';
import Style from '../HomePage/HomePage.module.css';

export const HomePage = () => {
  return (
    <div id={Style.homeContainer}>
      <Error />
    </div>
  )
}
