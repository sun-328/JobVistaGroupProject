import React, { useEffect, useState, useRef } from 'react';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import Style from '../PanelistPage/PanelistPage.module.css';
import { Text } from '../Text/Text';
import data from './Panelist.json';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';
import { TodayOpenings } from '../TodayOpenings/TodayOpening';
import { Input } from '../Input/Input';
import { AdminMenu } from '../AdminMenu/AdminMenu';
import { UpcomingOpening } from '../PanelistPage/UpcomingOpenings';
import PieChart from '../PanelistPage/ApplicantsChart';
import LineBarPanelist from '../PanelistPage/ApplicantsGraphOPening';
import LineChartPanelist from '../PanelistPage/ApplicantsHiredYear';
import { Dashboard } from '../DashBoard/Dashboard';
import { Popup } from '../Popup/Popup';

export const PanelistPage = () => {
    const [openings, setOpenings] = useState(data);
    const [resultData, setResultData] = useState(data);
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

    const [formView, setFormView] = useState(false);

    const [selectMenu, setSelectedMenu] = useState('Dashboard');

    const selectMainMenu = (menu) => {
        setSelectedMenu(menu)
    }

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

    const openingview = (name, position, email) => {
        setOpeningView(true);
        setPanelistName(name);
        setPanelistPosition(position);
        setPanelistEmail(email);
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
            salaryRange: start + "-" + end,
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
            // credentials: 'include',
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
                if (data.status == 200) {
                    // return(
                    //   <Popup isSuccess='true' content={data.message} />
                    // )
                  }
                  else {
                    // return(
                    //   <Popup isSuccess='false' content={data.message} />
                    // )
                  }
            })
            .catch(error => {
                console.error('Error sending JSON data:', error);
            });

    }

    // useEffect(() => {
    //     fetchCallForAddingOpenings()
    // }, [addingOpeningJson])


    const addingOpening = () => {
        fetchCallForAddingOpenings()
    }
    const domain = localStorage.getItem("domain");
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
        <div id={Style.adminContainer}>
            <AdminHeader />

            <div id={Style.admin}>
                <div id={Style.menuBox}>
                    {/* <MainLogo /> */}
                    {/* <Heading id={Style.menuHead}>Main Menu</Heading> */}
                    <AdminMenu onSelect={selectMainMenu} selected={selectMenu} />
                </div>

                <div id={Style.viewBox}>
                    {selectMenu === 'Dashboard' && <Dashboard />}
                    {selectMenu === 'TodayOpenings' && <TodayOpenings />}
                    {selectMenu === 'UpcomingOpenings' && <UpcomingOpening />}
                </div>

                {/* <div>
                    <PieChart />
                   
                    <LineChartPanelist />
                </div> */}

            </div>
             {/* <LineBarPanelist /> */}
        </div>
    )

}