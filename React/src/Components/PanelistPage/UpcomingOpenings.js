import React, { useEffect, useState, useRef } from 'react';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import Style from '../PanelistPage/UpcomingOpenings.module.css';
// import Styles from '../PanelistPage/PanelistPage.module.css';
import { Text } from '../Text/Text';
import data from './Panelist.json';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';
import { TodayOpenings } from '../TodayOpenings/TodayOpening';
import { Input } from '../Input/Input';
import { AdminMenu } from '../AdminMenu/AdminMenu';
import "../PanelistPage/Sample.css";

export const UpcomingOpening = () => {
    const [openings, setOpenings] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [openingindex, setopeningIndex] = useState(0);
    const [openingView, setOpeningView] = useState(false);
    const [applicantView, setApplicantView] = useState(false);
    const [panelistView, setPanelistView] = useState(false);
    const [panelistDetails, setpanelistDetails] = useState({
        panelistName: '',
        panelistEmail: '',
        panelistPositionpanelistGender: '',
        panelistPosition: ''

    });
    const [panelistName, setPanelistName] = useState('');
    const [panelistPosition, setPanelistPosition] = useState('');
    const [panelistEmail, setPanelistEmail] = useState('');

    const getValue = useRef();
    const domain = localStorage.getItem("domain");
    const [formView, setFormView] = useState(false);

    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [qualification, setQualification] = useState('');
    const [department, setDepartment] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [type, setType] = useState('');
    const [testType, setTestType] = useState('');
    const [testTitle, setTestTitle] = useState('');
    const [testDate, setDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [addingOpeningJson, setaddingOpeningJson] = useState([]);

    const handleCheckboxChange = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter((selectedEmail) => selectedEmail !== email));
        }
        else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    const openingview = (name, position, email, gender) => {
        setOpeningView(true);
        setPanelistView(true);
        panelistDetails.panelistName = name;
        panelistDetails.panelistPosition = position;
        panelistDetails.panelistEmail = email;
        panelistDetails.panelistGender = gender;
    }

    const backBtn = () => {
        setFormView(false);
        setOpeningView(false);
    }

    const currDate = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth() < 10 ? '0' + (currDate.getMonth() + 1) : currDate.getMonth() + 1;
    const date = currDate.getDate() < 10 ? '0' + (currDate.getDate()) : currDate.getDate();

    const res = `${year}-${month}-${date}`;
    const interviewersArray = selectedEmails.map(email => ({ email }));

    const [departments, setDepartments] = useState([]);

    const fetchCallForDepartment = () => {
        fetch(`http://${domain}/JobVista/GetDepartments`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                return response.json();
            })
            .then(data => {
                const departmentsName = data.message.map(department => department.Title);
                setDepartments(departmentsName);
            })
            .catch(error => {
                console.log('Error fetching departments:', error);
            });
    }

    useEffect(() => {
        fetchCallForDepartment();
    }, []);
    


    const [emailOptions, setEmailOptions] = useState([]);

    const fetchCallForPanelist = () => {
        fetch(`http://${domain}/JobVista/GetPanelist`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch email options');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of panelist objects
                const emails = data.message.map(panelist => panelist.Email);
                setEmailOptions(emails);
            })
            .catch(error => {
                console.error('Error fetching email options:', error);
            });
    };

    useEffect(() => {
        fetchCallForPanelist();
    }, []);
  

    const Object = {
        opening: {
            title: title,
            experience: experience,
            qualification: qualification,
            department: department,
            salaryRange: "$" + start + "-" + "$" + end,
            type: type,
            interviewers: interviewersArray
        },
        test: {
            typeOfTest: testType,
            title: testTitle,
            date: testDate,
            duration: duration
        }
    }


    var fetchCallForAddingOpenings = () => {
        fetch(`http://${domain}/JobVista/CreateOpening`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "openingDetails": Object,
                "userDetails": JSON.parse(localStorage.getItem('userDetails'))
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send JSON data');
                }
                return response.json();
            })
            .then(data => {
                // Handle response data if needed
                backBtn();
                setaddingOpeningJson(data);
            })
            .catch(error => {
                console.error('Error sending JSON data:', error);
            });

    }




    const addingOpening = () => {
        fetchCallForAddingOpenings()
    }
    const fetchData = () => {
        var bodyval = JSON.parse(localStorage.getItem('userDetails'));
        fetch(`http://${domain}/JobVista/PanelistOpeningServlet`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 'userDetails': bodyval })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`)
                }
                return response.json();
            })
            .then((result) => {
                setOpenings(result.Value.openings);
                setResultData(result.Value);
            })
            .catch((error) => {
                console.log("Error in get openings ", error);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    const viewApplicant = () => {
        setApplicantView(true);
        setOpeningView(true);
        setPanelistView(false);
    }


    return (

        <div id={Style.mainSide} className={Style.commonStyle}>
            {formView ?
                <div id={Style.addOpening}>
                    <Heading className={Style.title}><i className="fa-regular fa-circle-left" onClick={backBtn}></i> Add Opening</Heading>
                    <div className={`${Style.perfectDiv} ${Style.flx}`}>
                        <ul className={`${Style.listing} ${Style.ulWidth1}`}>
                            <li>Title</li>
                            <li>Experience</li>
                            <li>Qualification</li>
                            <li>Department</li>
                            <li>Salary range</li>
                            <li>Type</li>
                            <li>Panelists</li>
                            <li id={Style.TestTitle}>Test</li>
                        </ul>
                        <ul className={`${Style.listing} ${Style.ulWidth2}`}>
                            <li><Input type="text" name={title} onChange={(e) => setTitle(e.target.value)} className={Style.inputSpace} /></li>
                            <li><Input type="number" name={experience} onChange={(e) => setExperience(e.target.value)} className={Style.inputSpace} /></li>
                            <li><Input type="text" name={qualification} onChange={(e) => setQualification(e.target.value)} className={Style.inputSpace} /></li>
                            <li>
                                <Input list='departmentsList' name={department} onChange={(e) => setDepartment(e.target.value)} className={Style.inputSpace} />
                                <datalist id='departmentsList'>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>{dept}</option>
                                    ))}
                                </datalist>
                            </li>
                            <li>
                                <div className={Style.flx} id={Style.dateId}>
                                    <label>Start:</label>
                                    <Input type="number" name={start} onChange={(e) => setStart(e.target.value)} className={Style.dateInput} />
                                    <label>End:</label>
                                    <Input type="number" name={end} onChange={(e) => setEnd(e.target.value)} className={Style.dateInput} />
                                </div>
                            </li>
                            <li>
                                <div id={Style.radioId}>
                                    <Input type="radio" name="type" checked={type === 'Full Time'} onChange={() => setType('Full Time')} />

                                    <label>Full Time</label>
                                    <Input type="radio" name="type" checked={type === 'Part Time'} onChange={() => setType('Part Time')} />

                                    <label>PartTime</label>
                                </div>
                            </li>
                            <li>
                                <div className={Style.selectPanelists} id={Style.checkEmail}>
                                    {emailOptions.map((email) => (
                                        <div key={email}>
                                            <input
                                                type="checkbox"
                                                id={email}
                                                value={email}
                                                checked={selectedEmails.includes(email)}
                                                onChange={() => handleCheckboxChange(email)}
                                            />
                                            <label htmlFor={email}>{email}</label>
                                        </div>
                                    ))}

                                </div>
                                {/* <br/><p>Selected Emails: {selectedEmails.join(', ')}</p> */}
                            </li>
                            <li className={Style.ulWidth2}>
                                <label>Title:</label>
                                <Input className={`${Style.space} ${Style.inputSpace}`} type="text" name={testTitle} onChange={(e) => setTestTitle(e.target.value)} /><br />
                                <label>Date:</label>
                                <Input ref={getValue} className={`${Style.space} ${Style.inputSpace}`} type="date" name={testDate} onChange={(e) => setDate(e.target.value)} /><br />
                                <label>Duration(min):</label>
                                <Input className={`${Style.space} ${Style.inputSpace}`} type="number" id="durationMinutes" min="0" max="59" name={duration} onChange={(e) => setDuration(e.target.value)} /><br />
                                <label>Type of test: </label>
                                <Input className={`${Style.space} ${Style.inputSpace}`} list='testTypes' name={testType} onChange={(e) => setTestType(e.target.value)} />
                                <datalist id='testTypes'>
                                    <option value='FaceToFace' />
                                    <option value='Written' />
                                </datalist>
                            </li>
                        </ul>

                    </div>
                    <div className={`${Style.flx} ${Style.CancelOrSubmit}`} id={Style.submitId}>
                        <Button id={Style.CancelAddPanelist} onClick={backBtn}>Cancel</Button>
                        <Button onClick={addingOpening}>Submit</Button>
                    </div>
                </div>
                :
                (!openingView ?
                    <div id='view'>
                        <div className={Style.flx} id="openingDiv">
                            <Heading id={Style.upOpenings}>Upcoming Openings</Heading>
                            <Button id={Style.openingBtn} className="butAdd" onClick={() => setFormView(true)}>Add Opening</Button>
                        </div>
                        {openings.length === 0 ? (
                            <Text>No Openings Available</Text>
                        ) : (
                            <table>
                                <thead>
                                    <tr className="openingContainer">
                                        <th className={Style.thId}>Opening</th>
                                        <th className={Style.thId}>Test</th>
                                        <th className={Style.thId}>Date</th>
                                        <th className={Style.thId}>Applicants</th>
                                    </tr>
                                </thead>
                                <tbody className={Style.tbodyId}>
                                    {openings.map((opening, openingIndex) => {
                                        if (opening && opening.startDate) {
                                            const startingDate = new Date(opening.startDate);
                                            if (startingDate >= currDate) {
                                                return (
                                                    <tr className="openingContainer" key={openingIndex}>
                                                        <td className="nameClass" onClick={() => openingview(opening.Panelist.panelistName, opening.Panelist.panelistPosition, opening.Panelist.panelistEmail, opening.Panelist.panelistGender)}>{opening.description}</td>
                                                        {opening.test && opening.test.length > 0 ? (
                                                            <React.Fragment>
                                                                <td className={Style.tdId} onClick={() => openingview(opening.Panelist.panelistName, opening.Panelist.panelistPosition, opening.Panelist.panelistEmail, opening.Panelist.panelistGender)}>{opening.test[0].testTitle}</td>
                                                                <td className="dateClass" onClick={() => openingview(opening.Panelist.panelistName, opening.Panelist.panelistPosition, opening.Panelist.panelistEmail, opening.Panelist.panelistGender)}>{opening.test[0].testDate}</td>
                                                                <td className={Style.tdId} id='but'><Button id="viewbuttonId" onClick={() => { viewApplicant(); setopeningIndex(openingIndex); }}>View Applicants</Button></td>

                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                            </React.Fragment>
                                                        )}
                                                    </tr>
                                                )
                                            } else {
                                                return null;
                                            }
                                        } else {
                                            return null;
                                        }
                                    })}
                                </tbody>
                            </table>
                        )}

                    </div>
                    
                    : panelistView && openingView ? (
                        
                        <div id={Style.rightSide} className={Style.commonStyle}>
                            <div id={Style.todayOpenings} className={Style.common}>
                                <Button onClick={backBtn} id={Style.backBtn}><i class="fa-solid fa-chevron-left"></i></Button>
                                <table>
                                    <tr>
                                        
                                        <th>Panelist Name</th>
                                        <th>Panelist Position</th>
                                        <th>Panelist Email</th>
                                        <th>Panelist Gender</th>
                                    </tr>
                                    <tr>
                                        <td>{panelistDetails.panelistName}</td>
                                        <td>{panelistDetails.panelistPosition}</td>
                                        <td>{panelistDetails.panelistEmail}</td>
                                        <td>{panelistDetails.panelistGender}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    ) : applicantView && openingView ? (
                        <div id={Style.rightSide} className={Style.commonStyle}>
                            <div id="mainView">
                                <div className="upComingDiv">
                                <Button onClick={backBtn} id={Style.backBtn} className="outBut"><i class="fa-solid fa-chevron-left"></i></Button>
                                <Heading id="openingHeading">Upcoming Openings</Heading>
                                </div>
                                
                                <table id={Style.table}>
                                    <thead>
                                        <tr className="trClass">
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th className={Style.jobSeekerGender}>Gender</th>
                                            <th>DOB</th>
                                            <th>Qualification</th>
                                            <th className={Style.phone}>Phone</th>
                                            <th className={Style.experience}>Experience</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {openings[openingindex].applicants[0] && openings[openingindex].applicants[0].length > 0 ? ( */}
                                        {openings[openingindex].applicants && openings[openingindex].applicants.length > 0 ? (
                                            openings[openingindex].applicants.map((applicant, index) => (
                                                <tr key={index} className="trClass">
                                                    <td className={Style.jobSeekerName}>{applicant.jobSeekerName}</td>
                                                    <td>{applicant.jobSeekerEmail}</td>
                                                    <td className={Style.jobSeekerGender}>{applicant.jobSeekerGender}</td>
                                                    <td className={Style.jobSeekerDOB} id="genderId">{applicant.jobSeekerDOB}</td>
                                                    <td className={Style.jobSeekerQualification} id="appliId">{applicant.jobSeekerQualification}</td>
                                                    <td className={Style.phone}>{applicant.jobSeekerPhone}</td>
                                                    <td className={Style.experience}>{applicant.jobSeekerExperience}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">No Applicants</td>
                                            </tr>
                                        )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null)}
        </div>
    )

}