import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from 'src/assets/images/logo.png';
import avatar from 'src/assets/images/avt-preview.png';
import logout from 'src/assets/images/admin/log-out.png';
import { Link } from 'react-router-dom';
import storageService from '../services/storage.service';

import { Menu, Dropdown, Badge, Button, Avatar, Layout } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

const AdminHeader = () => {
    const [isBlock, setIsBlock] = useState(false);
    const user = useSelector((state) => state.auth?.user);

    const [count, setCount] = useState(5); // Số lượng thông báo giả lập
    const [notifications, setNotifications] = useState([
        'New message from John',
        'Meeting at 10:00 AM',
        'Server down!',
        'New comment on your post',
        'Your password will expire soon',
    ]);

    const handleClearNotifications = () => {
        setCount(0);
        setNotifications([]);
    };

    const notify = (
        <Menu>
            {notifications.length > 0 ? (
                notifications.map((notification, index) => <Menu.Item key={index}>{notification}</Menu.Item>)
            ) : (
                <Menu.Item>No new notifications</Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item onClick={handleClearNotifications}>Clear All</Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu>
            <Menu.Item key="1">My Profile</Menu.Item>
            <Menu.Item key="2">Setting</Menu.Item>
            <Menu.Item
                key="3"
                onClick={() => {
                    storageService.remove('token');
                    window.location.href = '/login';
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '0 30px',
                position: 'sticky',
                top: 0,
                zIndex: 1001,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="header-left" style={{ background: '#fff', position: 'sticky', top: 0 }}>
                <img src={logo} alt="Logo" style={{ display: 'flex', height: '60px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Dropdown overlay={notify} trigger={['click']} placement="bottomRight">
                    <Badge count={count}>
                        <Button shape="circle" icon={<BellOutlined />} />
                    </Badge>
                </Dropdown>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                </Dropdown>
            </div>
        </Header>
        // <div className="header" style={{ backgroundColor: '#F8F9FE' }}>
        //     <div className="header-left active" style={{ top: '30px' }}>
        //         <Link className="logo" to="/">
        //             <img src={logo} alt="" />
        //         </Link>
        //         <Link className="logo-small" to="/">
        //             <img src={logo} alt="" />
        //         </Link>
        //     </div>
        //     <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        //         <span className="bar-icon">
        //             <span />
        //             <span />
        //             <span />
        //         </span>
        //     </a>
        //     <ul className="nav user-menu" onClick={() => setIsBlock(!isBlock)}>
        //         <li style={{ display: 'flex', alignItems: 'center' }}>
        //             <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        //                 <Badge count={count}>
        //                     <Button shape="circle" icon={<BellOutlined />} />
        //                 </Badge>
        //             </Dropdown>
        //         </li>
        //         <li className="nav-item dropdown has-arrow main-drop">
        //             <a
        //                 // href="javascript:void(0);"
        //                 className="dropdown-toggle nav-link userset"
        //                 data-bs-toggle="dropdown"
        //             >
        //                 <span className="user-img">
        //                     <img src={user && user?.avatar ? avatar : user.avatar} alt="" />
        //                     <span className="status online" />
        //                 </span>
        //             </a>
        //             <div
        //                 style={{
        //                     display: isBlock === true ? 'block' : 'none',
        //                     top: '-70%',
        //                     left: '-100%',
        //                 }}
        //                 className="dropdown-menu menu-drop-user"
        //             >
        //                 <div className="profilename">
        //                     <div className="profileset">
        //                         <span className="user-img">
        //                             <img src={user && user.avatar} alt="" />
        //                             <span className="status online" />
        //                         </span>
        //                         <div className="profilesets">
        //                             <h6>{user?.firstName?.concat(' ' + user?.lastName)}</h6>
        //                             <h5>Admin</h5>
        //                         </div>
        //                     </div>
        //                     <hr className="m-0" />
        //                     <Link to="/user" className="dropdown-item">
        //                         <i className="me-2" data-feather="user" />
        //                         My Profile
        //                     </Link>
        //                     <a className="dropdown-item" href="generalsettings.html">
        //                         <i className="me-2" data-feather="settings" />
        //                         Settings
        //                     </a>
        //                     <hr className="m-0" />
        //                     <div
        //                         className="dropdown-item logout pb-0"
        //                         style={{ cursor: 'pointer' }}
        //                         onClick={() => {
        //                             storageService.remove('token');
        //                             window.location.href = '/login';
        //                         }}
        //                     >
        //                         <img src={logout} className="me-2" alt="img" />
        //                         Logout
        //                     </div>
        //                 </div>
        //             </div>
        //         </li>
        //     </ul>
        // </div>
    );
};

export default AdminHeader;
