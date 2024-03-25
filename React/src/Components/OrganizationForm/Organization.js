import React, { useState, useContext } from 'react';
import { FormField } from '../FormField/FormField';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Organization = () => {
  console.log("error");
  const [organization, setOrganization] = useState({
    orgName: '',
    orgType: '',
    orgIn: '',
    orgEmail: '',
    orgNo: '',
  })

  const startBtn = () => {
    const orgObj = {
      name: organization.orgName,
      type: organization.orgType,
      industry: organization.orgIn,
      email: organization.orgEmail,
      number: organization.orgNo
    }
    console.log(orgObj);
  }

  return (
    <form>
      <FormField label='Organization Name' placeholder='Organization name' name='orgName' />

      <FormField label='Type Of Organization' placeholder='Organization type' name='orgType' />

      <FormField label='Industry' placeholder='Industry' name='orgIn' />

      <FormField label='Contact Email' placeholder='Contact Email' name='orgEmail' />

      <FormField label='Contact Number' placeholder='Contact Number' name='orgNo' />
      
      <Link to='/home'>
        <Button text='Start' onClick={startBtn} />
      </Link>
    </form>
  );
}
