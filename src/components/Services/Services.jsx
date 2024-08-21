/* eslint-disable jsx-a11y/anchor-is-valid */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGetHotelServices } from 'src/stores/hotelServiceSlice/hotelServiceSlice';
import { fetchGetProductsByService } from 'src/stores/productSlice/productSlice';
import './services.scss';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';

const Services = ({ serviceCallBack }) => {
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    const [html, setHtml] = useState('');
    useEffect(() => {
        (async () => {
            await dispatch(fetchGetHotelServices())
                .then(unwrapResult)
                .then((result) => {
                    console.log('Fetch get services result: ', result);
                    if (handleResponse(result)) {
                        return;
                    }
                    setServices(result.data.items);
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                    });
                });
        })();
    }, []);

    return (
        <>
            {services &&
                services.map((service, index) => (
                    <div key={index} className="booking-servies">
                        <div className="booking-servies__left">
                            <img src={service.thumbnail} />
                        </div>
                        <div className="booking-servies__right">
                            <h4>{service.title}</h4>
                            <p>
                                {service.description.length <= 130
                                    ? service.description
                                    : service.description.slice(0, 126).concat('...')}
                            </p>
                            {service &&
                                service?.price?.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            <div>
                                <button
                                    className="btn btn-link p-0"
                                    onClick={(e) => {
                                        serviceCallBack(service);
                                    }}
                                >
                                    Add service
                                </button>
                                <a
                                    onClick={async () => {
                                        await dispatch(fetchGetProductsByService(service.id))
                                            .then(unwrapResult)
                                            .then((result) => {
                                                console.log('Fetch get products result: ', result);
                                                if (handleResponse(result)) {
                                                    return;
                                                }

                                                console.log(result);
                                                let products = result.data.items;
                                                let html = `
                            <ul>
                          `;
                                                html += products.map((item) => {
                                                    return `
                            <li style="display: flex; margin-bottom: 12px;">
                              <img style="width: 180px; height: 180px; object-fit: cover;" src=${item.thumbnail}>
                              <h3 style="margin-left: 12px">${item.name}</h3>
                            </li>
                            `;
                                                });

                                                html += `
                            </ul>
                          `;
                                                setHtml(html);
                                                Swal.fire({
                                                    title: 'Danh sách sản phẩm',
                                                    html,
                                                    showClass: {
                                                        popup: 'animate__animated animate__fadeInDown',
                                                    },
                                                    hideClass: {
                                                        popup: 'animate__animated animate__fadeOutUp',
                                                    },
                                                });
                                                console.log(html);

                                                // console.log(services);
                                                // handle result here
                                            })
                                            .catch((rejectedValueOrSerializedError) => {
                                                console.log(rejectedValueOrSerializedError);
                                                // handle result here
                                            });
                                    }}
                                    style={{ marginLeft: '12px' }}
                                >
                                    Chi tiết dịch vụ
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default Services;
