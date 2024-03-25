import React from 'react';
import { Text } from '../Text/Text';
import Style from '../AdminBox/AdminBox.module.css';
import { Heading } from '../Heading/Heading';

const AdminBox = ({ hireCount, percentageChange, title, id, iconId, commonId, titleId }) => {
    // const arrowIcon = percentageChange.includes('-') ? 'fa-arrow-down' : 'fa-arrow-up';

    // const style = {
    //     color: percentageChange.includes('-') ? '#E43636' : '#62D8AE'
    // }
    // localStorage.setItem(userDetails)
    // const userDetails = JSON.parse(userDetails);

    return (
        <div id={id} className={Style.boxContainer}>
            <div className={Style.icon} id={iconId}><i className={`fa-solid fa-arrow-up`}></i></div>
            <div className={Style.content} id={commonId}>
                <Text className={Style.title} id={titleId}>{title}</Text>
                <div id={Style.data}>
                    <Heading>{hireCount}</Heading>
                    <span id={Style.percent}>{percentageChange}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminBox;