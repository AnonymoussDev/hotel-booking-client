import React, { useState } from 'react';
import './booking.scss';
import BookingStep from 'src/components/BookingStep/BookingStep';
import Reservation from 'src/components/Reservation/Reservation';
import Header from 'src/components/Header';
import FilterBooking from 'src/components/FilterBooking/FilterBooking';
import Swal from 'sweetalert2';

const Booking = () => {
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
    const startDateInit = new Date();
    const endDateInit = new Date();
    endDateInit.setDate(startDateInit.getDate() + 1);
    const expectedCheckInInit = setDateFormat(startDateInit, 'checkin');
    const expectedCheckOutInit = setDateFormat(endDateInit, 'checkin');

    const [step, setStep] = useState(1);
    const [expectedCheckIn, setExpectedCheckIn] = useState(expectedCheckInInit);
    const [expectedCheckOut, setExpectedCheckOut] = useState(expectedCheckOutInit);
    const [services, setServices] = useState([]);
    const [num, setNum] = useState('');
    const [type, setType] = useState('');
    const [room, setRoom] = useState({});

    const filter = (expectedCheckIn, expectedCheckOut, num, type) => {
        setExpectedCheckIn(expectedCheckIn);
        setExpectedCheckOut(expectedCheckOut);
        setNum(num);
        setType(type);
    };

    const roomCallBack = (roomSelect) => {
        if (roomSelect.id === room?.id && room) {
            Swal.fire('You have added this room!');
            return;
        }
        setRoom(roomSelect);
    };

    const serviceCallBack = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
    };

    const reservation = (step) => {
        setStep(step);
    };

    console.log(expectedCheckIn, expectedCheckOut);

    return (
        <>
            <Header />
            <FilterBooking
                filter={filter}
                startDateInit={startDateInit}
                endDateInit={endDateInit}
                expectedCheckInInit={expectedCheckInInit}
                expectedCheckOutInit={expectedCheckOutInit}
            />
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <BookingStep
                            step={step}
                            expectedCheckIn={expectedCheckIn}
                            expectedCheckOut={expectedCheckOut}
                            num={num}
                            type={type}
                            reservation={reservation}
                            roomCallBack={roomCallBack}
                            serviceCallBack={serviceCallBack}
                        />
                    </main>
                    <aside className="col-md-4">
                        <section className="mb-4">
                            <img src="/images/coco-drink.png" width="300" alt="" />
                            <h2 className="text-uppercase font-weight-bold">TODAY ONLY: 10% OFF</h2>
                            <p>
                                - Book <span className="text-underline">today</span> and get an exclusive{' '}
                                <strong>10% discount</strong> on your stay.
                            </p>
                            <button className="btn btn-primary text-uppercase">Enjoy</button>
                        </section>
                        <Reservation
                            expectedCheckIn={expectedCheckIn}
                            expectedCheckOut={expectedCheckOut}
                            num={num}
                            type={type}
                            reservation={reservation}
                            room={room}
                            services={services}
                            step={step}
                        />
                    </aside>
                </div>
            </div>
        </>
    );
};

export default Booking;
