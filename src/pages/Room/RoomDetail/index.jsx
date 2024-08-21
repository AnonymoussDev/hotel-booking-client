import Title from 'src/components/Title';
import Header from 'src/components/Header';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import './roomDetail.scss';
import OwlCarousel from 'react-owl-carousel';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';
import avtPreview from 'src/assets/images/avt-preview.png';
import { formatDateRating, getCurrentDateRating } from 'src/utils/timeUtils';

import { fetchGetRoomDetail, fetchPostRoomRating, fetchRatingByRoomId } from 'src/stores/roomSlice/roomSlice';

const RoomDetail = () => {
    let { roomId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const [room, setRoom] = useState({});
    const [roomRating, setRoomRating] = useState([]);
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        window.scrollTo(0, 245);
    }, []);

    useEffect(() => {
        (async () => {
            await dispatch(fetchGetRoomDetail(roomId))
                .then(unwrapResult)
                .then((result) => {
                    if (handleResponse(result)) {
                        return;
                    }
                    setRoom(result.data);
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                    });
                });
            await dispatch(fetchRatingByRoomId(roomId))
                .then(unwrapResult)
                .then((result) => {
                    if (handleResponse(result)) {
                        return;
                    }
                    setRoomRating(result.data.items);
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
    }, [dispatch, roomId]);

    const handleEvaluate = (star) => {
        setStar(5 - star);
    };

    const oldStars = (star) => {
        let ans = [];
        for (let i = 0; i < 5; i++) {
            ans.push(
                <i
                    key={i}
                    className={star > i ? 'icon_star' : 'fa-sharp fa-regular fa-star'}
                    style={{ color: '#f5b917' }}
                ></i>,
            );
        }
        return ans;
    };

    const stars = () => {
        let ans = [];
        for (let i = 0; i < 5; i++) {
            ans.push(
                <input
                    type="radio"
                    name="star"
                    onClick={() => {
                        handleEvaluate(i);
                    }}
                />,
            );
        }
        return ans;
    };

    const handleComment = async () => {
        await dispatch(
            fetchPostRoomRating({
                crateRoomRatingDto: { star, comment },
                roomId: roomId,
            }),
        )
            .then(unwrapResult)
            .then((result) => {
                if (handleResponse(result)) {
                    return;
                }
                // setComment((prev) => [...prev, originalPromiseResult.data]);
                setStar('');
                setComment('');
                setRoomRating([...roomRating, result.data]);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                });
            });
    };

    return (
        <div>
            <Header />
            {Title('Our Rooms', 'Rooms')}
            {/* Breadcrumb Section End */}
            {/* Rooms Section Begin */}
            <section className="room-details-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="room-details-item">
                                <OwlCarousel
                                    style={{
                                        // position: "absolute",
                                        top: '0',
                                        width: '100%',
                                    }}
                                    className="owl-main hero-slider"
                                    items={1}
                                    loop
                                >
                                    {room?.medias?.map((media) => {
                                        return (
                                            <div key={media.id} className="item hs-item set-bg">
                                                <img
                                                    style={{ width: '100%', height: '450px' }}
                                                    src={media.url}
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                </OwlCarousel>
                                <div className="rd-text">
                                    <div className="rd-title">
                                        <h3 style={{ fontSize: '24px' }}>{room.name}</h3>
                                        <div className="rdt-right">
                                            <div className="rating">
                                                <i className="icon_star" />
                                                <i className="icon_star" />
                                                <i className="icon_star" />
                                                <i className="icon_star" />
                                                <i className="icon_star-half_alt" />
                                            </div>
                                            <Link to="/booking">Booking Now</Link>
                                        </div>
                                    </div>
                                    <h2>
                                        {room &&
                                            room?.price?.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        <span>/Pernight</span>
                                    </h2>
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
                                    <p className="f-para">{room.description}</p>
                                </div>
                            </div>
                            <div className="rd-reviews">
                                <h4>Reviews</h4>
                                {roomRating &&
                                    roomRating.map((rating) => (
                                        <div key={rating.id} className="review-item">
                                            <div style={{}} className="evaluate">
                                                <div className="star flex flex-row-reverse">
                                                    {/* {oldStars(rating.star)} */}
                                                </div>

                                                <p
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: '400',
                                                        textAlign: 'center',
                                                        paddingBottom: '12px',
                                                    }}
                                                ></p>
                                            </div>
                                            <div className="ri-pic">
                                                <img
                                                    src={rating.creator.avatar ? rating.creator.avatar : avtPreview}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ri-text">
                                                <span>{formatDateRating(rating.createdDate)}</span>
                                                <div className="rating">{oldStars(rating.star)}</div>
                                                <h5>
                                                    {rating.creator?.lastName.concat(' ' + rating.creator.firstName)}
                                                </h5>
                                                <p>{rating.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="rd-reviews">
                                <h4>Add Review</h4>
                                <div style={{ display: 'flex', alignItems: 'center' }} className="review-item">
                                    <h5>You Rating:</h5>
                                    <div style={{ marginLeft: '44px' }} className="evaluate">
                                        <div className="star flex flex-row-reverse">{stars()}</div>
                                        <p
                                            style={{
                                                fontSize: '18px',
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                paddingBottom: '12px',
                                            }}
                                        ></p>
                                    </div>
                                </div>
                                <div className="review-item">
                                    <div className="ri-pic">
                                        <img
                                            src={Object.keys(user).length > 0 && user.avatar ? user.avatar : avtPreview}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ri-text">
                                        <span>{getCurrentDateRating()}</span>
                                        <div className="rating">
                                            {/* <i className="icon_star" />
                                            <i className="icon_star" />
                                            <i className="icon_star" />
                                            <i className="icon_star" />
                                            <i className="icon_star" /> */}
                                        </div>
                                        <h5>
                                            {Object.keys(user).length > 0 && user.lastName.concat(' ' + user.firstName)}
                                        </h5>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderColor: '#E5E5E5',
                                            }}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Your Review"
                                        />
                                    </div>
                                </div>
                                <a
                                    style={{
                                        display: 'inline-block',
                                        color: '#ffffff',
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        background: '#5892b5',
                                        padding: '14px 28px 13px',
                                    }}
                                    onClick={handleComment}
                                >
                                    Submit Now
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="room-booking">
                                <h3>Your Reservation</h3>
                                <form action="#">
                                    <div className="check-date">
                                        <label htmlFor="date-in">Check In:</label>
                                        <input type="text" className="date-input" id="date-in" />
                                        <i className="icon_calendar" />
                                    </div>
                                    <div className="check-date">
                                        <label htmlFor="date-out">Check Out:</label>
                                        <input type="text" className="date-input" id="date-out" />
                                        <i className="icon_calendar" />
                                    </div>
                                    <div style={{ width: '100%' }} className="select-option">
                                        <label htmlFor="guest">Guests:</label>
                                        <select
                                            className="custom-select"
                                            style={{ width: '100%', height: '50px' }}
                                            id="guest"
                                        >
                                            <option defaultValue={1}>1 person</option>
                                            <option defaultValue={2}>2 persons</option>
                                            <option defaultValue={3}>3 persons</option>
                                            <option defaultValue={4}>4 persons</option>
                                            <option defaultValue={5}>5 persons</option>
                                            <option defaultValue={6}>6 persons</option>
                                            <option defaultValue={7}>7 persons</option>
                                        </select>
                                    </div>
                                    <button type="button">Check Availability</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoomDetail;
