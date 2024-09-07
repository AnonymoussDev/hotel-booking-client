import React, { useState, useEffect } from 'react';
import { useBookings } from 'src/composables/useBookings';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import { Card, Button, Table, Space, Form, Input, Modal, Row, Col, Select } from 'antd';

import Swal from 'sweetalert2';
import handleResponse from 'src/utils/handleResponse';
import { fetchGetHotelServicesAdmin } from 'src/stores/hotelServiceSlice/hotelServiceSlice';
import { addService } from 'src/stores/bookingSlice/bookingSlice';

const UpdateBooking = ({ data, setData }) => {
    const dispatch = useDispatch();
    let { optionId } = useParams();

    const { Option } = Select;
    const { bookingUpdateFields } = useBookings();

    const [apiServices, setApiServices] = useState([]);
    const [services, setServices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDisableInputPrice, setIsDisableInputPrice] = useState(false);
    const [newService, setNewService] = useState({
        service: { id: '', title: '', price: '' },
        quantity: 1,
        bookingPrice: '',
    });

    useEffect(() => {
        if (data?.services) {
            setServices(data.services);
        }
    }, [data]);

    const fetchServices = async () => {
        try {
            await dispatch(
                fetchGetHotelServicesAdmin({
                    pageSize: 1000,
                }),
            )
                .then(unwrapResult)
                .then((result) => {
                    if (handleResponse(result)) {
                        return;
                    }
                    setApiServices(result.data.items);
                })
                .catch((error) => {
                    console.log('Fetch get services error: ', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                    });
                });
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    function getNestedValue(obj, path) {
        return path.split('.').reduce((currentObj, key) => {
            if (currentObj && typeof currentObj === 'object') {
                // Kiểm tra nếu key có dấu '?' (dùng trong trường hợp optional chaining)
                if (key.endsWith('?')) {
                    key = key.slice(0, -1);
                    return currentObj[key];
                }
                return currentObj[key];
            }
            return undefined;
        }, obj);
    }

    const showModal = () => {
        fetchServices();
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            await dispatch(
                addService({
                    bookingId: optionId,
                    serviceBookingDto: {
                        serviceId: newService.service.id,
                        quantity: newService.quantity,
                        price: newService.bookingPrice,
                    },
                }),
            )
                .then(unwrapResult)
                .then((result) => {
                    if (handleResponse(result)) {
                        return;
                    }
                    setIsModalVisible(false);
                    setServices([...services, { ...newService, id: services.length + 1 }]);
                    setNewService({ service: { id: '', title: '', price: '' }, quantity: 1, bookingPrice: '' });
                })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            console.error('Failed to add service:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
            });
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleServiceChange = (value) => {
        const selectedServiceValue = apiServices.find((service) => service.id === value);
        if (selectedServiceValue?.price) {
            setIsDisableInputPrice(true);
        } else {
            setIsDisableInputPrice(false);
        }
        setNewService({ service: selectedServiceValue, quantity: 1, bookingPrice: selectedServiceValue?.price });
    };

    const serviceColumns = [
        {
            title: 'Service Name',
            dataIndex: ['service', 'title'],
            key: 'serviceName',
        },
        {
            title: 'Price',
            dataIndex: 'bookingPrice',
            key: 'bookingPrice',
            render: (price) => `${price?.toLocaleString()} VND`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => `${(record.bookingPrice * record.quantity)?.toLocaleString()} VND`,
        },
    ];

    return (
        <>
            <div className="row">
                {bookingUpdateFields &&
                    bookingUpdateFields.map((fields, index) => (
                        <div className="col-lg-3 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label>{fields.title}</label>
                                <input
                                    onChange={(e) => {
                                        setData((prevState) => {
                                            prevState[fields.dataIndex] = e.target.value;
                                            return prevState;
                                        });
                                    }}
                                    disabled={fields.isDisable}
                                    type="text"
                                    value={getNestedValue(data, fields.dataIndex) || ''}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <Card title="Booking Rooms" style={{ marginBottom: '20px' }}>
                <Row gutter={[16, 16]}>
                    {data.rooms &&
                        data.rooms.map((item, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    title={`Phòng: ${item.room.name}`}
                                    bordered={false}
                                    style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                >
                                    <p>
                                        <strong>Loại phòng:</strong> {item.room.type}
                                    </p>
                                    <p>
                                        <strong>Số giường:</strong> {item.room.bed}
                                    </p>
                                    <p>
                                        <strong>Giá:</strong>{' '}
                                        {item.room.price?.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                    <Button
                                        className="btn-primary"
                                        type="primary"
                                        style={{ marginTop: '10px', width: '100%' }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Card>

            <Card title="Booking Services">
                <Table dataSource={services} columns={serviceColumns} pagination={false} rowKey="id" bordered />
                <Space style={{ marginTop: '20px' }}>
                    <Button className="btn-primary" type="primary" onClick={showModal}>
                        Add Service
                    </Button>
                </Space>

                <Modal title="Add New Service" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form layout="vertical">
                        <Form.Item label="Service Name">
                            <Select placeholder="Select a service" onChange={handleServiceChange}>
                                {apiServices.map((service) => (
                                    <Option key={service.id} value={service.id}>
                                        {service.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input
                                value={newService.bookingPrice}
                                disabled={isDisableInputPrice}
                                onChange={(e) => setNewService({ ...newService, bookingPrice: Number(e.target.value) })}
                            />
                        </Form.Item>
                        <Form.Item label="Quantity">
                            <Input
                                type="number"
                                min={1}
                                value={newService.quantity}
                                onChange={(e) => setNewService({ ...newService, quantity: Number(e.target.value) })}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    );
};

export default UpdateBooking;
