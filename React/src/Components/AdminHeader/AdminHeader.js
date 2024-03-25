import React, { useState, useEffect } from 'react';
import Style from '../AdminHeader/AdminHeader.module.css';
import { MainLogo } from '../MainLogo/MainLogo';
import { Button } from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '../ImageTag/Image';
import { Profile } from '../ProfilePage/Profile';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';
import { Bold } from '../Bold/Bold';

export const AdminHeader = ({ className }) => {
    const [viewProfile, setViewProfile] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const domain = localStorage.getItem("domain");
    const navigate = useNavigate();

    // const applicantDetail = localStorage.setItem("userDetails", null);
    // const applicantProfile = localStorage.getItem("userDetails");
    // console.log(applicantProfile);

    const applicantDetails = localStorage.getItem("userDetails");

    const logOut = () => {
        localStorage.clear();
        localStorage.setItem("domain", "localhost:8080");
        navigate('/logIn')
    }
    const backBtn = () => {
        setViewProfile(false);
    }


    const handleClick = () => {
        setViewProfile(true);
        fetch(`http://${domain}/JobVista/Profile`, {
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
                setProfileData(result.message);

            })
            .catch((error) => {
                console.log("Error in get openings ", error);
            })
    }




    return (
        <header id={Style.header}>
            <div id={Style.forSpace}>
                <MainLogo />
                {/* <Link to='/logIn'>
                    <Button id={Style.logOutBtn} onClick={logOut}>Log out</Button>
                </Link> */}
                {/* {applicantProfile === null ? <p>Check</p> :
                    <Image onClick={handleClick} id={Style.userImg} src='../../Images/user (1).png' />
                } */}
                {applicantDetails === null ? ''
                    : 
                    <Image onClick={handleClick} id={Style.userImg} src='../../Images/user (1).png' />
                }
                {viewProfile && profileData && (
                    <div id={Style.mainProfile}>
                        <i id={Style.closeProfile} onClick={backBtn} class="fa-solid fa-xmark"></i>
                        <Image id={Style.userImage} src='../../Images/user (1).png' />
                        <Heading id={Style.username}>{profileData.name}</Heading>
                        <Text>{profileData.email}</Text>
                        <Text>{profileData.gender}</Text>
                        {profileData.role === "admin" ?
                            <Text><Bold>Role:</Bold>&nbsp;{profileData.role}</Text> :
                            <Text><Bold>Role:</Bold>&nbsp;{profileData.role}&nbsp;&nbsp;&nbsp;<Bold>Position:</Bold>&nbsp;{profileData.position}</Text>
                        }
                        <Text id={Style.logout} onClick={logOut}>Sign Out</Text>
                    </div>
                )}



            </div>
        </header>
    )
}