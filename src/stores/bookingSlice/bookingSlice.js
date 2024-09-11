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

export const fetchGetBookingsUser = createAsyncThunk('/bookings', async (options, thunkAPI) => {
    try {
        const response = await bookingService.getBookingsUser(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchCancelBookingUser = createAsyncThunk('booking', async (cancelBookingDto, thunkAPI) => {
    try {
        console.log(cancelBookingDto);

        const response = await bookingService.cancelBookingUser(cancelBookingDto);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

//admin
export const fetchGetBookingsAdmin = createAsyncThunk('/bookings', async (options, thunkAPI) => {
    try {
        const response = await bookingService.getBookingsAdmin(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});
export const fetchGetBooking = createAsyncThunk('/booking', async (bookingId, thunkAPI) => {
    try {
        const response = await bookingService.getBookingDetailAdmin(bookingId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});
export const addService = createAsyncThunk(
    '/booking/add-service',
    async ({ bookingId, serviceBookingDto }, thunkAPI) => {
        try {
            console.log(bookingId);
            const response = await bookingService.addBookingAdmin(bookingId, serviceBookingDto);
            return response.data;
        } catch (err) {
            console.log(err);
            return err.response.data;
        }
    },
);
export const fetchCheckinBookingById = createAsyncThunk('booking', async ({ bookingId }, thunkAPI) => {
    try {
        const response = await bookingService.checkinBookingById(bookingId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchCheckoutBookingById = createAsyncThunk('booking', async ({ bookingId }, thunkAPI) => {
    try {
        const response = await bookingService.checkoutBookingById(bookingId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

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
