import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import Style from '../BarChart/Bar.module.css';

const domain = localStorage.getItem("domain");
const HorizontalChart = () => {
    const [label, setLabel] = useState([]);
    const [datavalue, setdatavalue] = useState([]);
  
    const fetchData = () => {
        fetch(`http://${domain}/JobVista/Graphs`, {
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
                const selectedApplicantsGraphInDepartments = result.selectedApplicantsGraphInDepartments;
                if ((Object.keys(selectedApplicantsGraphInDepartments)).length > 0) {
                    
                    const entries = Object.entries(selectedApplicantsGraphInDepartments);
                    if (entries.length === 1) {
                        setLabel(entries.map(([key, _]) => key));
                        setdatavalue(entries.map(([_, value]) => value));

                    } else {
                        const mergedEntry = entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
                        if (Object.keys(mergedEntry).length !== label.length) {
                            setLabel(Object.keys(mergedEntry));
                            setdatavalue(Object.values(mergedEntry));
                        }
                    }

                    
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div id={Style.chartId} className={Style.line} >
            <Bar data={{
                    labels: label,
                    datasets: [{
                        label: "",
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
                options={{
                    indexAxis: 'y'
                }}
/>
        </div>
    );
};

export default HorizontalChart;
