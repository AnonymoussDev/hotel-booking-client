import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import adminDashboard from '../assets/images/admin/adminDashboard.png';

const AdminSIdeBar = ({ option }) => {
    // const [show, setShow] = useState(false);

    const sideBars = [
        {
            path: '/admin',
            name: 'Statistic',
            option: 'Statistic',
        },
        {
            path: '/admin/users',
            name: 'Manage Users',
            option: 'Users',
        },
        {
            path: '/admin/rooms',
            name: 'Manage Rooms',
            option: 'Rooms',
        },
        {
            path: '/admin/sales',
            name: 'Manage Sales',
            option: 'Sales',
        },
        {
            path: '/admin/bookings',
            name: 'Manage Bookings',
            option: 'Bookings',
        },
        {
            path: '/admin/services',
            name: 'Manage Services',
            option: 'Services',
        },
        {
            path: '/admin/products',
            name: 'Manage Products',
            option: 'Products',
        },
        // {
        //     path: '/admin/posts',
        //     name: 'Manage Posts',
        // },
    ];

    return (
        <>
            <div className="sidebar" id="sidebar">
                <div
                    className="slimScrollDiv"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: '672px',
                    }}
                >
                    <div
                        className="sidebar-inner slimscroll"
                        style={{ overflow: 'hidden', width: '100%', height: '672px' }}
                    >
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li className="submenu">
                                    <a className="active">
                                        <img src={adminDashboard} alt="img" />
                                        <span> Dashboards</span> <span className="menu-arrow" />
                                    </a>
                                    <ul style={{ display: 'block' }}>
                                        {sideBars.map((sideBar, index) => (
                                            <li key={index} style={{ padding: '12px' }}>
                                                <Link
                                                    className={
                                                        sideBar.option.toUpperCase() === option.toUpperCase()
                                                            ? 'active'
                                                            : ''
                                                    }
                                                    to={sideBar.path}
                                                >
                                                    {sideBar.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSIdeBar;
