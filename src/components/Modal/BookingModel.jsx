import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Card, Col, Row, Typography, List, Divider } from 'antd';

import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';
import { fetchCancelBookingUser } from 'src/stores/bookingSlice/bookingSlice';

import logo from 'src/assets/images/logo.png';
const { Title, Text } = Typography;

const BookingDetail = ({ displayModal, handleCloseModel, bookingDetail }) => {
    const dispatch = useDispatch();

    const reasonOptions = {
        0: 'Thay đổi kế hoạch du lịch',
        1: 'Giá phòng quá cao',
        2: 'Tìm được phòng ở khách sạn khác',
        3: 'Thời tiết không thuận lợi',
        4: 'Không hài lòng với dịch vụ khách sạn',
        5: 'Nhầm lẫn trong việc đặt phòng',
        6: 'Phòng không đáp ứng yêu cầu cá nhân',
        7: 'Lý do sức khỏe',
        8: 'Sự kiện bị hủy',
        999: 'Khác',
    };
    const cancelBooking = async () => {
        try {
            Swal.fire({
                title: 'What is the reason for your cancellation?',
                input: 'select',
                inputOptions: reasonOptions,
                inputValue: 0,
                showCancelButton: true,
                confirmButtonText: 'Enter',
                showLoaderOnConfirm: true,
                preConfirm: (selectedReason) => {
                    return selectedReason;
                },
            }).then(async (resultSelect) => {
                if (resultSelect.isConfirmed) {
                    if (resultSelect.value === '999') {
                        await Swal.fire({
                            title: 'What is the reason for your cancellation?',
                            input: 'text',
                            inputPlaceholder: 'Please enter your reason',
                            inputAttributes: {
                                autocapitalize: 'off',
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Enter',
                            showLoaderOnConfirm: true,
                            preConfirm: (customeReason) => {
                                return customeReason;
                            },
                        }).then(async (resultInput) => {
                            if (resultInput.isConfirmed) {
                                return await dispatch(
                                    fetchCancelBookingUser({ bookingId: bookingDetail.id, note: resultInput.value }),
                                )
                                    .then(unwrapResult)
                                    .then((result) => {
                                        console.log(result);
                                        if (handleResponse(result)) {
                                            return;
                                        }
                                        Swal.fire('Cancel booking successfully', '', 'success');
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1000);
                                    });
                            }
                        });
                    } else {
                        return await dispatch(
                            fetchCancelBookingUser({
                                bookingId: bookingDetail.id,
                                note: reasonOptions[resultSelect.value],
                            }),
                        )
                            .then(unwrapResult)
                            .then((result) => {
                                console.log(result);
                                if (handleResponse(result)) {
                                    return;
                                }
                                Swal.fire('Cancel booking successfully', '', 'success');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Có lỗi xảy ra', '', 'error');
        }
    };

    return (
        <Modal
            open={displayModal}
            onCancel={handleCloseModel}
            footer={
                <>
                    <Button
                        onClick={cancelBooking}
                        type="primary"
                        style={{ marginRight: 8, backgroundColor: 'rgb(238, 77, 45)' }}
                    >
                        Cancel Booking
                    </Button>
                    <Button
                        onClick={handleCloseModel}
                        style={{ marginRight: 8, backgroundColor: '#5892b5', borderColor: '#5892b5' }}
                        type="primary"
                    >
                        Ok
                    </Button>
                </>
            }
            width={600}
        >
            <Card className="booking-card">
                <div className="booking-header">
                    <img src={logo} alt="Logo" style={{ display: 'flex', height: '60px' }} />
                    <div className="title">
                        <Title level={3} style={{ textAlign: 'center' }}>
                            Your Reservation
                        </Title>
                    </div>
                </div>
                <Divider />

                <Row gutter={16}>
                    <Col span={12}>
                        <Text strong>Booking ID:</Text>
                        <span> {bookingDetail?.id}</span>
                    </Col>
                    <Col span={12}>
                        <Text strong>Customer Name:</Text>
                        <span> {`${bookingDetail?.booker?.lastName} ${bookingDetail?.booker?.firstName}`}</span>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Text strong>Phone Number:</Text>
                        <span> {bookingDetail?.booker?.phoneNumber}</span>
                    </Col>
                    <Col span={12}>
                        <Text strong>Email:</Text>
                        <span> {`${bookingDetail?.booker?.email}`}</span>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Text strong>Check-in:</Text>
                        <span> {bookingDetail?.checkIn}</span>
                    </Col>
                    <Col span={12}>
                        <Text strong>Check-out:</Text>
                        <span> {bookingDetail?.checkOut}</span>
                    </Col>
                </Row>

                <Divider />

                <Title level={5}>Booking Rooms</Title>
                <List
                    bordered
                    dataSource={bookingDetail.rooms}
                    renderItem={(item) => (
                        <List.Item className="list-item">
                            <div className="list-item-content">
                                {item.room.name}
                                <span style={{ color: 'rgb(238, 77, 45)' }}>
                                    {' '}
                                    {item.salePercent == null ? '' : `(${item.salePercent}%)`}
                                </span>
                            </div>
                            <div className="list-item-price">
                                {item.salePercent == null
                                    ? item.bookingPrice.toLocaleString()
                                    : (item.bookingPrice * (item.salePercent / 100)).toLocaleString()}{' '}
                                VNĐ
                            </div>
                        </List.Item>
                    )}
                />
                <Divider />

                <Title level={5}>Booking Services</Title>
                {bookingDetail?.services?.length > 0 ? (
                    <List
                        bordered
                        dataSource={bookingDetail.services}
                        renderItem={(item) => (
                            <List.Item className="list-item">
                                <div className="list-item-content">
                                    {item.service.title} ({item.bookingPrice?.toLocaleString()} VNĐ x {item.quantity})
                                </div>
                                <div className="list-item-price">
                                    {(item.bookingPrice * item.quantity).toLocaleString()} VNĐ
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text>No services.</Text>
                )}
                <Divider />

                <Title level={5}>Surcharges</Title>
                {bookingDetail?.surcharges?.length > 0 ? (
                    <List
                        bordered
                        dataSource={bookingDetail.surcharges}
                        renderItem={(item) => (
                            <List.Item className="list-item">
                                <div className="list-item-content">{item.reason}</div>
                                <div className="list-item-price">{item.surcharge.toLocaleString()} VNĐ</div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Text>No surcharges.</Text>
                )}

                <Divider />

                <Row>
                    <Col span={24}>
                        <div className="total-prices">
                            <div className="total-row">
                                <Title level={5} style={{ marginBottom: 0, display: 'inline-block' }}>
                                    Rooms Total:
                                </Title>
                                <Text
                                    strong
                                    style={{ marginBottom: '0.5em', display: 'inline-block', marginLeft: '0.5em' }}
                                >
                                    {bookingDetail?.totalRoomPrice?.toLocaleString()} VNĐ
                                </Text>
                            </div>
                            <div className="total-row">
                                <Title level={5} style={{ marginBottom: 0, display: 'inline-block' }}>
                                    Services Total:
                                </Title>
                                <Text
                                    strong
                                    style={{ marginBottom: '0.5em', display: 'inline-block', marginLeft: '0.5em' }}
                                >
                                    {bookingDetail?.totalServicePrice?.toLocaleString()} VNĐ
                                </Text>
                            </div>
                            <div className="total-row">
                                <Title level={5} style={{ marginBottom: 0, display: 'inline-block' }}>
                                    Surcharges Total:
                                </Title>
                                <Text
                                    strong
                                    style={{ marginBottom: '1em', display: 'inline-block', marginLeft: '0.5em' }}
                                >
                                    {bookingDetail?.totalSurcharge?.toLocaleString()} VNĐ
                                </Text>
                            </div>
                            <div className="total-row">
                                <Title level={4} style={{ marginBottom: 0, display: 'inline-block' }}>
                                    Grand Total:
                                </Title>
                                <Text strong style={{ display: 'inline-block', marginLeft: '0.5em' }}>
                                    {(
                                        bookingDetail?.totalRoomPrice +
                                        bookingDetail?.totalServicePrice +
                                        bookingDetail?.totalSurcharge
                                    )?.toLocaleString()}{' '}
                                    VNĐ
                                </Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Modal>
    );
};

export default BookingDetail;
