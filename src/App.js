import AppRouter from 'src/routes';
import storageService from 'src/services/storage.service';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import handleResponse from 'src/utils/handleResponse';
import { fetchGetCurrentUser, setUser } from 'src/stores/authSlice/authSlice';
import Swal from 'sweetalert2';

function App() {
    const token = storageService.getAccessToken();
    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            (async () => {
                await dispatch(fetchGetCurrentUser())
                    .then(unwrapResult)
                    .then((result) => {
                        if (handleResponse(result)) {
                            return;
                        }
                        dispatch(setUser(result.data));
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Đã có lỗi xãy ra. Xin vui lòng thử lại sau!',
                        });
                    });
            })();
        }
    }, [dispatch, token]);
    return (
        <div className="App">
            <AppRouter token={token} />
        </div>
    );
}

export default App;
