import React, { useEffect, useState } from 'react';
import { Heading } from '../Heading/Heading';
import AdminBox from '../AdminBox/AdminBox';
import Style from '../DashBoard/DashBoard.module.css';
import Chart from '../BarChart/Chart';
// import BarChart from '../BarChart/BarChart';
import LineChart from '../BarChart/LineChart';
import HorizontalChart from '../BarChart/BarChart';
import CurrentOpenings from '../Openings/CurrentOpenings';
import PieChart from '../PanelistPage/ApplicantsChart';
// import TotalHire from '../BarChart/TotalHired';
import LineBarPanelist from '../PanelistPage/ApplicantsGraphOPening';
import LineChartPanelist from '../PanelistPage/ApplicantsHiredYear';
import PanelistTextPrint from '../PanelistPage/ApplicantText';

export const Dashboard = () => {

    const role = JSON.parse(localStorage.userDetails);

    const [hiredPercentage, setHiredPercentage] = useState('');
    const [hiredPersons, setHiredPersons] = useState('');
    const [openingHiredPercentage, setOpeningHiredPercentage] = useState('');
    const [openingHiredPersons, setOpeningHiredPersons] = useState('');

    const domain = localStorage.getItem("domain");
    const fetchCallForPercentage = () => {
        fetch(`http://${domain}/JobVista/Graphs`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
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
                setHiredPercentage(result.differenceInMonthByHired.percentage);
                setHiredPersons(result.differenceInMonthByHired.current);
                setOpeningHiredPercentage(result.differenceInYearByOpenings.percentage);
                setOpeningHiredPersons(result.differenceInYearByOpenings.current);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchCallForPercentage();
    }, []);



    return (
        <div id={Style.dashboardContainer}>
            <Heading id={Style.overview}>Overview</Heading>

            <div id={Style.divContainer}>
                {role.role == "admin" ? (
                    <div id={Style.forBox}>

                        <div id={Style.box}>
                            <AdminBox title='Total Hires' hireCount={hiredPersons} percentageChange={hiredPercentage} />
                            <AdminBox title='Total Openings' hireCount={openingHiredPersons} percentageChange={openingHiredPercentage} />

                        </div>
                        <div id={Style.totalHire}>
                            <Heading id={Style.hire} className={Style.fntSize}>Current Openings</Heading>
                            <CurrentOpenings />
                        </div>
                    </div>
                ) : (
                    <PanelistTextPrint />
                )
                }



                <div id={Style.opening}>
                    <Heading id={Style.currOpenings} className={Style.fntSize}>Total hire</Heading>
                    {/* <BarChart dataModels={data} /> */}
                    <div id={Style.totalHireChart}>
                        {role.role === "panelist" ? <PieChart /> : <Chart />}
                        {/* <Chart /> */}
                    </div>
                    {/* <BarChart /> */}
                    {/* <HorizontalBarChart /> */}

                </div>
            </div>

            <div id={Style.chart}>
                <div id={Style.deptHire} className={Style.shadow}>
                    <Heading className={Style.fntSize}>Department Hire</Heading>
                    {/* {role.role === "panelist" ? <LineBarPanelist /> : <HorizontalChart />} */}
                    <HorizontalChart />
                    
                </div>

                <div id={Style.monthHire} className={Style.shadow}>
                    <Heading className={Style.fntSize}>Monthly Hire</Heading>
                    <div id={Style.monthChart}>
                        <LineChart />
                        {/* {role.role === "panelist" ? <LineChartPanelist /> : <LineChart />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
