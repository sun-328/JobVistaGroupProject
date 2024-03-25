import React, { useEffect, useState } from 'react';
import Style from '../Openings/Openings.module.css';
import { Text } from '../Text/Text';

const CurrentOpenings = () => {
  const [openingsJson, setOpeningsJson] = useState([]);

  useEffect(() => {
    fetchCallForOpenings();
  }, []);
  const domain = localStorage.getItem("domain");
  const fetchCallForOpenings = () => {
    fetch(`http://${domain}/JobVista/GetCurrentOpenings`, {
      method: 'POST',
      // credentials: 'include',
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
        setOpeningsJson(result.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

 

  return (
    <div id={Style.divId}>


      <div id={Style.applicants}>

        <table id={Style.currentOpeningId}>
          <thead>
            <tr id={Style.tr_tab} className={Style.openingTrMain}>
              <th id={Style.name}>Opening Name</th>
              <th id={Style.start_date}>Start_Date</th>
            </tr>
          </thead>
          <tbody id={Style.tbody}>
            {openingsJson.length === 0 ?
            <tr>
              <td>No Openings Available</td>
            </tr>
              :
              (openingsJson.map((item, index) => (
                <tr key={index} id={index === 0 ? Style.some : Style.other}>
                  <td className={Style.td}>{item.Description}</td>
                  <td className={Style.td}>{item.Start_Date}</td>
                </tr>
              )))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default CurrentOpenings;
