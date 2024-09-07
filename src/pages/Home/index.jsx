import React, { useState, useEffect } from 'react';
import Service from 'src/components/Home/Service';
import About from 'src/components/Home/About';
import Slider from 'src/components/Home/Slider';
import RoomIntroduction from 'src/components/Home/RoomIntroduction';
import Testimonials from 'src/components/Home/Testimonials';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Blog from 'src/components/Home/Blog';
import { useDispatch } from 'react-redux';
import { fetchGetAvailableRooms } from 'src/stores/roomSlice/roomSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import handleResponse from 'src/utils/handleResponse';
import Swal from 'sweetalert2';

const Home = () => {
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        (async () => {
            await dispatch(fetchGetAvailableRooms({}))
                .then(unwrapResult)
                .then((result) => {
                    console.log('Fetch get rooms result: ', result);
                    if (handleResponse(result)) {
                        return;
                    }
                    setRooms(result.data.items);
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
    }, []);

    return (
        <div>
            <Header />
            <Slider />
            <About />
            <Service />
            <RoomIntroduction rooms={rooms} />
            <Testimonials />
            {/* <Blog posts={posts} /> */}
            <Footer />
        </div>
    );
};

export default Home;
