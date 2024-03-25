import React from 'react';
import { Logo } from '../Logo/Logo';
import Style from '../LandingHeader/LandHeader.module.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { MainLogo } from '../MainLogo/MainLogo';

export const LandHeader = () => {
  return (
    <div id={Style.mainHeader}>
      <Link to='/' id={Style.logo}>
        <Logo />
      </Link>
        
      <div id={Style.btnCon}> 
        <Link to='/applicant'>
          <Button className={Style.commonStyle} id={Style.searchJobsBtn}>Search Jobs</Button>  
        </Link>

        <Link to='/logIn'>
          <Button className={Style.commonStyle} id={Style.signUp}>Register</Button>
        </Link>
      </div>
    </div>
  )
}