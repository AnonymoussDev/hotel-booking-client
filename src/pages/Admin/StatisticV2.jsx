import React, { useEffect, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Card, Row, Select } from 'antd';

import AdminHeader from 'src/components/AdminHeader';
import AdminSIdeBar from 'src/components/AdminSideBar';
import storageService from 'src/services/storage.service';

const { Option } = Select;
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Statistic = () => {
    const token = storageService.getAccessToken();

    const [lineData, setLineData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [barData, setBarData] = useState(null);
    const [monthBar, setMonthBar] = useState('8');
    const [userTopBooking, setUserTopBooking] = useState(null);

    useMemo(() => {
        console.log(monthBar);
        (async () => {
            try {
                const promiseAll = await Promise.allSettled([
                    await (
                        await fetch(
                            `${
                                process.env.REACT_APP_API_URL
                            }/hotel-admin/api/v1/statistic/revenue?fromMonth=1&toMonth=12&year=${new Date().getFullYear()}`,
                            {
                                headers: {
                                    ...(token && { Authorization: `Bearer ${token}` }),
                                },
                            },
                        )
                    ).json(),
                    await (
                        await fetch(`${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/statistic/top-booking`, {
                            headers: {
                                ...(token && { Authorization: `Bearer ${token}` }),
                            },
                        })
                    ).json(),
                    await (
                        await fetch(
                            `${
                                process.env.REACT_APP_API_URL
                            }/hotel-admin/api/v1/statistic/room-booked-month?month=${monthBar}&year=${new Date().getFullYear()}`,
                            {
                                headers: {
                                    ...(token && { Authorization: `Bearer ${token}` }),
                                },
                            },
                        )
                    ).json(),
                ]);
                if (promiseAll[0].status === 'fulfilled') {
                    if (promiseAll[0].value.status.code === '00') {
                        const revenues = promiseAll[0].value.data;
                        const data = revenues.map((revenue) => revenue.totalRevenue);
                        const lineData = {
                            labels: [
                                'January',
                                'February',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December',
                            ],
                            datasets: [
                                {
                                    label: 'Revenue statistics',
                                    data: data,
                                    borderColor: '#36A2EB', // Màu đường line xanh lam nhạt
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền với độ trong suốt
                                    tension: 0.4, // Độ cong của đường line
                                    pointBackgroundColor: '#fff', // Màu nền của các điểm
                                    pointBorderColor: '#36A2EB', // Màu viền của các điểm
                                    pointHoverBackgroundColor: '#36A2EB', // Màu nền khi hover vào điểm
                                    pointHoverBorderColor: '#fff', // Màu viền khi hover vào điểm
                                    fill: true, // Tô màu dưới đường line
                                },
                            ],
                        };
                        setLineData(lineData);
                    }
                    if (promiseAll[1].value.status.code === '00') {
                        const dataRes = promiseAll[1].value.data;
                        const totalBooking = dataRes.map((item) => item.value);
                        const users = dataRes.map((item) => item.user);
                        const labels = dataRes.map((item) => item.user.firstName);
                        const pieData = {
                            labels: labels,
                            datasets: [
                                {
                                    label: '# Total booking',
                                    data: totalBooking,
                                    backgroundColor: [
                                        '#0077b6',
                                        '#f08080',
                                        '#ae759f',
                                        '#FF9F45',
                                        '#5299d3',
                                        '#d884d4',
                                        '#2ec4b6',
                                        '#bc4749',
                                        '#ee6c4d',
                                        '#184e77',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        };
                        setUserTopBooking(users);
                        setPieData(pieData);
                    }
                    if (promiseAll[2].value.status.code === '00') {
                        const rooms = promiseAll[2].value.data.items;
                        const backgroundColor = [
                            '#f08080',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                            '#5299d3',
                        ];
                        // console.log(promiseAll[2].value);
                        const data = rooms.map((item, index) => {
                            return {
                                label: item.room.name,
                                data: [item.value],
                                backgroundColor: backgroundColor[index],
                            };
                        });

                        const chartData = {
                            labels: [monthBar],
                            datasets: data,
                        };
                        setBarData(chartData);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, [monthBar]);

    return (
        <>
            <div className="main-wrapper">
                <AdminHeader />
                <AdminSIdeBar option={'statistic'} />
                <div className="page-wrapper">
                    <div className="content">
                        <div className="content-revenue"></div>
                        <Card style={{ marginBottom: '20px' }}>
                            <Row gutter={[16, 16]} style={{ justifyContent: 'space-around' }}>
                                <div style={{ margin: 'auto 0', width: '60%' }} className="content-statistic-room">
                                    {lineData && (
                                        <Line
                                            options={{
                                                animations: {
                                                    x: {
                                                        type: 'number',
                                                        easing: 'easeInOutElastic',
                                                        duration: 150,
                                                        from: NaN,
                                                        delay(ctx) {
                                                            return ctx.index * 40;
                                                        },
                                                    },
                                                },
                                            }}
                                            data={lineData}
                                        />
                                    )}
                                </div>
                                <div style={{ width: '30%' }} className="content-statistic-room">
                                    <h5 style={{ textAlign: 'center', color: 'rgb(109 116 114)', fontSize: '13px' }}>
                                        Top 10 customer booking
                                    </h5>
                                    {pieData && (
                                        <Pie
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    tooltip: {
                                                        callbacks: {
                                                            title: (tooltipItems) => {
                                                                const index = tooltipItems[0].dataIndex;
                                                                const user = userTopBooking[index];
                                                                return (
                                                                    `Name: ${user.lastName} ${user.firstName}\n` +
                                                                    `Phone: ${user.phoneNumber}\n` +
                                                                    `Email: ${user.email}`
                                                                );
                                                            },
                                                        },
                                                    },
                                                },
                                            }}
                                            data={pieData}
                                        />
                                    )}
                                </div>
                            </Row>
                        </Card>
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Select
                                    id="guest"
                                    name="num"
                                    value={monthBar}
                                    style={{ width: 125, height: 30 }}
                                    onChange={setMonthBar}
                                >
                                    <Option value="1">January</Option>
                                    <Option value="2">February</Option>
                                    <Option value="3">March</Option>
                                    <Option value="4">April</Option>
                                    <Option value="5">May</Option>
                                    <Option value="6">June</Option>
                                    <Option value="7">July</Option>
                                    <Option value="8">August</Option>
                                    <Option value="9">September</Option>
                                    <Option value="10">October</Option>
                                    <Option value="11">November</Option>
                                    <Option value="12">December</Option>
                                </Select>
                            </div>
                            <div
                                style={{
                                    width: '80%',
                                    height: '100%',
                                    margin: '0 auto',
                                }}
                                className="content-statistic-room"
                            >
                                {barData && (
                                    <Bar
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Statistics TOP 10 rooms',
                                                },
                                            },
                                        }}
                                        data={barData}
                                        // data={verticalData}
                                    />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Statistic;
