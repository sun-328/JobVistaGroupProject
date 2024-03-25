import React from 'react';
import { Text } from '../Text/Text';
import Style from '../AdminMenu/AdminMenu.module.css';

export const AdminMenu = ({ onSelect, selected }) => {
    const role = JSON.parse(localStorage.userDetails);

    const dashboardStyle = {
        background: selected === 'Dashboard' ? '#E5EEFE' : 'transparent',
        color: selected === 'Dashboard' ? '#4191FF' : 'black'
    }

    const departmentStyle = {
        background: selected === 'Departments' ? '#E5EEFE' : 'transparent',
        color: selected === 'Departments' ? '#4191FF' : 'black'
    }

    const panelistStyle = {
        background: selected === 'Panelist' ? '#E5EEFE' : 'transparent',
        color: selected === 'Panelist' ? '#4191FF' : 'black'
    }

    const openingsStyle = {
        background: selected === 'Openings' ? '#E5EEFE' : 'transparent',
        color: selected === 'Openings' ? '#4191FF' : 'black'
    }

    const todayOpeningsStyle = {
        background: selected === 'TodayOpenings' ? '#E5EEFE' : 'transparent',
        color: selected === 'TodayOpenings' ? '#4191FF' : 'black'
    }

    const upcomingOpeningsStyle = {
        background: selected === 'UpcomingOpenings' ? '#E5EEFE' : 'transparent',
        color: selected === 'UpcomingOpenings' ? '#4191FF' : 'black'
    }

    return (
        <ul id={Style.main}>
            {role.role === "panelist" ? (
                <>
                    <li className={Style.list} onClick={() => onSelect('Dashboard')} style={dashboardStyle}>
                        <i className="fa-solid fa-table-cells-large"></i>
                        <Text>DashBoard</Text>
                    </li>

                    <li className={Style.list} onClick={() => onSelect('TodayOpenings')} style={todayOpeningsStyle}>
                    <span class="material-symbols-outlined">today</span>
                        <Text>Today Openings</Text>
                    </li>

                    <li className={Style.list} onClick={() => onSelect('UpcomingOpenings')} style={upcomingOpeningsStyle}>
                        <span class="material-symbols-outlined">event_upcoming</span>
                        <Text>Upcoming Openings</Text>
                    </li>
                </>
            ) : (
                <>
                    <li className={Style.list} onClick={() => onSelect('Dashboard')} style={dashboardStyle}>
                        <i className="fa-solid fa-table-cells-large"></i>
                        <Text>DashBoard</Text>
                    </li>

                    <li className={Style.list} onClick={() => onSelect('Departments')} style={departmentStyle}>
                        <i className="fa-solid fa-sitemap"></i>
                        <Text>Departments</Text>
                    </li>

                    <li className={Style.list} onClick={() => onSelect('Panelist')} style={panelistStyle}>
                        <i className="fa-solid fa-users"></i>
                        <Text>Panelist</Text>
                    </li>

                    <li className={Style.list} onClick={() => onSelect('Openings')} style={openingsStyle}>
                        <i className="fa-solid fa-clipboard-list"></i>
                        <Text id={Style.openings}>Openings</Text>
                    </li>
                </>
            )}
        </ul>
    )

}
