import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './filterBooking.scss';

function FilterBooking({ filter, startDateInit, endDateInit, expectedCheckInInit, expectedCheckOutInit }) {
    const setDateFormat = (date, status) => {
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        const year = date.getFullYear();

        if (status === 'checkin') {
            return year + '-' + month + '-' + day + ' 14:00:00';
        } else if (status === 'checkout') {
            return year + '-' + month + '-' + day + ' 12:00:00';
        }
    };
    //   const [data, dispatch] = useSearchValue();
    const [startDate, setStartDate] = useState(startDateInit);
    const [endDate, setEndDate] = useState(endDateInit);
    const [expectedCheckIn, setExpectedCheckIn] = useState(expectedCheckInInit);
    const [expectedCheckOut, setExpectedCheckOut] = useState(expectedCheckOutInit);
    const [num, setNum] = useState('');
    const [type, setType] = useState('');

    const changeStartDate = (date) => {
        setStartDate(date);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        setEndDate(nextDate);
        setExpectedCheckIn(setDateFormat(date, 'checkin'));
    };

    const changeEndDate = (date) => {
        setEndDate(date);
        setExpectedCheckOut(setDateFormat(date, 'checkout'));
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="calendar" onClick={onClick} ref={ref}>
            <input type="text" className="form-item" value={value} readOnly />
            <div>
                <i className="fa-regular fa-calendar"></i>
            </div>
        </div>
    ));

    return (
        <div className="container" style={{ padding: '0 20px', fontFamily: 'serif' }}>
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="room-item">
                        <h4>Check in</h4>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={changeStartDate}
                            startDate={startDate}
                            minDate={startDate}
                            customInput={<CustomInput />}
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="room-item">
                        <h4>Check out</h4>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={changeEndDate}
                            startDate={endDate}
                            minDate={endDate}
                            customInput={<CustomInput />}
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="room-item">
                        <h4>Person Number</h4>
                        <select
                            id="guest"
                            className="custom-select select-option"
                            name="num"
                            style={{ width: '208px', height: '49px', fontSize: '18px' }}
                            onChange={(e) => {
                                setNum(e.target.value);
                            }}
                        >
                            <option value={''}>Choose person numbers</option>
                            <option value={1}>1 person</option>
                            <option value={2}>2 persons</option>
                            <option value={3}>3 persons</option>
                            <option value={4}>4 persons</option>
                            <option value={5}>5 persons</option>
                            <option value={6}>6 persons</option>
                            <option value={7}>7 persons</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="room-item">
                        <h4>Type Room</h4>
                        <select
                            style={{ width: '208px', height: '49px', fontSize: '18px' }}
                            id="guest"
                            className="custom-select select-option"
                            name="num"
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                        >
                            <option value={''}>Choose type room</option>
                            <option value="Standard">Standard</option>
                            <option value="Superior">Superior</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                    filter(expectedCheckIn, expectedCheckOut, num, type);
                }}
                style={{ backgroundColor: '#5892b5 !important' }}
            >
                Get room available
            </button>
        </div>
    );
}

export default FilterBooking;
