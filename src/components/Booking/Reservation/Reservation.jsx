import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateBooking } from 'src/stores/bookingSlice/bookingSlice';
import Swal from 'sweetalert2';
import handleResponse from 'src/utils/handleResponse';
// import socket from "../../socket";

const Reservation = ({ expectedCheckIn, expectedCheckOut, rooms, reservation, services, step }) => {
    const [price, setPrice] = useState(0);
    const [roomsBooking, setRoomsBooking] = useState({});
    const [servicesBooking, setServicesBooking] = useState({});
    const [discountPrice, setDiscountPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('add room', rooms);
        if (rooms?.length > 0) {
            const lastRoom = rooms[rooms.length - 1];

            setRoomsBooking((prevRoomsBooking) => {
                const existingRoom = prevRoomsBooking[lastRoom.id];
                if (existingRoom) {
                    return prevRoomsBooking; // Nếu phòng đã tồn tại, không thay đổi gì
                }

                // Tạo một object mới với room mới được thêm
                const updatedRoomsBooking = {
                    ...prevRoomsBooking,
                    [lastRoom.id]: lastRoom,
                };

                // Cập nhật giá phòng
                let newPrice = price + lastRoom.price;
                setPrice(newPrice);
                if (lastRoom?.sale?.salePercent) {
                    let newDiscountPrice = lastRoom.price - (lastRoom.price * lastRoom.sale?.salePercent) / 100;
                    setDiscountPrice(newDiscountPrice);
                } else {
                    setDiscountPrice(newPrice);
                }
                return updatedRoomsBooking;
            });
        }

        console.log('add service', services);
        if (services?.length > 0) {
            const lastService = services[services.length - 1];

            // Cập nhật giá dịch vụ
            let newPrice = price + lastService.price;
            let newDiscountPrice = discountPrice + lastService.price;
            setPrice(newPrice);
            setDiscountPrice(newDiscountPrice);

            // Thêm service cuối vào servicesBooking
            setServicesBooking((prevServicesBooking) => {
                const existingService = prevServicesBooking[lastService.id];

                if (existingService) {
                    // Nếu dịch vụ đã tồn tại, tăng số lượng
                    const updatedService = {
                        ...existingService,
                        quantity: existingService.quantity + 1,
                    };

                    return {
                        ...prevServicesBooking,
                        [lastService.id]: updatedService,
                    };
                } else {
                    // Nếu dịch vụ chưa tồn tại, thêm dịch vụ với số lượng là 1
                    const newService = {
                        ...lastService,
                        quantity: 1,
                    };

                    return {
                        ...prevServicesBooking,
                        [lastService.id]: newService,
                    };
                }
            });
        }
    }, [rooms.length, services.length]);

    const convertDateFormat = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <section style={{ padding: '12px', marginTop: '36px' }} className="card">
            <h4 className="mb-4">Reservation Summary</h4>
            <div className="d-flex justify-content-between">
                {/* <h3>{room.name}</h3> */}
                {/* <SelectList name="rooms" start={1} /> */}
            </div>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <div className="font-weight-bold">Check-in</div>
                    <div>After 14.00h {expectedCheckIn && convertDateFormat(expectedCheckIn.split(' ')[0])}</div>
                </div>
                <div>
                    <div className="font-weight-bold">Check-out</div>
                    <div>Before 12.00h {expectedCheckOut && convertDateFormat(expectedCheckOut.split(' ')[0])}</div>
                </div>
            </div>
            {roomsBooking &&
                Object.values(roomsBooking).map((room) => {
                    return (
                        <div key={room.id}>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="font-weight-bold">
                                    Phòng {room && room.name}{' '}
                                    {room.sale?.salePercent && (
                                        <span style={{ color: 'rgb(238, 77, 45)' }}>(-{room.sale.salePercent}%)</span>
                                    )}
                                </div>
                                <div>
                                    <strong>
                                        {room &&
                                            room?.price?.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                    </strong>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="font-weight-bold">Loại phòng</div>
                                <div>
                                    <strong>{room && room.type}</strong>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="font-weight-bold">Số lượng người</div>
                                <div>
                                    <strong>{room.capacity}</strong>
                                </div>
                            </div>
                            <div style={{ height: '1px', border: '1px solid black', margin: '4px 0' }}></div>
                        </div>
                    );
                })}
            {servicesBooking && Object.values(servicesBooking).length > 0 && (
                <>
                    {Object.values(servicesBooking).map((service) => (
                        <div key={service.id} className="d-flex justify-content-between mb-3">
                            <div className="font-weight-bold">
                                {service.title} (x{service.quantity})
                            </div>
                            <div>
                                <strong>
                                    {service.price.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </strong>
                            </div>
                        </div>
                    ))}
                    <div style={{ height: '1px', border: '1px solid black', margin: '4px 0' }}></div>
                </>
            )}

            <div className="card-total">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mb-3">
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }} className="price">
                            Total
                        </div>
                    </div>
                    <div className="price" style={{ display: 'flex', alignItems: 'center' }}>
                        {price &&
                            price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mb-3">
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }} className="price">
                            Total after sale
                        </div>
                    </div>
                    <div className="price" style={{ display: 'flex', alignItems: 'center' }}>
                        {discountPrice &&
                            discountPrice.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="btn btn-primary btn-group-justified"
                onClick={async () => {
                    if (step === 1) {
                        if (Object.keys(rooms).length > 0) {
                            reservation(step + 1);
                        } else {
                            alert('Vui lòng chọn phòng');
                        }
                    } else if (step === 2) {
                        const servicesBook = Object.values(servicesBooking).map((service) => {
                            return { serviceId: service.id, quantity: service.quantity };
                        });
                        await dispatch(
                            fetchCreateBooking({
                                roomIds: Object.values(roomsBooking).map((room) => room.id),
                                expectedCheckIn,
                                expectedCheckOut,
                                services: servicesBook,
                            }),
                        )
                            .then(unwrapResult)
                            .then((result) => {
                                if (handleResponse(result)) {
                                    return;
                                }
                                Swal.fire('Đặt phòng thành công', '', 'success');
                                setTimeout(() => {
                                    window.location.href = '/booking-cart';
                                }, 1500);
                                reservation(step + 1);
                            })
                            .catch((rejectedValueOrSerializedError) => {
                                Swal.fire('Có lỗi xảy ra', '', 'error');
                                console.log(rejectedValueOrSerializedError);
                            });
                    }
                }}
            >
                Continue
            </button>
        </section>
    );
};

export default Reservation;
