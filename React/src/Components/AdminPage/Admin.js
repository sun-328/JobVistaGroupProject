import React, { useState } from 'react';
import Style from '../AdminPage/Admin.module.css';
import { AdminMenu } from '../AdminMenu/AdminMenu';
import { Dashboard } from '../DashBoard/Dashboard';
import { Departments } from '../Departments/Departments';
import { Panelist } from '../Panelist/Panelist';
import { Openings } from '../Openings/Openings';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import { Heading } from '../Heading/Heading';
import { Error } from '../ErrorPage/Error';

export const Admin = () => {
    const [selectMenu, setSelectedMenu] = useState('Dashboard');

    const selectMainMenu = (menu) => {
        setSelectedMenu(menu)
    }

    return (
        <div id={Style.adminContainer}>
            <AdminHeader />

            <div id={Style.admin}>
                <div id={Style.menuBox}>
                    {/* <MainLogo /> */}
                    {/* <Heading id={Style.menuHead}>Main Menu</Heading> */}
                    <AdminMenu onSelect={selectMainMenu} selected={selectMenu} />
                </div>

                <div id={Style.viewBox}>
                    {selectMenu === 'Dashboard' && <Dashboard />}
                    {selectMenu === 'Departments' && <Departments />}
                    {selectMenu === 'Panelist' && <Panelist />}
                    {selectMenu === 'Openings' && <Openings />}
                </div>
            </div>
        </div>
    )
}

// <div id={Style.adminContainer}>
//             <div id={Style.menuBox}>
{/* <MainLogo /> */ }
{/* <Heading id={Style.menuHead}>Main Menu</Heading> */ }
            //     <AdminMenu onSelect={selectMainMenu} selected={selectMenu} />
            // </div>

        //     <div id={Style.viewBox}>
        //         <AdminHeader />
        //         {selectMenu === 'Dashboard' && <Dashboard />}
        //         {selectMenu === 'Departments' && <Departments />}
        //         {selectMenu === 'Panelist' && <Panelist />}
        //         {selectMenu === 'Openings' && <Openings />}
        //     </div>
        // </div>