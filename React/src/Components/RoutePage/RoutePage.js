import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from '../SignUp/SignUp';
import { LandHome } from '../LandHome/LandHome';
import { HomePage } from '../HomePage/HomePage';
import { SearchJobs } from '../SearchJobs/SearchJobs';
import { Organization } from '../OrganizationForm/Organization';
import { Admin } from '../AdminPage/Admin';
import { PanelistPage } from '../PanelistPage/PanelistPage';
import ApplyForm from '../form/From';
import OpeningsToApply from '../ApplicantPage/Openings'

export const RoutePage = () => {
  return (
    <>
      <Router>
        <Routes> 
          <Route path='/' element={<LandHome />} />
          <Route path='/logIn' element={<SignUp />} />
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/searchJobs' element={<SearchJobs />}></Route>
          <Route path='/organization' element={<Organization />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/panelist' element={<PanelistPage />}></Route>
          <Route path='/applicant' element={<OpeningsToApply />}></Route>
          <Route path="/Apply/:openingId" element={<ApplyForm />} />
        </Routes>
      </Router>
    </>
  )
}