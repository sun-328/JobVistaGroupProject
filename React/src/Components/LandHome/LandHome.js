import React from 'react';
import { LandHeader } from '../LandingHeader/LandHeader';
import { LandSection } from '../LandingSection/LandSection';
import { LandFooter } from '../LandingFooter/LandFooter';
import Style from '../LandHome/LandHome.module.css';
import { Feature } from '../Feature/Feature';

export const LandHome = () => {
  return (
    <div id={Style.main}>
      <div id={Style.scrollContainer}>
        <div id={Style.bg}>
          <LandHeader />
          <LandSection />
        </div>
        {/* <LandFooter />
        <Feature /> */}
      </div>
    </div>
  )
}
