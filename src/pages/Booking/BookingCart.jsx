import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header';
import { fetchGetBookingsUser, fetchGetBooking } from 'src/stores/bookingSlice/bookingSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';

import BookingModel from 'src/components/Modal/BookingModel';
import { Table, Button, Tag } from 'antd';
import { useBookings } from 'src/composables/useBookings';

const BookingCart = () => {
    const dispatch = useDispatch();

    const [bookings, setBookings] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTtotalElements] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [bookingDetail, setBookingDetail] = useState({});
    const [displayModal, setDisplayModal] = useState(false);

    const { bookingUserTableColumns } = useBookings();
    bookingUserTableColumns.push({
        title: 'Status',
        width: 150,
        fixed: 'right',
        render: (text, record) => (
            <Tag color={record?.status === 'PENDING' ? '#f50' : record?.status === 'CANCEL' ? '#c1121f' : '#87d068'}>
                {record?.status === 'PENDING'
                    ? 'Chưa nhận phòng'
                    : record?.status === 'CANCEL'
                      ? 'Đã hủy'
                      : record?.status === 'CHECKED_IN'
                        ? 'Đã check-in'
                        : 'Đã thanh toán'}
            </Tag>
        ),
    });
    bookingUserTableColumns.push({
        title: 'Action',
        width: 150,
        fixed: 'right',
        render: (text, record) => (
            <Button
                onClick={() => showBooking(record.id)}
                type="primary"
                style={{ backgroundColor: '#5892b5', borderColor: '#5892b5' }}
            >
                Xem chi tiết
            </Button>
        ),
    });

    const handleCloseModel = () => {
        setDisplayModal(false);
        setBookingDetail({});
    };

    const setPagination = ({ page, pageSize }) => {
        console.log(pageSize);

        setPageNum(page);
        setPageSize(pageSize);
    };

    useEffect(() => {
        (async () => {
            await dispatch(fetchGetBookingsUser({ pageNum, pageSize, keyword }))
                .then(unwrapResult)
                .then((result) => {
                    console.log(result.data.items);
                    if (handleResponse(result)) {
                        return;
                    }
                    setTtotalElements(result.data.meta.totalElements);
                    setBookings(result.data.items);
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                    });
                });
        })();

        // return () => {}; // no-op
    }, [pageNum, pageSize, keyword, dispatch]);

    const showBooking = async (bookingId) => {
        try {
            const result = await dispatch(fetchGetBooking(bookingId)).then(unwrapResult);
            if (result.status.code === '00') {
                setBookingDetail(result.data);
            } else {
                Swal.fire(result.status.message, '', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Có lỗi xảy ra', '', 'error');
        }
        setDisplayModal(true);
    };

    return (
        <>
            <BookingModel
                displayModal={displayModal}
                handleCloseModel={handleCloseModel}
                bookingDetail={bookingDetail}
            />
            <Header />
            <section className="mb-5">
                <div className="container">
                    <h2>Danh sách phòng đã đặt</h2>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="input-group mb-4" style={{ width: '30%' }}>
                        <input
                            type="text"
                            className="form-control"
                            id="advanced-search-input"
                            placeholder="Search booking"
                        />
                        <button className="btn btn-primary" id="advanced-search-button" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                    <div className="table-responsive">
                        <Table
                            key={(record) => record.id}
                            columns={bookingUserTableColumns}
                            dataSource={bookings}
                            bordered
                            pagination={{
                                onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                current: pageNum,
                                pageSize: pageSize,
                                total: totalElements,
                                position: ['bottomCenter'],
                            }}
                            scroll={{ y: 400 }}
                        />{' '}
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookingCart;
