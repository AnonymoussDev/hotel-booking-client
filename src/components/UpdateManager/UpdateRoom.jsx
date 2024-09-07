import React, { useState, useEffect } from 'react';
import { useBookings } from 'src/composables/useBookings';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import handleResponse from 'src/utils/handleResponse';
import { useRooms } from 'src/composables/useRooms';

const UpdateBooking = ({ data, setData, setValue, virtualOldImg, setVirtualImg, virtualImg, handleDeleteImage }) => {
    const dispatch = useDispatch();

    const { roomUpdateFields } = useRooms();

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

    console.log(data);

    return (
        <>
            <div className="row">
                {roomUpdateFields &&
                    roomUpdateFields.map((fields, index) => (
                        <div className="col-lg-3 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label>{fields.title}</label>
                                <input
                                    onChange={(e) => {
                                        setData((prevState) => {
                                            prevState[fields.dataIndex] = e.target.value;
                                            console.log(prevState);
                                            return prevState;
                                        });
                                        setValue(e.target.value);
                                    }}
                                    disabled={fields.isDisable}
                                    type="text"
                                    value={data[fields.dataIndex]}
                                />
                            </div>
                        </div>
                    ))}
                <>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: '9px',
                                }}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setData((prevState) => {
                                        prevState['type'] = e.target.value;
                                        return prevState;
                                    });
                                }}
                            >
                                <option value="Standard Single">Standard Single</option>
                                <option value="Standard Double">Standard Double</option>
                                <option value="Standard Twin">Standard Twin</option>
                                <option value="Superior Double">Superior Double</option>
                                <option value="Superior Twin">Superior Twin</option>
                                <option value="Superior King">Superior King</option>
                                <option value="Deluxe Double">Deluxe Double</option>
                                <option value="Deluxe Double Sea View">Deluxe Double Sea View</option>
                                <option value="Deluxe Twin">Deluxe Twin</option>
                                <option
                                    value="
                            Deluxe Twin Sea View"
                                >
                                    Deluxe Twin Sea View
                                </option>
                                <option value="Deluxe King">Deluxe King</option>
                                <option value="Deluxe King Sea View">Deluxe King Sea View</option>
                                <option value="Deluxe Triple">Deluxe Triple</option>
                                <option value="Deluxe Triple Sea View">Deluxe Triple Sea View</option>
                                <option value="Junior Suite">Junior Suite</option>
                                <option value="Family Suite">Family Suite</option>
                                <option value="Senior Suite">Senior Suite</option>
                                <option value="Executive Suite">Executive Suite</option>
                            </select>
                        </div>
                    </div>

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
                                        setVirtualImg(arr);
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
                </>
            </div>
        </>
    );
};

export default UpdateBooking;
