import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import roomReducer from './roomSlice/roomSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
    },
});
