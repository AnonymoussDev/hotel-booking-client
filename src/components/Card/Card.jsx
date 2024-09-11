import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useRooms } from 'src/composables/useRooms';
import { useUsers } from 'src/composables/useUsers';
import { useSales } from 'src/composables/useSales';
import { useServices } from 'src/composables/useServices';
import { useProducts } from 'src/composables/useProducts';
import { useBookings } from 'src/composables/useBookings';
import { Table, Space, Button } from 'antd';
import BillModal from '../Modal/BillModal2';
import './card.scss';
import Swal from 'sweetalert2';
import handleResponse from 'src/utils/handleResponse';

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
import addSaleIcon from 'src/assets/images/admin/add-sale.png';
import deleteSaleIcon from 'src/assets/images/admin/delete-sale.png';
// import excel from 'src/assets/images/admin/excel.png';
// import pdf from 'src/assets/images/admin/pdf.png';
// import printer from 'src/assets/images/admin/printer.png';
// import eye from 'src/assets/images/admin/eye.png';
import { fetchGetSales } from 'src/stores/saleSlice/saleSlice';
import { fetchAddSaleToRoom, fetchRemoveSaleToRoom } from 'src/stores/roomSlice/roomSlice';
import {
    fetchGetBooking,
    fetchCheckinBookingById,
    fetchCheckoutBookingById,
} from 'src/stores/bookingSlice/bookingSlice';
import { check } from 'prettier';

const Card = ({
    option,
    tab,
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
    setRoomFilter,
}) => {
    const dispatch = useDispatch();
    const [displayModal, setDisplayModal] = useState(false);
    const [bookingDetail, setBookingDetail] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const startDateInit = new Date();
    const endDateInit = new Date();
    endDateInit.setDate(startDateInit.getDate() + 1);
    const [startDate, setStartDate] = useState(startDateInit);
    const [endDate, setEndDate] = useState(endDateInit);

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

    const actionRoom = {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 160,
        render: (text, record) => (
            <>
                {deleteFlag === false ? (
                    <Space size="middle">
                        <span className="me-3 confirm-text my-card-action" onClick={() => addSale(record.id)}>
                            <img style={{ width: '24px', height: '24px' }} src={addSaleIcon} alt="img" />
                        </span>
                        <span className="me-3 confirm-text my-card-action" onClick={() => deleteSale(record.id)}>
                            <img style={{ width: '24px', height: '24px' }} src={deleteSaleIcon} alt="img" />
                        </span>
                        <Link className="me-3" to={'/admin/update/' + option + '/' + record.id}>
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

    const addSales = async () => {
        if (selectedRowKeys.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng chọn các room cần thêm khuyến mãi',
                confirmButtonText: 'OK',
            });
            return;
        }
        let salesObject = {};
        await dispatch(
            fetchGetSales({
                deleteFlag: false,
            }),
        )
            .then(unwrapResult)
            .then((result) => {
                if (result.status.code === '00') {
                    result.data.items.forEach((sale) => {
                        salesObject[sale.id] = `${sale.salePercent}% - (${sale.dayStart} -> ${sale.dayEnd})`;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        await Swal.fire({
            title: 'Select sales',
            input: 'select',
            inputOptions: {
                Sales: salesObject,
            },
            showCancelButton: true,
            preConfirm: (selectedReason) => {
                return selectedReason;
            },
        }).then(async (swalResult) => {
            if (swalResult.isConfirmed) {
                await dispatch(
                    fetchAddSaleToRoom({
                        saleId: swalResult.value,
                        roomIds: selectedRowKeys,
                    }),
                )
                    .then(unwrapResult)
                    .then((result) => {
                        if (handleResponse(result)) {
                            return;
                        }
                        Swal.fire('Thêm khuyến mãi thành công', '', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const addSale = async (roomId) => {
        let salesObject = {};
        await dispatch(
            fetchGetSales({
                deleteFlag: false,
            }),
        )
            .then(unwrapResult)
            .then((result) => {
                if (result.status.code === '00') {
                    result.data.items.forEach((sale) => {
                        salesObject[sale.id] = `${sale.salePercent}% - (${sale.dayStart} -> ${sale.dayEnd})`;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        await Swal.fire({
            title: 'Select sales',
            input: 'select',
            inputOptions: {
                Sales: salesObject,
            },
            showCancelButton: true,
            preConfirm: (selectedReason) => {
                return selectedReason;
            },
        }).then(async (swalResult) => {
            if (swalResult.isConfirmed) {
                await dispatch(
                    fetchAddSaleToRoom({
                        saleId: swalResult.value,
                        roomIds: [roomId],
                    }),
                )
                    .then(unwrapResult)
                    .then((result) => {
                        if (handleResponse(result)) {
                            return;
                        }
                        Swal.fire('Thêm khuyến mãi thành công', '', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const deleteSale = async (roomId) => {
        await Swal.fire({
            title: 'Bạn có chắc chắn xóa khuyến mãi?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận',
            cancelButtonText: 'Hủy bỏ',
        }).then(async (e) => {
            if (e.isConfirmed) {
                await dispatch(
                    fetchRemoveSaleToRoom({
                        roomIds: [roomId],
                    }),
                )
                    .then(unwrapResult)
                    .then((result) => {
                        if (handleResponse(result)) {
                            return;
                        }
                        Swal.fire('Xóa khuyến mãi thành công', '', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire('Lỗi Server', '', 'error');
                    });
            }
        });
    };

    const deleteSales = async () => {
        if (selectedRowKeys.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng chọn các room cần xóa khuyến mãi',
                confirmButtonText: 'OK',
            });
            return;
        }
        await Swal.fire({
            title: 'Bạn có chắc chắn xóa khuyến mãi của các room này?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận',
            cancelButtonText: 'Hủy bỏ',
        }).then(async (e) => {
            if (e.isConfirmed) {
                await dispatch(
                    fetchRemoveSaleToRoom({
                        roomIds: selectedRowKeys,
                    }),
                )
                    .then(unwrapResult)
                    .then((result) => {
                        if (handleResponse(result)) {
                            return;
                        }
                        Swal.fire('Xóa khuyến mãi thành công', '', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire('Lỗi Server', '', 'error');
                    });
            }
        });
    };

    const rawData = data.map((item) => ({
        key: item.id,
        ...item,
    }));
    const { userTableColumns } = useUsers();
    userTableColumns.push(actionUpdateLock);

    const { roomTableColumns, roomAvailableTableColumns } = useRooms();
    roomTableColumns.push(actionRoom);

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
                <Link
                    title="Add Service"
                    style={{ marginLeft: '12px' }}
                    className="me-3"
                    to={'/admin/update/' + option + '/' + record.id}
                >
                    <img style={{ width: '24px', height: '24px' }} src={order} alt="img" />
                </Link>

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

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const changeStartDate = (date) => {
        setStartDate(date);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        setEndDate(nextDate);
    };

    const changeEndDate = (date) => {
        setEndDate(date);
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="calendar" onClick={onClick} ref={ref}>
            <input
                type="text"
                style={{
                    background: '0 0',
                    height: '40px',
                    border: '1px solid rgba(145, 158, 171, 0.32)',
                    borderRadius: '5px',
                    padding: '0 0px 0 15px',
                }}
                value={value}
                readOnly
            />
            <div>
                <i className="fa-regular fa-calendar"></i>
            </div>
        </div>
    ));

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
                                <div
                                    id="DataTables_Table_0_filter"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    className="dataTables_filter"
                                >
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
                                    {option === 'rooms' && tab === 'tab1' && (
                                        <>
                                            <Button
                                                style={{ marginLeft: '20px' }}
                                                type="primary"
                                                onClick={() => addSales()}
                                            >
                                                Add Sale
                                            </Button>
                                            <Button
                                                style={{ marginLeft: '20px' }}
                                                type="primary"
                                                onClick={() => deleteSales()}
                                            >
                                                Remove Sale
                                            </Button>
                                        </>
                                    )}
                                    {option === 'rooms' && tab === 'tab3' && (
                                        <>
                                            <Space className="manage-card" style={{ marginLeft: '20px' }}>
                                                <h6>Check-in</h6>
                                                <DatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={startDate}
                                                    onChange={changeStartDate}
                                                    startDate={startDate}
                                                    minDate={new Date()}
                                                    customInput={<CustomInput />}
                                                />
                                            </Space>
                                            <Space className="manage-card" style={{ marginLeft: '20px' }}>
                                                <h6>Check-out</h6>
                                                <DatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={endDate}
                                                    onChange={changeEndDate}
                                                    startDate={endDate}
                                                    minDate={endDate}
                                                    customInput={<CustomInput />}
                                                />
                                            </Space>
                                            <Button
                                                style={{ marginLeft: '20px' }}
                                                type="primary"
                                                onClick={() => {
                                                    setRoomFilter({ checkIn: startDate, checkOut: endDate });
                                                }}
                                            >
                                                Search
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {option === 'users' && (
                        <>
                            <Table
                                columns={userTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                    {option === 'rooms' && (
                        <>
                            <Table
                                rowSelection={rowSelection}
                                columns={tab !== 'tab3' ? roomTableColumns : roomAvailableTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                    {option === 'sales' && (
                        <>
                            <Table
                                columns={saleTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                    {option === 'bookings' && (
                        <>
                            <Table
                                columns={bookingTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                    {option === 'services' && (
                        <>
                            <Table
                                columns={servicesTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                    {option === 'products' && (
                        <>
                            <Table
                                columns={productTableColumns}
                                dataSource={rawData}
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;
