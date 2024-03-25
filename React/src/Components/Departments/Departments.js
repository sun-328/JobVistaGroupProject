import React, { useEffect, useState } from 'react';
import Style from '../Departments/Departments.module.css';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { Popup } from '../Popup/Popup';


// {departmentJson[selectedDepartmentIndex].Departments}
export const Departments = () => {

  const [popupMessage, setPopupMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState('');

  const [departmentJson, setDepartmentJson] = useState([]);
  const [addingDepartmentJson, setaddingDepartmentJson] = useState([]);
  const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState(null);
  const [selectedOpeningIndex, setSelectedOpeningIndex] = useState(null);
  const [view, setView] = useState(false);
  const [applicantView, setApplicantView] = useState(false);
  const [selectedDepartmentJson, setSelectedDepartmentJson] = useState([]);
  const [formView, setformView] = useState(false);
  const [departmentValue, setdepartmentValue] = useState({
    "name": "",
    "description": ""
  });



  const viewOpeningDetails = (departmentIndex) => {
    setView(true);
    setSelectedDepartmentIndex(departmentIndex);
  }

  const viewApplicantDetails = (openingIndex) => {
    setApplicantView(true);
    setSelectedOpeningIndex(openingIndex);
    setSelectedDepartmentJson(departmentJson[selectedDepartmentIndex].openings[openingIndex].applicants);
  }

  const backBtn = () => {
    setView(false);
  }

  const openingBackBtn = () => {
    setApplicantView(false);
  }

  useEffect(() => {
    fetchCallForDepartments();
  }, []);


  const domain = localStorage.getItem("domain");

  const fetchCallForDepartments = () => {
    fetch(`http://${domain}/JobVista/AdminDashBoard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setDepartmentJson(result.message.departments);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  const fetchCallForAddingDepartments = () => {
    fetch(`http://${domain}/JobVista/AddDepartment`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify({
        "departmentValue": departmentValue,
        "userDetails": JSON.parse(localStorage.getItem('userDetails'))
      })

    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setaddingDepartmentJson(result.message);
        if (result.statusCode == 200) {
          setformView(false);
          setPopupMessage(true);
          setSuccess(true);
          setSuccessContent(result.message);
        }
        else {
          setformView(false);
          setPopupMessage(true);
          setSuccess(false);
          setSuccessContent(result.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdepartmentValue(prev => ({ ...prev, [name]: value }));
  }
  const adding = () => {
    fetchCallForAddingDepartments();
  }

  const addingDepartment = () => {
    setformView(true);
  }

  const backButton = () => {
    setformView(false);
  }

  useEffect(() => {
    fetchCallForDepartments();
  }, [addingDepartmentJson]);

  return (
    <div id={Style.applicants}>

      {!view ? (
        <div id={Style.viewContainer}>
          <div id={Style.head}>
            <Heading className={Style.title}>Departments</Heading>
            <Button id={Style.addDepartment} onClick={addingDepartment}>Add Department</Button>
          </div>

          {formView ? (
            formView && (
              <div id={Style.addDepartmentDiv}>
                <div className={Style.addDepartmentcontainer}>
                  <Text className={Style.inputText}>Department Name</Text>
                  <Input className={Style.addDepartmentInput} placeholder='Eg. Finance' onChange={handleChange} name='name' />
                </div>
                <div className={Style.addDepartmentcontainer}>
                  <Text className={Style.inputText}>Department Description</Text>
                  <textarea id={Style.txtArea} className={Style.addDepartmentInput} placeholder='Eg. Deals with financial transactions' onChange={handleChange} name='description' />
                </div>

                <div id={Style.departmentButton}>
                  <Button onClick={backButton}>Cancel</Button>
                  <Button onClick={adding}>Submit</Button>
                </div>
              </div>
            )
          ) : (
            <table>
              <thead>
                <tr className={Style.openingTr}>
                  <th>Department Name</th>
                  <th>Description</th>
                  <th id={Style.openingId}>Openings</th>
                  {popupMessage ? <Popup isSuccess={success} content={successContent} /> : ''}
                </tr>
              </thead>
              <div>
                {departmentJson.length > 0 ?
                  departmentJson.map((department, index) => (
                    <tr key={index} onClick={() => viewOpeningDetails(index)}>
                      <td className={Style.openingTd}>{department.Title}</td>
                      <td className={Style.openingTd} id={Style.textAlign}>{department.Description}</td>
                      <td className={Style.openingTd} id={Style.openingTdId}>{department.openings.length}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td>No Departments Available</td>
                    </tr>
                  )}
              </div>
            </table>
          )}



        </div>
      ) :
        (
          !applicantView ? (
            <div>
              {selectedDepartmentIndex !== null && (
                <div>
                  <div id={Style.head}>
                    <Heading className={Style.title}><i onClick={backBtn} class="fa-regular fa-circle-left"></i> Openings</Heading>

                  </div>
                  <table>

                    <thead>
                      <tr className={Style.openingTr}>
                        <th className={`${Style.commonThStyle} ${Style.common}`}>Opening Name</th>
                        <th className={Style.commonThStyle}>Experience</th>
                        <th className={Style.commonThStyle}>Qualification</th>
                        <th className={Style.commonThStyle}>Employment Type</th>
                        <th className={Style.commonThStyle}>Salary Range</th>
                        <th className={Style.commonThStyle}>Applicants</th>
                        <th className={Style.commonThStyle}>Start_Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentJson[selectedDepartmentIndex].openings.map((openings, index) => (
                        <tr key={index} onClick={() => viewApplicantDetails(index)}>
                          <td className={`${Style.commonStyle} ${Style.common}`}>{openings.Description}</td>
                          <td className={Style.commonStyle}>{openings.Experience} years</td>
                          <td className={`${Style.textId} ${Style.commonStyle}`}>{openings.Qualification}</td>
                          <td className={Style.commonStyle}>{openings.EmploymentType}</td>
                          <td className={Style.commonStyle}>{openings.SalaryRange}</td>
                          <td className={Style.commonStyle}>{openings.applicants.length}</td>
                          <td className={Style.commonStyle}>{openings.Start_Date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              {setSelectedOpeningIndex !== null && (
                <div>
                  <Heading className={Style.title}><i class="fa-regular fa-circle-left" onClick={openingBackBtn}></i> Applicants</Heading>
                  <table>
                    <div id={Style.scrollContainer}>
                      <thead>
                        <tr className={`${Style.openingTr} ${Style.mainTr}`}>
                          <th className={Style.commonTxtStyle} id={Style.thatName}>Name</th>
                          <th className={Style.commonTxtStyle}>Gender</th>
                          <th className={Style.commonTxtStyle}>Email</th>
                          <th className={Style.commonTxtStyle}>DOB</th>
                          <th className={Style.commonTxtStyle}>Phone</th>
                          <th className={Style.commonTxtStyle}>Qualification</th>
                          <th className={Style.commonTxtStyle}>Experience</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDepartmentJson.length > 0 ? (
                          selectedDepartmentJson.map((applicant, index) => (
                            <tr key={index} className={Style.mainTr}>
                              <td className={Style.commonTxtStyle} id={Style.nameText}>{applicant.Name}</td>
                              <td className={Style.commonTxtStyle} id={Style.gender}>{applicant.Gender}</td>
                              <td className={Style.commonTxtStyle} id={Style.thatEmail}>{applicant.Email}</td>
                              <td className={Style.commonTxtStyle} id={Style.dobText}>{applicant.DOB}</td>
                              <td className={`${Style.commonTxtStyle} ${Style.that}`}>{applicant.Phone}</td>
                              <td className={`${Style.textId} ${Style.commonTxtStyle}`}>{applicant.Qualification}</td>
                              <td className={`${Style.commonTxtStyle} ${Style.that}`}>{applicant.Experience}</td>
                            </tr>
                          ))) : (
                          <tr>
                            <td colSpan="7">No applicants found</td>
                          </tr>
                        )}

                      </tbody>
                    </div>
                  </table>
                </div>
              )}
            </div>
          )

        )
      }
      {/* <Popup content='Added Successfully' isSuccess={true} /> */}
      {/* <Popup content='Failed to added' isSuccess={false} /> */}
    </div>
  );
};

