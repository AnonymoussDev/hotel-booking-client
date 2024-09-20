import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRooms } from 'src/composables/useRooms';

import { Form, Input, Select, Upload, Button, Row, Col, Card } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

const UpdateBooking = ({ data, setData, setValue, virtualOldImg, setVirtualImg, virtualImg, handleDeleteImage }) => {
    const dispatch = useDispatch();

    const { roomUpdateFields } = useRooms();

    const handleFileChange = ({ fileList }) => {
        let arr = [];
        let files = [];

        fileList.forEach((file) => {
            arr.push(URL.createObjectURL(file.originFileObj));
            files.push(file.originFileObj);
        });

        setVirtualImg((prevState) => [...prevState, ...arr]);
        setData((prevState) => ({
            ...prevState,
            files: files,
        }));
    };

    return (
        <Form layout="vertical">
            <Row gutter={[16, 16]}>
                {roomUpdateFields &&
                    roomUpdateFields.map((fields, index) => (
                        <Col span={6} key={index}>
                            <Form.Item label={fields.title}>
                                <Input
                                    style={{ padding: '10px 12px 10px 12px' }}
                                    value={data[fields.dataIndex]}
                                    onChange={(e) => {
                                        setData((prevState) => {
                                            prevState[fields.dataIndex] = e.target.value;
                                            return prevState;
                                        });
                                        setValue(e.target.value);
                                    }}
                                    disabled={fields.isDisable}
                                />
                            </Form.Item>
                        </Col>
                    ))}
                <Col span={6}>
                    <Form.Item label="Type">
                        <Select
                            style={{
                                height: '45px',
                            }}
                            defaultValue="Standard Single"
                            onChange={(value) => {
                                setData((prevState) => ({
                                    ...prevState, // Sao chép tất cả các giá trị trước đó
                                    type: value, // Cập nhật giá trị type
                                }));
                            }}
                            value={data.type || 'Standard Single'} // Đảm bảo có giá trị mặc định nếu data.type chưa được thiết lập
                        >
                            <Option value="Standard Single">Standard Single</Option>
                            <Option value="Standard Double">Standard Double</Option>
                            <Option value="Standard Twin">Standard Twin</Option>
                            <Option value="Superior Double">Superior Double</Option>
                            <Option value="Superior Twin">Superior Twin</Option>
                            <Option value="Superior King">Superior King</Option>
                            <Option value="Deluxe Double">Deluxe Double</Option>
                            <Option value="Deluxe Double Sea View">Deluxe Double Sea View</Option>
                            <Option value="Deluxe Twin">Deluxe Twin</Option>
                            <Option value="Deluxe Twin Sea View">Deluxe Twin Sea View</Option>
                            <Option value="Deluxe King">Deluxe King</Option>
                            <Option value="Deluxe King Sea View">Deluxe King Sea View</Option>
                            <Option value="Deluxe Triple">Deluxe Triple</Option>
                            <Option value="Deluxe Triple Sea View">Deluxe Triple Sea View</Option>
                            <Option value="Junior Suite">Junior Suite</Option>
                            <Option value="Family Suite">Family Suite</Option>
                            <Option value="Senior Suite">Senior Suite</Option>
                            <Option value="Executive Suite">Executive Suite</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <div className="col-lg-12">
                <div className="form-group">
                    <label> Room Image</label>
                    <div className="image-upload">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => {
                                let arr = [];
                                let files = [];
                                for (let file of e.target.files) {
                                    arr.push(URL.createObjectURL(file));
                                    files.push(file);
                                }
                                setVirtualImg((prevState) => [...prevState, ...arr]);
                                setData((prevState) => {
                                    prevState['files'] = files;
                                    return prevState;
                                });
                            }}
                        />

                        <div className="image-uploads">
                            <div className="image-uploads-imgs">
                                {virtualOldImg &&
                                    virtualOldImg.map((img, index) => (
                                        <div className="image-uploads-img">
                                            <img src={img.url} alt="img" />
                                            <div
                                                className="image-uploads-icon"
                                                onClick={(e) => handleDeleteImage('old', index)}
                                            >
                                                <i class="fa-solid fa-xmark"></i>
                                            </div>
                                        </div>
                                    ))}
                                {virtualImg &&
                                    virtualImg.map((img, index) => (
                                        <div className="image-uploads-img">
                                            <img src={img} alt="img" />
                                            <div
                                                className="image-uploads-icon"
                                                onClick={(e) => handleDeleteImage('new', index)}
                                            >
                                                <i class="fa-solid fa-xmark"></i>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <h4>Drag and drop a file to upload</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default UpdateBooking;
