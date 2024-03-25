import React from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import Style from '../GetStarted/GetStarted.module.css';

export const GetStarted = ({id}) => {
  return (
    <Link to='/logIn'>
      <Button id={id}>Get Started <i id={Style.icon} class="fa-solid fa-arrow-right"></i></Button>
    </Link>
  )
}