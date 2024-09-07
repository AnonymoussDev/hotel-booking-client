import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    BookOutlined,
    SolutionOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import adminDashboard from '../assets/images/admin/adminDashboard.png';

const { Sider } = Layout;

const AdminSIdeBar = ({ option }) => {
    const sideBars = [
        {
            path: '/admin',
            name: 'Statistic',
            option: 'Statistic',
            icon: <DashboardOutlined />,
        },
        {
            path: '/admin/users',
            name: 'Manage Users',
            option: 'Users',
            icon: <UserOutlined />,
        },
        {
            path: '/admin/rooms',
            name: 'Manage Rooms',
            option: 'Rooms',
            icon: <HomeOutlined />,
        },
        {
            path: '/admin/sales',
            name: 'Manage Sales',
            option: 'Sales',
            icon: <ShoppingCartOutlined />,
        },
        {
            path: '/admin/bookings',
            name: 'Manage Bookings',
            option: 'Bookings',
            icon: <BookOutlined />,
        },
        {
            path: '/admin/services',
            name: 'Manage Services',
            option: 'Services',
            icon: <SolutionOutlined />,
        },
        {
            path: '/admin/products',
            name: 'Manage Products',
            option: 'Products',
            icon: <ShoppingOutlined />,
        },
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
                        <Sider width={250} className="site-layout-background">
                            <div
                                className="sidebar-header"
                                style={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    borderBottom: '1px solid #e8ebed',
                                    width: '105%',
                                }}
                            >
                                <Link
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                    }}
                                    to={sideBars[0].path}
                                >
                                    <DashboardOutlined style={{ fontSize: '50px', color: '#5892b5' }} />
                                    <h2 style={{ margin: '0', fontSize: '18px' }}>Hotel Dashboard</h2>
                                </Link>
                            </div>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[option.toLowerCase()]}
                                selectedKeys={[option.toLowerCase()]}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {sideBars.map((sideBar) => (
                                    <Menu.Item key={sideBar.option.toLowerCase()} icon={sideBar.icon}>
                                        <Link to={sideBar.path}>{sideBar.name}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Sider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSIdeBar;
