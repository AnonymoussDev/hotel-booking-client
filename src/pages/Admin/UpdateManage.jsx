import AdminHeader from 'src/components/AdminHeader';
import AdminSIdeBar from 'src/components/AdminSideBar';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { fetchGetRoomAdmin, fetchUpdateRoom } from 'src/stores/roomSlice/roomSlice';
import { fetchGetHotelServiceAdmin, fetchUpdateHotelService } from 'src/stores/hotelServiceSlice/hotelServiceSlice';
import { fetchGetProductAdmin, fetchUpdateProduct } from 'src/stores/productSlice/productSlice';
import { fetchGetSale, fetchUpdateSale } from 'src/stores/saleSlice/saleSlice';
import { fetchGetUser, fetchUpdateUser } from 'src/stores/userSlice/userSlice';
import { fetchGetBooking } from 'src/stores/bookingSlice/bookingSlice';
// import { fetchGetPost, fetchUpdatePost } from 'src/stores/postSlice/postSlice';

import bookingInterface from 'src/interfaces/booking.interface.js';
import servicesInterface from 'src/interfaces/service.interface.js';
import salesInterface from 'src/interfaces/sales.interface';
import roomsInterface from 'src/interfaces/rooms.interface';
import usersInterface from 'src/interfaces/users.interface';
import productInterface from 'src/interfaces/product.interface';
import postInterface from 'src/interfaces/post.interface';
import Modal from 'src/components/Modal/Modal';
import './addManage.scss';

import UpdateBooking from 'src/components/UpdateManager/UpdateBooking';
import UpdateRoom from 'src/components/UpdateManager/UpdateRoom';

const UpdateManage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { option, optionId } = useParams();

    const [keys, setKeys] = useState([]);
    const [data, setData] = useState({});
    const [value, setValue] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const [statusModal, setStatusModal] = useState('');
    const [messageModal, setMessageModal] = useState('');
    const [virtualImg, setVirtualImg] = useState([]);
    const [virtualOldImg, setVirtualOldImg] = useState(['assets/img/icons/upload.svg']);

    const callback = () => {
        setDisplayModal(false);
        setStatusModal('');
        setMessageModal('');
    };

    useEffect(() => {
        (async () => {
            let func;
            let fields;
            if (option === 'rooms') {
                func = fetchGetRoomAdmin(optionId);
            } else if (option === 'sales') {
                delete salesInterface['id'];
                delete salesInterface['dayStart'];
                delete salesInterface['dayEnd'];
                fields = [...Object.keys(salesInterface)];
                setKeys([...Object.keys(salesInterface)]);
                setData({ ...roomsInterface });
                func = fetchGetSale(optionId);
            } else if (option === 'users') {
                delete usersInterface['email'];
                delete usersInterface['password'];
                delete usersInterface['enabled'];
                delete usersInterface['pattern'];
                delete usersInterface['gender'];
                fields = [...Object.keys(usersInterface)];
                setKeys([...Object.keys(usersInterface)]);
                setData({ ...usersInterface });
                func = fetchGetUser(optionId);
            } else if (option === 'services') {
                delete servicesInterface['id'];
                fields = [...Object.keys(servicesInterface)];
                setKeys([...Object.keys(servicesInterface)]);
                setData({ ...servicesInterface });
                func = fetchGetHotelServiceAdmin(optionId);
            } else if (option === 'products') {
                fields = [...Object.keys(productInterface)];
                setKeys([...Object.keys(productInterface)]);
                setData({ ...productInterface });
                func = fetchGetProductAdmin(optionId);
            } else if (option === 'bookings') {
                func = fetchGetBooking(optionId);
            }
            // } else if (option === 'posts') {
            //     fields = [...Object.keys(postInterface)];
            //     setKeys([...Object.keys(postInterface)]);
            //     setData({ ...postInterface });
            //     func = fetchGetPost(optionId);
            // }

            await dispatch(func)
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                    const data = originalPromiseResult.data;
                    console.log(data);
                    if (data?.medias) {
                        setVirtualOldImg([...data.medias]);
                        data['medias'] = data.medias.map((media) => media.id);
                    }
                    if (data?.thumbnail) {
                        setVirtualOldImg(data?.thumbnail);
                        // data["medias"] = data.medias.map((media) => media.id);
                    }
                    setData(data);
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                    // handle result here
                });
        })();
    }, [option, optionId]);

    const updateOption = async () => {
        let func;
        delete data['id'];

        if (option === 'rooms') {
            // if (!data.type) {
            //     data.type = 'Standard Single';
            // }
            delete data['medias'];
            let files = data['files'] ? data['files'] : [];
            delete ['files'];
            let formData = new FormData();
            for (let file of files) {
                formData.append('newMediaFiles', file);
            }
            for (let i in data) {
                formData.append(i, data[i]);
            }
            func = fetchUpdateRoom({ roomId: optionId, updateRoomDto: formData });
        } else if (option === 'sales') {
            func = fetchUpdateSale({ saleId: optionId, updateSaleDto: data });
        } else if (option === 'users') {
            func = fetchUpdateUser({ userId: optionId, updateUserDto: data });
        } else if (option === 'services') {
            let formData = new FormData();
            for (let i in data) {
                formData.append(i, data[i]);
            }
            func = fetchUpdateHotelService({
                serviceId: optionId,
                updateServiceDto: formData,
            });
        } else if (option === 'products') {
            let formData = new FormData();
            for (let i in data) {
                formData.append(i, data[i]);
            }
            func = fetchUpdateProduct({
                productId: optionId,
                productUpdateDto: formData,
            });
        }
        // else if (option == 'posts') {
        //     console.log(data['medias']);
        //     data['mediaIds[]'] = data['medias'] ? data['medias'] : [];
        //     console.log(data);
        //     delete data['medias'];
        //     let files = data['files'] ? data['files'] : [];
        //     delete ['files'];
        //     let formData = new FormData();
        //     for (let file of files) {
        //         formData.append('files', file);
        //     }
        //     for (let i in data) {
        //         formData.append(i, data[i]);
        //     }
        //     func = fetchUpdatePost({ postId: optionId, updatePostDto: formData });
        // }
        await dispatch(func)
            .then(unwrapResult)
            .then((originalPromiseResult) => {
                console.log('result', originalPromiseResult);
                if (originalPromiseResult.status.code === '00') {
                    setDisplayModal(true);
                    setStatusModal('success');
                    setMessageModal('Cập nhật thành công');
                } else {
                    setDisplayModal(true);
                    setStatusModal('failure');
                    setMessageModal('Cập nhật thất bại');
                }
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError);
                setDisplayModal(true);
                setStatusModal('failure');
                setMessageModal('Cập nhật thất bại');
                // handle result here
            });
    };

    const handleDeleteImage = (option, index) => {
        if (option === 'old') {
            const removedMedia = virtualOldImg[index];
            virtualOldImg.splice(index, 1);
            setVirtualOldImg([...virtualOldImg]);
            setData((prevState) => {
                // Lấy deleteMediaIds hiện tại từ prevState (nếu có) hoặc khởi tạo mảng mới
                const updatedDeleteMediaIds = prevState.deleteMediaIds ? [...prevState.deleteMediaIds] : [];

                // Thêm id của phần tử vừa bị xóa vào deleteMediaIds
                if (removedMedia && removedMedia.id) {
                    updatedDeleteMediaIds.push(removedMedia.id);
                }

                // Trả về state mới, giữ lại các giá trị cũ và cập nhật deleteMediaIds
                return {
                    ...prevState,
                    deleteMediaIds: updatedDeleteMediaIds,
                };
            });
        } else if (option === 'new') {
            virtualImg.splice(index, 1);
            setVirtualImg([...virtualImg]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="main-wrapper">
            <Modal
                displayModal={displayModal}
                statusModal={statusModal}
                messageModal={messageModal}
                callback={callback}
                url={'/admin/' + option}
                // displayStatus="true"
                // message="Cập nhật thành công"
                // status="success"
            />
            <AdminHeader />
            <AdminSIdeBar option={option} />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>{option.charAt(0).toUpperCase() + option.slice(1)} Management</h4>
                            <h6>Update {option.charAt(0).toUpperCase() + option.slice(1)}</h6>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {option === 'bookings' && <UpdateBooking data={data} setData={setData} />}
                            {option === 'rooms' && (
                                <UpdateRoom
                                    data={data}
                                    setData={setData}
                                    setValue={setValue}
                                    virtualOldImg={virtualOldImg}
                                    setVirtualImg={setVirtualImg}
                                    virtualImg={virtualImg}
                                    handleDeleteImage={handleDeleteImage}
                                />
                            )}
                            <div className="row">
                                {option !== 'bookings' &&
                                    option !== 'rooms' &&
                                    keys &&
                                    keys.map((key) => (
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label>{key}</label>
                                                <input
                                                    onChange={(e) => {
                                                        setData((prevState) => {
                                                            prevState[key] = e.target.value;
                                                            console.log(prevState);
                                                            return prevState;
                                                        });
                                                        setValue(e.target.value);
                                                    }}
                                                    type="text"
                                                    value={data[key]}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                {option === 'sales' && (
                                    <>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label>Day start</label>
                                                <input
                                                    style={{
                                                        width: '100%',
                                                        padding: '6px',
                                                    }}
                                                    type="datetime-local"
                                                    onChange={(e) => {
                                                        setData((prevState) => {
                                                            prevState['dayStart'] = formatDate(e.target.value);
                                                            return prevState;
                                                        });
                                                        setValue(e.target.value);
                                                    }}
                                                    value={data['dayStart']}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label>Day end</label>
                                                <input
                                                    style={{
                                                        width: '100%',
                                                        padding: '6px',
                                                    }}
                                                    type="datetime-local"
                                                    onChange={(e) => {
                                                        setData((prevState) => {
                                                            prevState['dayEnd'] = formatDate(e.target.value);
                                                            return prevState;
                                                        });
                                                        setValue(e.target.value);
                                                    }}
                                                    value={data['dayEnd']}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(option === 'services' || option === 'products') && (
                                    <>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label> {option.charAt(0).toUpperCase() + option.slice(1)} Image</label>
                                                <div className="image-upload">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            setData((prevState) => {
                                                                prevState['thumbnailFile'] = e.target.files[0];
                                                                prevState['thumbnail'] = '';
                                                                setVirtualOldImg(
                                                                    URL.createObjectURL(e.target.files[0]),
                                                                );
                                                                return prevState;
                                                            });
                                                        }}
                                                    />
                                                    <div className="image-uploads">
                                                        <div className="image-uploads-imgs">
                                                            {virtualOldImg && (
                                                                <div className="image-uploads-img">
                                                                    <img src={virtualOldImg} alt="img" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h4>Drag and drop a file to upload</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {option !== 'bookings' && (
                                    <div style={{ marginTop: '30px' }} className="col-lg-12">
                                        <button
                                            style={{ marginRight: '12px' }}
                                            className="btn btn-submit me-2"
                                            onClick={updateOption}
                                        >
                                            Update
                                        </button>
                                        <Link className="btn btn-cancel" to={'/admin/' + option}>
                                            Cancel
                                        </Link>
                                        {/* <button className="btn btn-cancel"></button> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateManage;
