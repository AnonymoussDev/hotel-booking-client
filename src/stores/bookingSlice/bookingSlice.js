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
