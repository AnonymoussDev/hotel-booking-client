import React from 'react';
import { Button, Modal, Card, Col, Row, Typography, List, Divider } from 'antd';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import './billModal.scss'; // Đảm bảo rằng bạn đã tạo file CSS tùy chỉnh này

import logo from 'src/assets/images/logo.png';

const { Title, Text } = Typography;

const BillDetail = ({ displayModal, handleCloseModel, bookingDetail }) => {
    const printRef = React.useRef();

    const handleDownloadPdf = async () => {
        const element = printRef.current;

        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');
    };

    return (
        <Modal
            open={displayModal}
            onCancel={handleCloseModel}
            footer={
                <>
                    <Button onClick={handleCloseModel} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                        onClick={handleDownloadPdf}
                    >
                        Download Invoice
                    </Button>
                </>
            }
            width={600}
        >
            <Card ref={printRef} className="bill-card">
                <div className="bill-header">
                    <img src={logo} alt="Logo" style={{ display: 'flex', height: '60px' }} />
                    <div className="title">
                        <Title level={3} style={{ textAlign: 'center' }}>
                            Payment invoice
                        </Title>
                    </div>
                </div>
                <Divider />

                <Row gutter={16}>
                    <Col span={12}>
                        <Text strong>Bill ID:</Text>
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
                                {item.salePercent == null ? '' : `(${item.salePercent}%)`}
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

export default BillDetail;
