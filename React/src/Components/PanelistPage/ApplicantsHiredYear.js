import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Style from '../BarChart/Bar.module.css';



const LineChartPanelist = () => {
    const [label, setLabel] = useState([]);
    const [datavalue, setdatavalue] = useState([]);

    useEffect(() => {
        const result = { "selectedApplicantsGraphInOpenings": { "Software develeoper": 22 }, "getApplicantsStatusGraph": { "Onhold": 38, "Selected": 22, "Rejected": 9 }, "selectedApplicantsGraphInYear": { "2020" : 5, "2021": 10, "2022": 22 }, "statusCode": 200 };
        const applicantsStatusGraph = result.selectedApplicantsGraphInYear;

        if ((Object.keys(applicantsStatusGraph)).length > 0) {
            const entries = Object.entries(applicantsStatusGraph);
            if (entries.length === 1) {
                setLabel(entries.map(([_, value]) => value));
                setdatavalue(entries.map(([key, _]) => key));
                
            } else {
                const mergedEntry = entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
                setLabel(Object.keys(mergedEntry));
                setdatavalue(Object.values(mergedEntry));
            }
        }
    }, []);

    // const fetchData = () => {
    //     fetch("http://localhost:8080/JobVista/Graph", {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'Application/JSON'
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(result => {
    //             const selectedApplicantsGraphInMonth = result.selectedApplicantsGraphInMonth;

    //             if ((Object.keys(selectedApplicantsGraphInMonth)).length > 0) {
    //                 const entries = Object.entries(selectedApplicantsGraphInMonth);
    //                 if (entries.length === 1) {
    //                     setLabel(entries.map(([key, _]) => key));
    //                     setdatavalue(entries.map(([_, value]) => value));
    //                 } else {
    //                     const mergedEntry = entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    //                     setLabel(Object.keys(mergedEntry));
    //                     setdatavalue(Object.values(mergedEntry));
    //                 }

    //             }

    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);



    return (
        <div id={Style.chartId} className={Style.line}>
            <Line data={{
                labels: label,
                datasets: [{
                    label: "Total Hire",
                    data: datavalue,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }]
            }}
            />
        </div>
    );
};

export default LineChartPanelist;


