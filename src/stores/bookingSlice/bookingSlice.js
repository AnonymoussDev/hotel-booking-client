import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BookingService from 'src/services/booking.service';

const bookingService = new BookingService();

export const fetchCreateBooking = createAsyncThunk('booking', async (createBookingDto, thunkAPI) => {
    try {
        const response = await bookingService.createBooking(createBookingDto);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchGetBookingsUser = createAsyncThunk('/bookings', async (thunkAPI) => {
    try {
        const response = await bookingService.getBookingsUser();
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

//admin
export const fetchGetBookingsAdmin = createAsyncThunk('/bookings', async (thunkAPI) => {});
export const fetchCheckinBookingById = createAsyncThunk('/bookings', async (thunkAPI) => {});
export const fetchCheckoutBookingById = createAsyncThunk('/bookings', async (thunkAPI) => {});

const initialState = {
    entities: [],
    loading: 'idle',
};

// Then, handle actions in your reducers:
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
});

export default bookingSlice.reducer;
