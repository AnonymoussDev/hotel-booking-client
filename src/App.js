import AppRouter from 'src/routes';
import storageService from 'src/services/storage.service';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import handleResponse from 'src/utils/handleResponse';
import { fetchGetCurrentUser, setUser } from 'src/stores/authSlice/authSlice';
import Swal from 'sweetalert2';
import { initiateSocketConnection, disconnectSocket } from './services/socketio.service';

function App() {
    const token = storageService.getAccessToken();
    const dispatch = useDispatch();
    useEffect(() => {
        const setup = async () => {
            if (token) {
                try {
                    // Fetch user data
                    const result = await dispatch(fetchGetCurrentUser()).then(unwrapResult);

                    if (handleResponse(result)) {
                        return;
                    }
                    dispatch(setUser(result.data));
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!',
                    });
                }

                try {
                    // Initiate socket connection
                    await initiateSocketConnection(token);
                    console.log('Socket connected successfully.');
                } catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!',
                    });
                }
            }
        };

        setup();

        // Cleanup function
        return () => {
            disconnectSocket();
        };
    }, [dispatch, token]);

    return (
        <div className="App">
            <AppRouter token={token} />
        </div>
    );
}

export default App;
