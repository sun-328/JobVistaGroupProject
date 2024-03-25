// import React from 'react';
import React, { useState, useEffect } from 'react';

import { json, useNavigate } from 'react-router-dom';
import './OpenigsFeild.css';
import jsdata from './tempJson.json';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import { Bold } from '../Bold/Bold';
import Style from '../ApplicantPage/OpenigsFeild.css';
import { Image } from '../ImageTag/Image';
import { Button } from '../Button/Button';

function OpeningsToApply() {
    const navigate = useNavigate();

    const [openings, setOpenings] = useState({});
    const [jsonData, setJsonData] = useState(jsdata);

    const domain = localStorage.getItem("domain");

    // var tempJson;
    const [tempJson, settempJson] = useState({});
    const [transformedData, settransformedData] = useState([]);
    // var transformedData;




    useEffect(() => {
        fetchCall()
    }, [])


    const fetchCall = () => {
        fetch(`http://${domain}/JobVista/ShowAllUpComingOpeningsServlet`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(async data => {
            const val = await data;

            // console.log(tempJson);
            if (val.Status === 'Success') {
                // setJsonData(data);
                console.log('suc');
                // tempJson = data
                settempJson(val)

                console.log('in func');
                mapppu(val)

                console.log('value', val);
            }

        }).catch(error => {
            console.log('Error fetching data:', error);

        });
    }


    // console.log(jsonData)

    const mapppu = (tempJson) => {
        let wholeData = tempJson.Value.map(item => ({
            Department: item.Department.departmentTitle,
            DepartmentId: item.Department.departmentId,
            Organization: item.Organization.orgName,
            OrgId: item.Organization.orgId,
            salaryRange: item.Opening.salaryRange,
            qualification: item.Opening.qualification,
            employmentType: item.Opening.employmentType,
            endDate: item.Opening.endDate,
            orgName: item.Organization.orgName,
            openingId:item.Opening.openingId,
            title: item.Opening.description,
            department: item.Opening.departments,
            experience: item.Opening.experience,
            date: item.Opening.startDate
        }));
        settransformedData(wholeData)
    }

    const handleRowClick = (openingId) => {


        const item = transformedData.find(item => item.openingId === openingId);


        navigate(`/Apply/${item.openingId}`, { state: { item } });
    };

    const backBtn = () => {
        navigate('/')
    }


    return (
        <div>
            <AdminHeader className='header' />

            <Button id='backBtnStyle' onClick={backBtn}>Back</Button>

            <div className="table">
                {/* <div className="row header">
                    <div className="cell">Organization</div>
                    <div className="cell">Title</div>
                    <div className="cell">Department</div>
                    <div className="cell">Salary Range</div>
                    <div className="cell">Date</div>
                    <div className="cell">Qualification</div>
                    <div className="cell">Employment Type</div>
                </div> */}
                
                {(transformedData != undefined || transformedData != null) && transformedData.map((item) => (
                    <div className="row" key={item.openingId} onClick={() => handleRowClick(item.openingId)}>
                        <div id="imgBox">
                            <Image id="openingImg" src='../../Images/headhunter (1).png' />
                        </div>

                        <div id='mainOpening'>
                            <div className="openingDetails">
                                <Bold className="cell">{item.title}</Bold><br />
                                <Bold className="cell cmnStyle"><i class="fa-solid fa-industry openingIcon"></i> {item.Organization}</Bold>
                                <div className="cell cmnStyle width">Department: {item.department}</div>
                                <div className="cell"><i class="fa-solid fa-calendar-days openingIcon"></i> Date: {item.date}</div>
                            </div>
                            <div className="openingDetails">
                                <div className="cell"><i class="fa-solid fa-hand-holding-dollar openingIcon"></i> Salary: {item.salaryRange}</div>
                                <div className="cell cmnStyle"><i class="fa-solid fa-graduation-cap openingIcon"></i> Qualification: {item.qualification}</div>
                                <div className="cell"><i class="fa-solid fa-briefcase openingIcon"></i> {item.employmentType}</div>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}

export default OpeningsToApply;
