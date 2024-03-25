import React from 'react';
// import ImageTag from '../ImageTag/Image';
import { Text } from '../Text/Text';
import Style from '../LandingSection/LandSection.module.css';
import { GetStarted } from '../GetStarted/GetStarted';
import { Link } from 'react-router-dom';
import { Heading } from '../Heading/Heading';

export const LandSection = () => {
  return (
    <div id={Style.mainSection}>

      <div id={Style.main}>
        <Heading id={Style.head}>Recruiting made simple, attract and retain talent</Heading>
        <Text id={Style.desc}>The process of finding, attracting, interviewing, selecting, hiring, and onboarding employees</Text>
        <GetStarted id={Style.getStartedBtn}></GetStarted>
      </div>

    </div>
  )
}
