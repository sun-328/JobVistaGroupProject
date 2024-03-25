import React, { useState } from 'react';

const ApplicantViewer = ({ applicants }) => {
  applicants = [
    {
      "name": "Abitha",
      "email": "abi@.com",
      "socialMediaResorse": {
        "linkedIn": "linkedIn.com/jith",
        "github": "github.com/jith"
      },
      "mobileNumber": 1234567890,
      "result": "Onhold",
      "points": 80,
      "roundOn": 1
    },
    {
      "name": "Jith",
      "email": "jith@jk.com",
      "socialMediaResorse": {
        "linkedIn": "linkedIn.com/jith",
        "github": "github.com/jith"
      },
      "mobileNumber": 1234567890,
      "result": "Onhold",
      "ReviewFromPanelist": "Good at skill talking with many people",
      "points": 80,
      "roundOn": 2
    }
  ]
  

  

//   const onHoldApplicants = applicants.filter(applicant => applicant.result === "Onhold" && applicant.roundOn === currentRound);

  

  return (
    <div>

      
      {/* <h3>On Hold Applicants:</h3>
      <ul>
        {onHoldApplicants.map((applicant, index) => (
          <li key={index}>{applicant.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ApplicantViewer;