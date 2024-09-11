import { MDBIcon, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { useParams, Link } from 'react-router-dom';
import AdminHeader from 'src/components/AdminHeader';
import AdminSideBar from 'src/components/AdminSideBar';

import adminPlus from 'src/assets/images/admin/adminPlus.png';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { React, useEffect, useState } from 'react';
import {
    fetchDeletePermanentlyRoom,
    fetchDeleteRoom,
    fetchGetRoomsAdmin,
    fetchGetRoomAvailablesAdmin,
    fetchRevertRoomById,
} from 'src/stores/roomSlice/roomSlice';
import {
    fetchDeleteHotelService,
    fetchDeletePermanentlyHotelService,
    fetchGetHotelServicesAdmin,
    fetchRevertHotelService,
} from 'src/stores/hotelServiceSlice/hotelServiceSlice';
import {
    fetchDeletePermanentlySale,
    fetchDeleteSale,
    fetchGetSales,
    fetchRevertSale,
} from 'src/stores/saleSlice/saleSlice';
import { fetchDeleteUser, fetchGetUsers, fetchLockUnlockUser } from 'src/stores/userSlice/userSlice';
import {
    fetchDeletePermanentlyProduct,
    fetchDeleteProduct,
    fetchGetProductsAdmin,
    fetchRevertProduct,
} from 'src/stores/productSlice/productSlice';
import { fetchGetBookingsAdmin } from 'src/stores/bookingSlice/bookingSlice';
import Swal from 'sweetalert2';
import Card from 'src/components/Card/Card';

const Manage = () => {
    const dispatch = useDispatch();
    let { option } = useParams();

    const [iconsActive, setIconsActive] = useState('tab1');
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTtotalElements] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState({ key: option, data: [] });

    const startDateInit = new Date();
    const endDateInit = new Date();
    endDateInit.setDate(startDateInit.getDate() + 1);
    const [roomFilter, setRoomFilter] = useState({
        checkIn: startDateInit,
        checkOut: endDateInit,
    });

    useEffect(() => {
        // Đặt lại các state về giá trị ban đầu khi option thay đổi
        setIconsActive('tab1');
        setDeleteFlag(false);
        setPageNum(1);
        setPageSize(10);
        setTtotalElements(0);
        setKeyword('');
    }, [option]); // useEffect sẽ chạy khi option thay đổi

    const callbackKeyWord = (keyword) => {
        setKeyword(keyword);
    };

    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }
        if (value === 'tab1') {
            setDeleteFlag(false);
            setPageNum(1);
            setPageSize(10);
            setTtotalElements(0);
            setKeyword('');
        } else if (value === 'tab2') {
            setDeleteFlag(true);
            setPageNum(1);
            setPageSize(10);
            setTtotalElements(0);
            setKeyword('');
        } else if (value === 'tab3') {
            setDeleteFlag(false);
            setPageNum(1);
            setPageSize(10);
            setTtotalElements(0);
            setKeyword('');
        }
        setIconsActive(value);
    };

    const setDateFormat = (date) => {
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        const year = date.getFullYear();

        return year + '-' + month + '-' + day;
    };

    useEffect(() => {
        (async () => {
            console.log(roomFilter);

            let func;
            if (option === 'rooms' && iconsActive !== 'tab3') {
                func = fetchGetRoomsAdmin({ deleteFlag, pageNum, pageSize, keyword });
            } else if (option === 'rooms' && iconsActive === 'tab3') {
                func = fetchGetRoomAvailablesAdmin({
                    pageNum,
                    pageSize,
                    keyword,
                    checkIn: setDateFormat(roomFilter.checkIn),
                    checkOut: setDateFormat(roomFilter.checkOut),
                });
            } else if (option === 'sales') {
                func = fetchGetSales({ deleteFlag, pageNum, pageSize, keyword });
            } else if (option === 'users') {
                func = fetchGetUsers({ isLocked: deleteFlag, pageNum, pageSize, keyword });
            } else if (option === 'services') {
                console.log('services');
                func = fetchGetHotelServicesAdmin({ deleteFlag, pageNum, pageSize, keyword });
            } else if (option === 'products') {
                func = fetchGetProductsAdmin({ deleteFlag, pageNum, pageSize, keyword });
            } else if (option === 'bookings') {
                func = fetchGetBookingsAdmin({ deleteFlag, pageNum, pageSize, keyword });
            }
            // else if (option == 'posts') {
            //     func = fetchGetPostsAdmin({ deleteFlag, pageNum, keyword });
            //     setKeys([...Object.keys(postInterface)]);
            // }
            await dispatch(func)
                .then(unwrapResult)
                .then((result) => {
                    if (result.status.code === '00') {
                        let data = result.data.items;
                        if (result.data.meta.totalElements !== 0) {
                            setTtotalElements(result.data.meta.totalElements);
                        }
                        setData({ key: option, data: data });
                    } else {
                        Swal.fire('Lỗi server', '', 'error');
                    }
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                });
        })();
    }, [option, deleteFlag, pageNum, pageSize, keyword, iconsActive, roomFilter]);

    const deleteOption = async (idToUpdate) => {
        let func;
        if (option === 'rooms') {
            if (deleteFlag === false) {
                func = fetchDeleteRoom(idToUpdate);
            } else {
                func = fetchDeletePermanentlyRoom(idToUpdate);
            }
        } else if (option === 'users') {
            if (deleteFlag === false) {
                func = fetchLockUnlockUser({ userId: idToUpdate, isLocked: true });
            } else {
                func = fetchDeleteUser(idToUpdate);
            }
        } else if (option === 'sales') {
            if (deleteFlag === false) {
                func = fetchDeleteSale(idToUpdate);
            } else {
                func = fetchDeletePermanentlySale(idToUpdate);
            }
        } else if (option === 'services') {
            if (deleteFlag === false) {
                func = fetchDeleteHotelService(idToUpdate);
            } else {
                func = fetchDeletePermanentlyHotelService(idToUpdate);
            }
        } else if (option === 'products') {
            if (deleteFlag === false) {
                func = fetchDeleteProduct(idToUpdate);
            } else {
                func = fetchDeletePermanentlyProduct(idToUpdate);
            }
        }
        // else if (option == 'posts') {
        //     if (deleteFlag == false) {
        //         func = fetchDeletePost(id);
        //     } else {
        //         func = fetchDeletePermanentlyPost(id);
        //     }
        // }
        Swal.fire({
            title: option === 'users' ? 'Bạn có chắc chắn khóa tài khoản này' : 'Bạn có chắc chắn xóa ?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận',
            cancelButtonText: 'Hủy bỏ',
        }).then(async (e) => {
            if (e.isConfirmed) {
                await dispatch(func)
                    .then(unwrapResult)
                    .then((result) => {
                        if (result.status.code === '00') {
                            const newData = data.data.filter((item) => item.id !== idToUpdate);
                            setData({ key: option, data: newData });
                            Swal.fire(
                                option === 'users' ? 'Khóa tài khoản thành công' : 'Xóa dữ liệu thành công',
                                '',
                                'success',
                            );
                        } else {
                            Swal.fire('Lỗi Server', '', 'error');
                        }
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                        Swal.fire('Lỗi Server', '', 'error');
                    });
            }
        });
    };

    const revertOption = async (idToRemove) => {
        let func;
        if (option === 'rooms') {
            func = fetchRevertRoomById(idToRemove);
        } else if (option === 'users') {
            func = fetchLockUnlockUser({ userId: idToRemove, isLocked: false });
        } else if (option === 'sales') {
            func = fetchRevertSale(idToRemove);
        } else if (option === 'services') {
            func = fetchRevertHotelService(idToRemove);
        } else if (option === 'products') {
            func = fetchRevertProduct(idToRemove);
        }
        // else if (option == 'posts') {
        //     func = fetchRevertPost(id);
        // }
        Swal.fire({
            title:
                option === 'users'
                    ? 'Bạn có chắc chắn mở khóa tài khoản này ?'
                    : 'Bạn có chắc chắn khôi phục dữ liệu này ?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận',
        }).then(async (e) => {
            if (e.isConfirmed) {
                await dispatch(func)
                    .then(unwrapResult)
                    .then((originalPromiseResult) => {
                        console.log('delete', originalPromiseResult);
                        Swal.fire(
                            option === 'users' ? 'Mở khóa tài khoản thành công!' : 'Khôi phục dữ liệu thành công!',
                            '',
                            'success',
                        );
                        const newData = data.data.filter((item) => item.id !== idToRemove);
                        setData({ key: option, data: newData });
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                        Swal.fire('Có lỗi xảy ra', '', 'error');
                    });
            }
        });
    };

    return (
        <>
            <div className="main-wrapper">
                <AdminHeader />
                <AdminSideBar option={option} />
                <div className="page-wrapper">
                    <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h5 style={{ fontSize: '16px' }}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)} List
                                </h5>
                                <h6>Manage your {option.charAt(0).toUpperCase() + option.slice(1)}</h6>
                            </div>
                            {option !== 'users' && option !== 'bookings' && (
                                <div className="page-btn">
                                    <Link className="btn btn-added" to={'/admin/add/' + option}>
                                        <img src={adminPlus} alt="img" />
                                        Add {option}
                                    </Link>
                                </div>
                            )}
                        </div>
                        <>
                            <MDBTabs className="mb-3">
                                <MDBTabsItem>
                                    <MDBTabsLink
                                        onClick={() => handleIconsClick('tab1')}
                                        active={iconsActive === 'tab1'}
                                    >
                                        <MDBIcon fas icon="database" />{' '}
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink
                                        onClick={() => handleIconsClick('tab2')}
                                        active={iconsActive === 'tab2'}
                                    >
                                        {option === 'users' && (
                                            <>
                                                <MDBIcon fas icon="lock" /> Lock
                                            </>
                                        )}
                                        {option !== 'users' && option !== 'bookings' && (
                                            <>
                                                <MDBIcon fas icon="trash-alt" /> Trash
                                            </>
                                        )}
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                {option === 'rooms' && (
                                    <MDBTabsItem>
                                        <MDBTabsLink
                                            onClick={() => handleIconsClick('tab3')}
                                            active={iconsActive === 'tab3'}
                                        >
                                            <MDBIcon fas icon="database" /> Available
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                )}
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane show={iconsActive === 'tab1'}>
                                    <Card
                                        option={option}
                                        tab={iconsActive}
                                        data={option === data.key ? data.data : []}
                                        pageNum={pageNum}
                                        setPageNum={setPageNum}
                                        pageSize={pageSize}
                                        setPageSize={setPageSize}
                                        totalElements={totalElements}
                                        deleteOption={deleteOption}
                                        deleteFlag={deleteFlag}
                                        callbackKeyWord={callbackKeyWord}
                                    />
                                </MDBTabsPane>
                                <MDBTabsPane show={iconsActive === 'tab2'}>
                                    <Card
                                        option={option}
                                        tab={iconsActive}
                                        data={option === data.key ? data.data : []}
                                        pageNum={pageNum}
                                        setPageNum={setPageNum}
                                        pageSize={pageSize}
                                        setPageSize={setPageSize}
                                        totalElements={totalElements}
                                        deleteOption={deleteOption}
                                        revertOption={revertOption}
                                        deleteFlag={deleteFlag}
                                        callbackKeyWord={callbackKeyWord}
                                    />
                                </MDBTabsPane>
                                {option === 'rooms' && (
                                    <MDBTabsPane show={iconsActive === 'tab3'}>
                                        <Card
                                            option={option}
                                            tab={iconsActive}
                                            data={option === data.key ? data.data : []}
                                            pageNum={pageNum}
                                            setPageNum={setPageNum}
                                            pageSize={pageSize}
                                            setPageSize={setPageSize}
                                            totalElements={totalElements}
                                            deleteOption={deleteOption}
                                            revertOption={revertOption}
                                            deleteFlag={deleteFlag}
                                            callbackKeyWord={callbackKeyWord}
                                            setRoomFilter={setRoomFilter}
                                        />
                                    </MDBTabsPane>
                                )}
                                {/* <MDBTabsPane show={iconsActive === 'tab3'}>Tab 3 content</MDBTabsPane> */}
                            </MDBTabsContent>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manage;
