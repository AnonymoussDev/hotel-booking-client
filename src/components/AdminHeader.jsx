import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import storageService from 'src/services/storage.service';
import { receiveNotification, socket } from 'src/services/socketio.service';

import { fetchGetNotificationsAdmin, fetchReadNotificationAdmin } from 'src/stores/notificationSlice/notificationSlice';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';

import logo from 'src/assets/images/logo.png';

import { Menu, Dropdown, Badge, Button, Avatar, Layout, Card, Typography, Space } from 'antd';
import {
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MessageOutlined,
    ClockCircleOutlined,
    AlertOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;
const { Text } = Typography;

const getIconForNotification = (title) => {
    if (title.toLowerCase().includes('message')) return <MessageOutlined style={{ color: '#1890ff' }} />;
    if (title.toLowerCase().includes('meeting')) return <ClockCircleOutlined style={{ color: '#52c41a' }} />;
    if (title.toLowerCase().includes('server')) return <AlertOutlined style={{ color: '#ff4d4f' }} />;
    return <UserOutlined style={{ color: '#fa8c16' }} />;
};

const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user);

    const [pageNotification, setPageNotification] = useState(1);
    const [pageTotalNotification, setPageTotalNotification] = useState();
    const [countNotification, setCountNotification] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [dropdownNotificationVisible, setDropdownNotificationVisible] = useState(false);

    const fetchNotifications = useCallback(async () => {
        try {
            const result = await dispatch(fetchGetNotificationsAdmin({ pageNum: pageNotification }));
            const response = unwrapResult(result);

            if (handleResponse(response)) {
                return;
            }

            setNotifications((prev) => [...prev, ...response.data.items]);
            setPageTotalNotification(response.data.meta.totalPages);
            setCountNotification(response.data.totalUnreadNotifications);
        } catch (error) {
            console.error('Fetch get notifications error: ', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xảy ra. Lấy thông báo thất bại!',
            });
        }
    }, [dispatch, pageNotification]);

    const fetchReadNotification = async (id) => {
        try {
            setDropdownNotificationVisible(false);
            const result = await dispatch(fetchReadNotificationAdmin(id));
            const response = unwrapResult(result);
            if (handleResponse(response)) {
                return;
            }
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === id ? { ...notification, isRead: true } : notification,
                ),
            );
            setCountNotification((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
        } catch (error) {
            console.error('Fetch read notifications error: ', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xảy ra. thông báo thất bại!',
            });
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        receiveNotification((err, res) => {
            if (res?.data) {
                setNotifications((prev) => [res.data, ...prev]);
                setCountNotification((prevCount) => prevCount + 1);
            }
        });
    }, [socket]);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollHeight - Math.floor(scrollTop) === clientHeight && pageNotification < pageTotalNotification) {
            setPageNotification((prev) => prev + 1);
        }
    };

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'My Profile',
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            label: 'Setting',
        },
        {
            key: '3',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => {
                storageService.removeAccessToken('token');
                navigate('/login');
            },
        },
    ];

    const notify = (
        <Menu
            style={{
                maxHeight: '80vh', // Độ dài tối đa dựa trên chiều cao màn hình
                overflowY: 'auto', // Cho phép cuộn dọc
                width: '350px', // Đặt chiều rộng cố định nếu cần
            }}
            onScroll={handleScroll}
        >
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <Menu.Item key={index} style={{ padding: '10px 10px' }}>
                        <Card
                            bordered={false}
                            style={{ width: '100%' }}
                            styles={{
                                body: { padding: '15px', backgroundColor: notification.isRead ? '#f5f5f5' : '#e6f7ff' },
                            }}
                            onClick={(e) => fetchReadNotification(notification.id)}
                        >
                            {notification.link !== null && (
                                <Link to={notification.link}>
                                    <Card.Meta
                                        avatar={getIconForNotification(notification.title)}
                                        title={notification.title}
                                        description={
                                            <Space direction="vertical" size={1}>
                                                <Text
                                                    style={{
                                                        whiteSpace: 'normal',
                                                        wordWrap: 'break-word',
                                                        overflowWrap: 'break-word',
                                                        wordBreak: 'break-word',
                                                        userSelect: 'text',
                                                    }}
                                                >
                                                    {notification.content}
                                                </Text>
                                                <Text type="secondary">
                                                    {new Date(notification.createdDate).toLocaleString()}
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </Link>
                            )}
                            {notification.link === null && (
                                <Card.Meta
                                    avatar={getIconForNotification(notification.title)}
                                    title={notification.title}
                                    description={
                                        <Space direction="vertical" size={1}>
                                            <Text
                                                style={{
                                                    whiteSpace: 'normal',
                                                    wordWrap: 'break-word',
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                    userSelect: 'text',
                                                }}
                                            >
                                                {notification.content}
                                            </Text>
                                            <Text type="secondary">
                                                {new Date(notification.createdDate).toLocaleString()}
                                            </Text>
                                        </Space>
                                    }
                                />
                            )}
                        </Card>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item>No new notifications</Menu.Item>
            )}
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
                <Dropdown
                    overlay={notify}
                    visible={dropdownNotificationVisible}
                    onVisibleChange={() => setDropdownNotificationVisible(true)}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <Badge count={countNotification}>
                        <Button shape="circle" icon={<BellOutlined />} />
                    </Badge>
                </Dropdown>
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AdminHeader;
