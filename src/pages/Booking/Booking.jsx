import React, { useState } from 'react';
import './booking.scss';
import BookingStep from 'src/components/Booking/BookingStep/BookingStep';
import Reservation from 'src/components/Booking/Reservation/Reservation';
import Header from 'src/components/Header';
import FilterBooking from 'src/components/Booking/FilterBooking/FilterBooking';
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
    const expectedCheckOutInit = setDateFormat(endDateInit, 'checkout');

    const [step, setStep] = useState(1);
    const [expectedCheckIn, setExpectedCheckIn] = useState(expectedCheckInInit);
    const [expectedCheckOut, setExpectedCheckOut] = useState(expectedCheckOutInit);
    const [services, setServices] = useState([]);
    const [num, setNum] = useState('');
    const [type, setType] = useState('');
    const [keyWord, setKeyword] = useState('');
    const [rooms, setRooms] = useState([]);

    const filter = (expectedCheckIn, expectedCheckOut, num, type, keyWord) => {
        setExpectedCheckIn(expectedCheckIn);
        setExpectedCheckOut(expectedCheckOut);
        setNum(num);
        setType(type);
        setKeyword(keyWord);
    };

    console.log(keyWord);

    const roomCallBack = (roomSelect) => {
        setRooms((prevRooms) => {
            const existingRoom = prevRooms[roomSelect.id];
            if (existingRoom) {
                Swal.fire({
                    title: 'You have added this room!',
                    icon: 'warning',
                });
                return;
            }
            Swal.fire({
                title: 'Room selected successfully',
                icon: 'success',
            });
            return [...prevRooms, roomSelect];
        });
    };

    const serviceCallBack = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
    };

    const reservation = (step) => {
        setStep(step);
    };

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
            <div className="container container-booking">
                <div className="row">
                    <main className="col-md-8">
                        <BookingStep
                            step={step}
                            expectedCheckIn={expectedCheckIn}
                            expectedCheckOut={expectedCheckOut}
                            num={num}
                            type={type}
                            keyWord={keyWord}
                            reservation={reservation}
                            roomCallBack={roomCallBack}
                            serviceCallBack={serviceCallBack}
                        />
                    </main>
                    <aside className="col-md-4">
                        <section className="mb-4 mt-5">
                            <h3 className="section-title">Discover Our Booking</h3>
                            <p style={{ textAlign: 'justify' }}>
                                Explore our available rooms and services. Select your preferred date and time to see our
                                best options. For any assistance, feel free to reach out to our support team. We look
                                forward to serving you!
                            </p>
                        </section>
                        <Reservation
                            expectedCheckIn={expectedCheckIn}
                            expectedCheckOut={expectedCheckOut}
                            keyWord={keyWord}
                            reservation={reservation}
                            rooms={rooms}
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
