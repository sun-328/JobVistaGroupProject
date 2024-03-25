import React, { useState, useEffect, useRef } from "react";
import data from './Openings.json';
import { Text } from "../Text/Text";
import Style from '../TodayOpenings/TodayOpenings.module.css';
import { Image } from "../ImageTag/Image";
import { Heading } from "../Heading/Heading";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";

export const TodayOpenings = () => {

    const [popupMessage, setPopupMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successContent, setSuccessContent] = useState('');

    const getPoints = useRef();
    const getStatus = useRef();
    const getTitle = useRef();
    const getDate = useRef();
    const getType = useRef();
    const getDuration = useRef();

    const [openingsJson, setOpeningsJson] = useState([]);
    const [selectOpening, setSelectOpening] = useState(-1);
    const [profile, setProfile] = useState(false);
    const [applicant, setApplicant] = useState([]);
    const [selectOption, setSelectOption] = useState(null);
    const [currentRound, setCurrentRound] = useState(1);
    const [maxRound, setMaxRound] = useState(1);
    const StatusRef = useRef();
    const [showPoints, setShowPoints] = useState(false);
    const [testId, setTestId] = useState(-1);
    const [openingId, setOpeningId] = useState(-1);
    const [applicantId, setApplicantId] = useState(-1);
    const [panelistId, setPanelistId] = useState(-1);
    const [name, setName] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const domain = localStorage.getItem("domain");
    // const [currentJson, setCurrentJson] = useState(null);
    const [roundView2, setRoundView2] = useState(false);
    const [currentTestJson, setCurrentTestJson] = useState(null);
    const [showApplicantsDet, setShowApplicantsDet] = useState(false);
    const [currApplicant, setCurrentApplicant] = useState({
        "testId": '',
        "applicantId": '',
        "points": '',
        "status": ''
    });
    const [newTest, setNewTest] = useState({
        "title": '',
        "date": '',
        "type": '',
        "duration": '',
        "openingId": ''
    })

    const [openingName, setOpeningName] = useState('');

    const [status, setStatus] = useState('');
    const [type, setType] = useState('');



    const currentDate = new Date("2024-03-10");
    const currYear = currentDate.getFullYear();
    const currMonth = currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    const currDate = currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : currentDate.getDate();
    const formatDate = `${currYear}-${currMonth}-${currDate}`;

    const viewProfile = (applicant) => {
        setProfile(true);
        setApplicant(applicant);
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }




    useEffect(() => {

        openingsJson.map((ele, ind) => {
            ele.test.map((testing, index) => {
                if (testing.testDate === formatDate && ele.description === selectedValue) {
                    setSelectOpening(ind);
                    return;
                }

            })
        })


    }, [selectedValue, openingsJson, selectOpening])

    const fetchData = () => {
        fetch(`http://${domain}/JobVista/PanelistOpeningServlet`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`)
                }

                return response.json();
            })
            .then((result) => {
                setOpeningName(result.Value.openings.description);
                setOpeningsJson(result.Value.openings);

            })
            .catch((error) => {
                console.log("Error in get openings ", error);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])



    const fetchCallForSettingPoints = () => {
        fetch(`http://${domain}/JobVista/InterviewerSetMarksServlet`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify(currApplicant, { 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {

                if (result.status == "success") {
                    alert(result.message);
                    setShowPoints(false);
                    setShowApplicantsDet(false);
                }
                else {
                    alert(result.message);
                }
                setSelectOption('');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }



    useEffect(() => {
        if (selectOpening >= 0) {

            openingsJson[selectOpening].test.forEach((sampleTest) => {
                if (sampleTest.templateRoundOn > maxRound) {
                    setMaxRound(sampleTest.templateRoundOn);
                }

                setOpeningId(openingsJson[selectOpening].openingId);
                setPanelistId(openingsJson[selectOpening].Panelist.panelistId);
            });


        }
    }, [selectOpening, openingsJson, maxRound]);

    let style;



    const handleNextRound = () => {
        if (currentRound + 1 <= maxRound) {
            setCurrentRound(currentRound + 1);
            if (selectOpening >= 0) {
                openingsJson[selectOpening].test.forEach((sampleTest) => {
                    if (sampleTest.templateRoundOn === currentRound) {
                        // if(sampleTest.templateRoundOn === currentRound){
                        setCurrentTestJson(sampleTest.applicants);
                        // setTestId(sampleTest.testId);
                        return;

                    }

                    if (currentRound + 1 == sampleTest.templateRoundOn) {
                        setTestId(sampleTest.testId);
                        return;
                    }
                });
            }
        }
    };


    const handlePreviousRound = () => {
        if (currentRound > 1) {
            setCurrentRound(currentRound - 1);

        }
    };




    const handleInput = (event) => {
        event.target.textContent = event.target.textContent.replace(/\D/g, '');

    }

    const setPoints = (e) => {
        setShowApplicantsDet(true);
        setShowPoints(true);
    }

    const handleChangePoints = (e) => {
        const { name, value } = e.target;
        setCurrentApplicant(prev => ({ ...prev, [name]: value }));
    }
    const settingPoints = () => {
        currApplicant.points = getPoints.current.value;
        currApplicant.status = getStatus.current.value;
        fetchCallForSettingPoints();
    }

    const changeRound = () => {
        setShowApplicantsDet(true);
        setRoundView2(true);

    }
    const handle = (id, name) => {
        currApplicant.applicantId = id;
        currApplicant.testId = testId;
        setName(name);
    }

    const addingRound = () => {
        const title = getTitle.current.value;
        newTest.title = getTitle.current.value;
        newTest.date = getDate.current.value;
        newTest.type = getType.current.value;
        newTest.duration = getDuration.current.value;
        newTest.openingId = openingId;
        const currentPanelistId = JSON.parse(localStorage.userDetails);
        if (panelistId === currentPanelistId.Panelist_Id) {
            fetchCallForAddingTest();
        }
        else {
            setPopupMessage(true);
            setSuccess(false);
            setSuccessContent("You can't add test");
            setRoundView2(false);
        }


    }

    const cancelRound = () => {
        setShowApplicantsDet(false);
        setRoundView2(false);
    }

    const fetchCallForAddingTest = () => {
        fetch(`http://${domain}/JobVista/AddTestToOpening`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify(newTest, { 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setRoundView2(false);
                if (result.status == "success") {
                    // setRoundView2(false);
                    setPopupMessage(true);
                    setSuccess(true);
                    setSuccessContent(result.message);
                }
                else {
                    // setRoundView2(false);
                    setPopupMessage(true);
                    setSuccess(false);
                    setSuccessContent(result.message);
                }
                setSelectOption('');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const cancel = () => {
        setShowPoints(false);
        setShowApplicantsDet(false);
    }



    return (
        <div id={Style.main}>
            <div id={Style.mainDiv}>
                <select id={Style.select} value={selectedValue} onChange={handleChange}>
                    {openingsJson.length > 0 && openingsJson.map((opening, index) => (
                        opening.test.map((sampleTest, ind) => (
                            sampleTest.testDate === formatDate && (

                                <React.Fragment key={ind}>
                                    <option value={opening.description}>{opening.description}</option>
                                </React.Fragment>
                            )
                        ))
                    ))}
                </select>
                <i class="fa-solid fa-square-plus" id={Style.plusIcon} onClick={changeRound}></i>
            </div>


            {roundView2 && (
                <div id={Style.addRound2}>
                    <div id={Style.addContainer}>
                        <div className={Style.addDiv}>
                            <p className={Style.commonText}>Test Name</p>
                            <p className={Style.commonText}>Date</p>
                            <p className={Style.commonText}>Test Duration</p>
                            <p className={Style.commonText}>Test Type</p>
                        </div>
                        <div className={Style.addDiv}>
                            <input ref={getTitle} type="text" name="title" className={`${Style.inputDiv} ${Style.commonText}`} />
                            <input ref={getDate} type="date" name="date" className={`${Style.inputDiv} ${Style.commonText}`} />
                            <input ref={getDuration} type="number" name="duration" className={`${Style.inputDiv} ${Style.commonText}`} />
                            <input ref={getType} className={`${Style.space} ${Style.inputDiv} ${Style.commonText}`} list='result' name={type} />
                            <datalist id='result'>
                                <option value='Written' />
                                <option value='FaceToFace' />
                            </datalist>
                        </div>
                    </div>
                    <div id={Style.butContainer}>
                        <button onClick={cancelRound} className={Style.cancelBut}>Cancel</button>
                        <button onClick={addingRound}>Add</button>
                    </div>
                </div>
            )
            }
            {popupMessage ? <Popup isSuccess={success} content={successContent} /> : ''}
            {showPoints && (
                <div className={Style.givePoints}>
                    <Heading>Name: </Heading> <Text>{name}</Text>
                    <Heading>Points: </Heading>
                    <input ref={getPoints} type="number" name="points" />
                    <input ref={getStatus} className={Style.space} list='result' name={status} />
                    <datalist id='result'>
                        <option value='Selected' />
                        <option value='Onhold' />
                        <option value='Rejected' />
                    </datalist>
                    <button onClick={cancel} className={Style.cancelBut}>Cancel</button>
                    <button onClick={settingPoints}>Submit</button>
                </div>
            )}

            {!showApplicantsDet && selectOpening !== null && (
                <div id={Style.scrollContainer}>


                    <div id={Style.level}>
                        <i id={style} className="fa-solid fa-chevron-left" onClick={handlePreviousRound} disabled={currentRound === 1}></i>
                        <Text>

                            Round {currentRound}

                        </Text>
                        <i id={style} className="fa-solid fa-chevron-right" onClick={handleNextRound}></i>

                    </div>

                    <table id={Style.tabletag}>

                        <tr className={`${Style.trTag} ${Style.jobSeekerTr}`}>
                            <th className={Style.jobSeekerName}>Name</th>
                            <th id={Style.jobSeekerEmailId}>Email</th>
                            <th className={Style.jobSeekerDOB}>DOB</th>
                            <th className={Style.jobSeekerGender}>Gender</th>
                            <th className={Style.jobSeekerExperience}>Experience</th>
                        </tr>

                        {currentRound === 1 && selectOpening >= 0 && openingsJson[selectOpening].applicants.length > 0 && (
                            openingsJson[selectOpening].applicants.map((sampleTest, ind) => (

                                <tr key={ind} onClick={() => { setPoints(); handle(sampleTest.Applicant_Id, sampleTest.jobSeekerName); }} className={Style.jobSeekerTr}>

                                    <td className={Style.jobSeekerName}>{sampleTest.jobSeekerName}</td>
                                    <td className={Style.jobSeekerEmail}>{sampleTest.jobSeekerEmail}</td>
                                    <td className={Style.jobSeekerDOB}>{sampleTest.jobSeekerDOB}</td>
                                    <td className={Style.jobSeekerGender}>{sampleTest.jobSeekerGender}</td>
                                    <td className={Style.jobSeekerExperience}>{sampleTest.jobSeekerExperience}</td>
                                </tr>


                            )))
                            // : (
                            //     <tr>
                            //         <td>No Applicants</td>
                            //     </tr>
                            // )

                        }

                        {currentRound > 1 && selectOpening >= 0 && currentTestJson && currentTestJson[0]?.length > 0 && (
                            currentTestJson[0].map((currTest, ind) => {
                                if (currTest.Status === "Onhold") {
                                    return (
                                        <tr key={ind} onClick={() => { setPoints(); handle(currTest.Applicant_Id, currTest.Name); }} className={`${Style.hover} ${Style.jobSeekerTr}`}>
                                            <td className={Style.jobSeekerName}>{currTest.Name}</td>
                                            <td className={Style.jobSeekerEmail}>{currTest.Email}</td>
                                            <td className={Style.jobSeekerDOB}>{currTest.DOB}</td>
                                            <td className={Style.jobSeekerGender}>{currTest.Gender}</td>
                                            <td className={Style.jobSeekerExperience}>{currTest.Experience}</td>
                                            <td className={Style.icon}><i onClick={() => viewProfile(currTest.Name)} id={Style.icon} className="fa-solid fa-circle-info"></i></td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        )
                        }
                        {currentRound > 1 && selectOpening >= 0 && !currentTestJson && currentTestJson[0]?.length === 0 && (
                            <tr>
                                <td colSpan='6'>No Rounds Available</td>
                            </tr>
                        )}


                    </table>
                </div>
            )}

            {profile && (
                <div id={Style.viewProfile}>
                    <i className="fa-solid fa-circle-xmark" onClick={() => setProfile(false)} id={Style.crossBtn}></i>
                    <Image id={Style.img} src='../../Images/user.png' />

                    <Heading id={Style.name}>{applicant.Name} - <Text id={Style.email}>{applicant.Email}</Text></Heading>
                    <Text className={Style.fntSize}>Contact - {applicant.Phone}</Text>
                    {/* <ul>
                        <li className={Style.fontSize}>Social Media Resources: </li>
                        {Object.entries(applicant.socialMediaResorse).map(([key, value]) => (
                            <li className={Style.fntSize} key={key}>{key}: {value}</li>
                        ))}
                    </ul> */}
                </div>
            )}





        </div>
    );

}
