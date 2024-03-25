import React, { useState, useEffect, useRef } from "react";
// import { Image } from '../ImageTag/Image';
import Style from '../ProfilePage/Profile.module.css';

export const Profile = () => {

  const domain = localStorage.getItem("domain");
  // const [profileData, setProfileData] = useState(null);

  
  // const profile = () =>{
  //   fetch(`http://${domain}/JobVista/Profile`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
  // })
  //     .then((response) => {
  //         if (!response.ok) {
  //             throw new Error(`HTTP error status: ${response.status}`)
  //         }

  //         return response.json();
  //     })
  //     .then((result) => {
  //         console.log("opening", result)
  //         setProfileData(result.message);

  //     })
  //     .catch((error) => {
  //         console.log("Error in get openings ", error);
  //     })
  // }
  // useEffect(() => {
  //   Profile();
  // }, []);
  return (
    <div id={Style.mainProfile}>
      {/* <h1 id={Style.name}>{profileData.name}</h1>
      <p id={Style.email}>{profileData.email}</p>
      <p id={Style.gender}>{profileData.gender}</p>
      <p id={Style.role}>{profileData.role}</p>
      <p id={Style.position}>{profileData.position}</p> */}
    </div>
  )
}