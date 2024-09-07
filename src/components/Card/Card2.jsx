import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { useRooms } from 'src/composables/useRooms';
import { useUsers } from 'src/composables/useUsers';
import { useSales } from 'src/composables/useSales';
import { useServices } from 'src/composables/useServices';
import { useProducts } from 'src/composables/useProducts';
import { useBookings } from 'src/composables/useBookings';
import { Table, Space } from 'antd';
import BillModal from '../Modal/BillModal2';
import './card.scss';
import Swal from 'sweetalert2';

import adminFilter from 'src/assets/images/admin/adminFilter.png';
import admionSearchWhite from 'src/assets/images/admin/admionSearchWhite.png';
import adminDelete from 'src/assets/images/admin/adminDelete.png';
import restore from 'src/assets/images/admin/restore.png';
import edit from 'src/assets/images/admin/edit.png';
import lock from 'src/assets/images/admin/lock.png';
import unlock from 'src/assets/images/admin/unlock.png';
import invoice from 'src/assets/images/admin/invoice.png';
import checkIn from 'src/assets/images/admin/check-in.png';
import checkOut from 'src/assets/images/admin/checkout.png';
import order from 'src/assets/images/admin/order.png';
// import excel from 'src/assets/images/admin/excel.png';
// import pdf from 'src/assets/images/admin/pdf.png';
// import printer from 'src/assets/images/admin/printer.png';
// import eye from 'src/assets/images/admin/eye.png';
// import { fetchAddSaleToRoom, fetchGetSales, fetchRemoveSaleToRoom } from 'src/stores/saleSlice/saleSlice';
import {
    fetchGetBooking,
    fetchCheckinBookingById,
    fetchCheckoutBookingById,
} from 'src/stores/bookingSlice/bookingSlice';

const Card = ({
    option,
    data,
    pageNum,
    setPageNum,
    pageSize,
    setPageSize,
    totalElements,
    deleteOption,
    revertOption,
    deleteFlag,
    callbackKeyWord,
}) => {
    const dispatch = useDispatch();
    const [displayModal, setDisplayModal] = useState(false);
    const [bookingDetail, setBookingDetail] = useState({});

    const handleCloseModel = () => {
        setDisplayModal(false);
    };

    const setPagination = ({ page, pageSize }) => {
        setPageNum(page);
        setPageSize(pageSize);
    };

    const actionUpdateDelete = {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 110,
        render: (text, record) => (
            <>
                {deleteFlag === false ? (
                    <Space size="middle">
                        <Link
                            style={{ marginLeft: '12px' }}
                            className="me-3"
                            to={'/admin/update/' + option + '/' + record.id}
                        >
                            <img src={edit} alt="img" />
                        </Link>
                        <span className="me-3 confirm-text my-card-action" onClick={() => deleteOption(record.id)}>
                            <img src={adminDelete} alt="img" />
                        </span>
                    </Space>
                ) : (
                    <span className="me-3 confirm-text my-card-action" onClick={() => revertOption(record.id)}>
                        <img style={{ width: '24px', height: '24px' }} src={restore} alt="img" />
                    </span>
                )}
            </>
        ),
    };

    const actionUpdateLock = {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 110,
        render: (text, record) => (
            <>
                {deleteFlag === false ? (
                    <Space size="middle">
                        <Link
                            style={{ marginLeft: '12px' }}
                            className="me-3"
                            to={'/admin/update/' + option + '/' + record.id}
                        >
                            <img src={edit} alt="img" />
                        </Link>
                        <span className="me-3 confirm-text my-card-action" onClick={() => deleteOption(record.id)}>
                            <img style={{ width: '24px', height: '24px' }} src={lock} alt="img" />
                        </span>
                    </Space>
                ) : (
                    <span className="me-3 confirm-text my-card-action" onClick={() => revertOption(record.id)}>
                        <img style={{ width: '24px', height: '24px' }} src={unlock} alt="img" />
                    </span>
                )}
            </>
        ),
    };

    const { userTableColumns } = useUsers();
    userTableColumns.push(actionUpdateLock);

    const { roomTableColumns } = useRooms();
    roomTableColumns.push(actionUpdateDelete);

    const { saleTableColumns } = useSales();
    saleTableColumns.push(actionUpdateDelete);

    const { servicesTableColumns } = useServices();
    servicesTableColumns.push(actionUpdateDelete);

    const { productTableColumns } = useProducts();
    productTableColumns.push(actionUpdateDelete);

    const { bookingTableColumns } = useBookings();
    bookingTableColumns.push({
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 110,
        render: (text, record) => (
            <Space size="middle">
                {(record.status === 'PENDING' || record.status === 'CHECKED_IN') && (
                    <Link
                        title="Add Service"
                        style={{ marginLeft: '12px' }}
                        className="me-3"
                        to={'/admin/update/' + option + '/' + record.id}
                    >
                        <img style={{ width: '24px', height: '24px' }} src={order} alt="img" />
                    </Link>
                )}

                {record.status === 'PENDING' && (
                    <Link
                        title="Check In"
                        onClick={() => {
                            Swal.fire({
                                title: 'Bạn muốn check in đặt phòng này',
                                // showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'Save',
                            }).then(async (swalResult) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (swalResult.isConfirmed) {
                                    await dispatch(
                                        fetchCheckinBookingById({
                                            bookingId: record.id,
                                        }),
                                    )
                                        .then(unwrapResult)
                                        .then((result) => {
                                            if (result.status.code === '00') {
                                                Swal.fire('Check in thành công', '', 'success');
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 1500);
                                            } else {
                                                Swal.fire(result.status.message, '', 'error');
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            Swal.fire('Có lỗi xảy ra', '', 'error');
                                        });
                                } else if (swalResult.isDenied) {
                                    Swal.fire('Changes are not saved', '', 'info');
                                }
                            });
                        }}
                        className="me-3"
                    >
                        <img style={{ width: '24px', height: '24px' }} src={checkIn} alt="img" />
                    </Link>
                )}

                {record.status === 'CHECKED_IN' && (
                    <Link
                        title="Check Out"
                        onClick={() => {
                            Swal.fire({
                                title: 'Bạn muốn check out đặt phòng này',
                                // showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'Save',
                            }).then(async (swalResult) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (swalResult.isConfirmed) {
                                    await dispatch(
                                        fetchCheckoutBookingById({
                                            bookingId: record.id,
                                        }),
                                    )
                                        .then(unwrapResult)
                                        .then((result) => {
                                            if (result.status.code === '00') {
                                                Swal.fire('Check out thành công', '', 'success');
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 1500);
                                            } else {
                                                Swal.fire(result.status.message, '', 'error');
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            Swal.fire('Có lỗi xảy ra', '', 'error');
                                        });
                                } else if (swalResult.isDenied) {
                                    Swal.fire('Changes are not saved', '', 'info');
                                }
                            });
                        }}
                        className="me-3"
                    >
                        <img style={{ width: '24px', height: '24px' }} src={checkOut} alt="img" />
                    </Link>
                )}

                {record.status === 'CHECKED_OUT' && (
                    <Link
                        title="Xem Bill"
                        style={{ marginLeft: '8px' }}
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                const result = await dispatch(fetchGetBooking(record.id)).then(unwrapResult);
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
                        }}
                    >
                        <img style={{ width: '24px', height: '24px' }} src={invoice} alt="img" />
                    </Link>
                )}
            </Space>
        ),
    });

    return (
        <>
            <BillModal displayModal={displayModal} handleCloseModel={handleCloseModel} bookingDetail={bookingDetail} />
            <div className="card">
                <div className="card-body">
                    <div className="table-top">
                        <div className="search-set">
                            <div className="search-path">
                                <button className="btn btn-filter" id="filter_search">
                                    <img src={adminFilter} alt="img" />
                                    <span></span>
                                </button>
                            </div>
                            <div className="search-input">
                                <button className="btn btn-searchset">
                                    <img src={admionSearchWhite} alt="img" />
                                </button>
                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                    <label>
                                        {' '}
                                        <input
                                            onChange={(e) => {
                                                callbackKeyWord(e.target.value);
                                            }}
                                            type="search"
                                            className="form-control form-control-sm"
                                            placeholder="Search..."
                                            aria-controls="DataTables_Table_0"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {option === 'users' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={userTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                    {option === 'rooms' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={roomTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                    {option === 'sales' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={saleTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                    {option === 'bookings' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={bookingTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                    {option === 'services' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={servicesTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                    {option === 'products' && (
                        <>
                            <Table
                                key={(record) => record.id}
                                columns={productTableColumns}
                                dataSource={data}
                                bordered
                                pagination={{
                                    onChange: (page, pageSize) => setPagination({ page, pageSize }),
                                    defaultCurrent: pageSize,
                                    current: pageNum,
                                    total: totalElements,
                                    position: ['bottomCenter'],
                                }}
                                scroll={{ y: 400 }}
                            />{' '}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;
