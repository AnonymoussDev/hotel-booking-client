import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NotificationService from 'src/services/notification.service';

const notificationService = new NotificationService();

// admin
export const fetchGetNotificationsAdmin = createAsyncThunk('/notifications', async (options, thunkAPI) => {
    try {
        const response = await notificationService.getNotificationAdmin(options);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchReadNotificationAdmin = createAsyncThunk('/notification', async (id, thunkAPI) => {
    try {
        const response = await notificationService.readNotificationAdmin(id);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

const initialState = {
    value: {},
};

export const notificationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default notificationSlice.reducer;
