import React, { useEffect, useState } from 'react';
import Style from '../Openings/Openings.module.css';
import { Heading } from '../Heading/Heading';

export const Openings = () => {
  const [openingsJson, setOpeningsJson] = useState([]);
  const [selectedOpeningIndex, setSelectedOpeningIndex] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);
  const domain = localStorage.getItem("domain");
  const fetchCallForOpenings = () => {
    fetch(`http://${domain}/JobVista/GetOpenings`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/JSON'
      },
      // body: JSON.stringify({ 'userDetails': { "Org_Id": 1, "Admin_Id": 1, "role": "Admin" } })
      body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })

    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setOpeningsJson(result.Value);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }



  useEffect(() => {
    fetchCallForOpenings();
  }, []);

  const handleOpeningClick = (index) => {
    setSelectedOpeningIndex(index);
    setViewDetails(true);
  }

  const handleTestClick = () => {
    setShowApplicants(true);
  }

  const handleBackClick = () => {
    setShowApplicants(false);
  }

  return (
    <div>
      {!viewDetails && openingsJson && (
        // <div id={Style.applicants}>
        //   <Heading>Openings</Heading>
        //   <div className={Style.OpId}>
        //   <table className={Style.OpId}>
        //     <thead>
        //       <tr className={`${Style.openingTr} ${Style.mainTrs}`}>
        //         <th className={Style.commonStyle}>Opening Name</th>
        //         <th className={Style.commonStyle}>Qualification</th>
        //         <th className={Style.commonStyle}>Experience</th>
        //         <th className={Style.commonStyle}>Employment Type</th>
        //         <th className={Style.commonStyle}>Salary Range</th>
        //         <th className={Style.commonStyle}>Start Date</th>
        //         {/* <th className={Style.commonStyle}>End Date</th> */}
        //         <th className={Style.commonStyle}>Department Name</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //     <div className={Style.containerScroll}>
        //       {openingsJson.length > 0 ?
        //       openingsJson.map((item, index) => (
        //         <tr key={index} onClick={() => handleOpeningClick(index)} className={Style.mainTrs} id={Style.parent}>
        //           <td className={Style.commonStyle}>{item.Opening.description}</td>
        //           <td className={Style.commonStyle} id={Style.qualificationId}>{item.Opening.qualification}</td>
        //           <td className={Style.commonStyle}>{item.Opening.experience}</td>
        //           <td className={Style.commonStyle}>{item.Opening.employmentType}</td>
        //           <td className={Style.commonStyle}>{item.Opening.salaryRange}</td>
        //           <td className={Style.commonStyle}>{item.Opening.startDate}</td>
        //           {/* <td className={Style.commonStyle}>{item.Opening.endDate}</td> */}
        //           <td className={Style.commonStyle}>{item.Opening.departments}</td>
        //         </tr>
        //       )) : (
        //         <tr>
        //           <td>No Openings Available</td>
        //         </tr>
        //       )}
        //     </div>
        //     </tbody>

        //   </table>
        //   </div>

        // </div>


        <div id={Style.applicants}>
          <Heading>Openings</Heading>
          <div className={Style.OpId}>
            <table className={Style.OpId}>
              <thead>
                <tr className={`${Style.openingTr} ${Style.mainTrs}`}>
                  <th className={Style.commonStyle}>Opening Name</th>
                  <th className={Style.commonStyle}>Qualification</th>
                  <th className={Style.commonStyle}>Experience</th>
                  <th className={Style.commonStyle}>Employment Type</th>
                  <th className={Style.commonStyle}>Salary Range</th>
                  <th className={Style.commonStyle}>Start Date</th>
                  <th className={Style.commonStyle}>Department Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={Style.commonScrollContainer} style={{ maxHeight: '700px', overflowY: 'scroll', width: '100%' }}>
                    <div id={Style.containerScroll}>
                      {openingsJson.length > 0 ? (
                        openingsJson.map((item, index) => (
                          <div key={index} onClick={() => handleOpeningClick(index)} className={Style.mainTrs} id={Style.parent}>
                            <div className={Style.commonStyle}>{item.Opening.description}</div>
                            <div className={Style.commonStyle} id={Style.qualificationId}>{item.Opening.qualification}</div>
                            <div className={Style.commonStyle}>{item.Opening.experience}</div>
                            <div className={Style.commonStyle}>{item.Opening.employmentType}</div>
                            <div className={Style.commonStyle}>{item.Opening.salaryRange}</div>
                            <div className={Style.commonStyle}>{item.Opening.startDate}</div>
                            <div className={Style.commonStyle}>{item.Opening.departments}</div>
                          </div>
                        ))
                      ) : (
                        <div>No Openings Available</div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      )}

      {viewDetails && selectedOpeningIndex !== null && !showApplicants && (
        <div id={Style.openingId}>
          <div className={Style.applicantDiv}>
            <Heading className={Style.title}>
              <i onClick={() => setViewDetails(false)} className="fa-regular fa-circle-left"></i>Tests
            </Heading>
            <table>
              <thead>
                <tr className={Style.openingTrTest}>
                  <th className={Style.commonStyle}>Test Title</th>
                  <th className={Style.commonStyle}>Date</th>
                  <th className={Style.commonStyle}>Duration</th>
                </tr>
              </thead>
              <tbody>

                {openingsJson[selectedOpeningIndex].Tests && openingsJson[selectedOpeningIndex].Tests.length > 0 ? (
                  openingsJson[selectedOpeningIndex].Tests.map((test, index) => (
                    <tr key={index} onClick={handleTestClick} className={Style.openingTrTest} id={Style.check}>
                      <td className={Style.commonStyle}>{test.testTitle}</td>
                      <td className={Style.commonStyle}>{test.testDate}</td>
                      <td className={Style.commonStyle}>{test.testDuration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td onClick={handleTestClick} colSpan="3">No tests available</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
          <div className={Style.applicantDiv}>
            <Heading className={Style.title}>
              Panelists
            </Heading>
            <table>
              <thead>
                <tr className={`${Style.openingTr} ${Style.openTr}`}>
                  <th className={Style.commonTr}>Name</th>
                  <th className={Style.commonTr}>Email</th>
                  <th className={`${Style.commonTr} ${Style.positionTr}`}>Position</th>
                  <th className={Style.commonTr}>Gender</th>
                </tr>
              </thead>
              <tbody>

                {openingsJson[selectedOpeningIndex].PanelistsinOpening.length > 0 ? (
                  openingsJson[selectedOpeningIndex].PanelistsinOpening.map((panelist, index) => (
                    <tr className={Style.panelistTr} key={index}>
                      <td className={Style.commonTr}>{panelist.panelistName}</td>
                      <td className={Style.commonTr}>{panelist.panelistEmail}</td>
                      <td className={`${Style.commonTr} ${Style.positionTr}`}>{panelist.panelistPosition}</td>
                      <td className={Style.commonTr}>{panelist.panelistGender}</td>
                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Panelists Found</td>
                  </tr>
                )}


              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewDetails && selectedOpeningIndex !== null && showApplicants && (
    
        <div>
          <div id={Style.applicantDiv}>
            <Heading className={Style.title}>
              <i onClick={handleBackClick} className="fa-regular fa-circle-left"></i>Applicants
            </Heading>
          </div>
          <div className={Style.tableContainer}>
            <table>
              <thead>
                <tr className={Style.openingTrAppli}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Qualification</th>
                  <th>Phone</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody className={Style.scrollableBody}>
                <td className={Style.commonScrollContainer} style={{ maxHeight: '700px', overflowY: 'scroll', width: '100%' }}>
                  <div>
                    {openingsJson[selectedOpeningIndex].Applicants.length > 0 ? (
                      openingsJson[selectedOpeningIndex].Applicants.map((applicant, index) => (
                        <tr key={index} className={Style.openingTrAppli}>
                          <td className={Style.commonStyle}>{applicant.jobSeekerName}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerEmail}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerGender}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerDOB}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerQualification}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerPhone}</td>
                          <td className={Style.commonStyle}>{applicant.jobSeekerExperience}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No applicants</td>
                      </tr>
                    )}
                  </div>
                </td>
              </tbody>
            </table>
          </div>
        </div>

      )}

    </div>
  );
}
