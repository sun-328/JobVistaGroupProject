import React, { useState, useEffect } from "react";
import { Text } from "../Text/Text";
import AdminBox from "../AdminBox/AdminBox";
import Style from "../PanelistPage/ApplicantText.module.css"


const PanelistTextPrint = () => {
    const [totalOpeningsJson, setTotalOpeningsJson] = useState({
        "totalOpenings": '',
        "totalApplicants": '',
        "selectedApplicants": ''
    });
    const domain = localStorage.getItem("domain");
    const fetchData = () => {
        fetch(`http://${domain}/JobVista/Graph`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/JSON'
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
                totalOpeningsJson.totalOpenings = result.departmentDetails.totalOpenings;
                totalOpeningsJson.totalApplicants = result.departmentDetails.totalApplicants;
                totalOpeningsJson.selectedApplicants = result.departmentDetails.selectedApplicants;

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id={Style.mainDivPanelist}>
            {/* <Text>Total Openings :  {totalOpeningsJson.totalOpenings}</Text>
            <Text>Total Applicants :  {totalOpeningsJson.totalApplicants}</Text>
            <Text>Selected Applicants :  {totalOpeningsJson.selectedApplicants}</Text> */}

            <AdminBox id={Style.commonPanelistStyle} iconId={Style.iconId} commonId={Style.commonId} titleId={Style.fnt} title="Total Openings" hireCount = {totalOpeningsJson.totalOpenings}/>
            <AdminBox id={Style.commonPanelistStyle} iconId={Style.iconId} commonId={Style.commonId} titleId={Style.fnt} title="Total Applicants" hireCount = {totalOpeningsJson.totalApplicants}/>
            <AdminBox id={Style.commonPanelistStyle} iconId={Style.iconId} commonId={Style.commonId} titleId={Style.fnt} title="Selected Applicants" hireCount = {totalOpeningsJson.selectedApplicants}/>
            {/* <AdminBox title=""/> */}
        </div>

    );
};

export default PanelistTextPrint;
