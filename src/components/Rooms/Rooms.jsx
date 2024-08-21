import { useDispatch } from 'react-redux';
import { fetchGetAvailableRooms } from 'src/stores/roomSlice/roomSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './room.scss';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';

const Rooms = ({ expectedCheckIn, expectedCheckOut, num, type, roomCallBack }) => {
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);

    // console.log({ expectedCheckIn, expectedCheckOut, num, type });
    const transferDateTimeToTime = (dateTime) => {
        const time = dateTime.split(' ')[0];
        return time;
    };

    let checkValidTime = (dayStart, dayEnd) => {
        return new Date(dayStart).getTime() <= Date.now() && new Date(dayEnd).getTime() >= Date.now();
    };

    useEffect(() => {
        (async () => {
            await dispatch(
                fetchGetAvailableRooms({
                    expectedCheckIn: transferDateTimeToTime(expectedCheckIn),
                    expectedCheckOut: transferDateTimeToTime(expectedCheckOut),
                    num,
                    type,
                    pageNum,
                }),
            )
                .then(unwrapResult)
                .then((result) => {
                    console.log('Fetch get rooms result: ', result);
                    if (handleResponse(result)) {
                        return;
                    }
                    setRooms(result.data.items);
                    setPageTotal(result.data.meta.totalPages);
                })
                .catch((error) => {
                    console.log('Fetch get rooms error: ', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                    });
                });
        })();
        transferDateTimeToTime(expectedCheckIn);
    }, [expectedCheckIn, expectedCheckOut, num, type, pageNum, dispatch]);

    return (
        <div>
            <section className="rooms-section spad">
                <div className="">
                    {rooms &&
                        rooms.map((room) => {
                            return (
                                <div key={room.id} className="col-lg-12 col-md-6">
                                    <div className="room-item" style={{ display: 'flex' }}>
                                        <div style={{ width: '40%', display: 'inline-flex' }}>
                                            <img
                                                style={{
                                                    width: '280px',
                                                    height: '386px',
                                                    objectFit: 'cover',
                                                }}
                                                src={room?.medias?.[0]?.url}
                                                alt=""
                                            />
                                        </div>
                                        <div style={{ width: '60%', position: 'relative' }} className="ri-text">
                                            <h4>{room.name}</h4>
                                            <div style={{ display: 'flex' }}>
                                                <h3
                                                    style={{
                                                        color: checkValidTime(room.sale?.dayStart, room.sale?.dayEnd)
                                                            ? 'rgba(0,0,0,.54)'
                                                            : '#5892b5',
                                                        textDecoration: checkValidTime(
                                                            room.sale?.dayStart,
                                                            room.sale?.dayEnd,
                                                        )
                                                            ? 'line-through'
                                                            : 'none',
                                                    }}
                                                >
                                                    {room &&
                                                        room?.price?.toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                </h3>
                                                {checkValidTime(room.sale?.dayStart, room.sale?.dayEnd) && (
                                                    <h3 style={{ marginLeft: '12px' }}>
                                                        {room &&
                                                            (
                                                                room.price -
                                                                (room.price * room.sale.salePercent) / 100
                                                            ).toLocaleString('it-IT', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                    </h3>
                                                )}
                                            </div>
                                            {room.sale?.salePercent != null &&
                                                checkValidTime(room.sale?.dayStart, room.sale?.dayEnd) && (
                                                    <h4
                                                        style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            right: '12px',
                                                            fontSize: '16px',
                                                            color: '#ee4d2d',
                                                            fontWeight: 400,
                                                        }}
                                                    >
                                                        Giảm giá {room.sale.salePercent} %
                                                    </h4>
                                                )}
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="r-o">Type:</td>
                                                        <td>{room.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="r-o">Capacity:</td>
                                                        <td>Max persion {room.capacity}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="r-o">Bed:</td>
                                                        <td>{room.bed}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="r-o">Size:</td>
                                                        <td>{room.size}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link className="primary-btn" to={'/room-detail/' + room.id}>
                                                More Details
                                            </Link>
                                            {!room.isAvailable && (
                                                <div
                                                    style={{ marginLeft: '8px', color: 'red' }}
                                                    className="primary-btn"
                                                >
                                                    Booked
                                                </div>
                                            )}
                                            <div style={{ marginTop: '25px' }}></div>
                                            {room.isAvailable && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        marginBottom: '15px',
                                                    }}
                                                >
                                                    <button
                                                        className="btn btn-link p-0 btn-add-room"
                                                        onClick={(e) => {
                                                            roomCallBack(room);
                                                        }}
                                                        style={{
                                                            color: '#fff',
                                                            backgroundColor: '#5892b5',
                                                            height: '35px',
                                                            width: '170px',
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        Add to my booking
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="col-lg-12">
                        <div className="room-pagination">
                            {pageNum != 1 && (
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPageNum(pageNum - 1);
                                    }}
                                >
                                    <i className="fa fa-long-arrow-left" /> Prev
                                </a>
                            )}
                            <Link to="/booking">{pageNum}</Link>
                            {pageTotal && pageNum != pageTotal && (
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPageNum(pageNum + 1);
                                    }}
                                    href="#"
                                >
                                    Next <i className="fa fa-long-arrow-right" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* Rooms Section End */}
        </div>
    );
};

export default Rooms;
