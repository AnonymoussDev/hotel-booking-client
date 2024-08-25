import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HotelServiceService from 'src/services/hotel-service.service';

const hotelService = new HotelServiceService();

export const fetchGetHotelServices = createAsyncThunk('/hotels', async (thunkAPI) => {
    try {
        const response = await hotelService.getServices();
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

// admin
export const fetchGetHotelServicesAdmin = createAsyncThunk('/hotels', async (options, thunkAPI) => {
    try {
        const response = await hotelService.getServicesAdmin(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});
export const fetchGetHotelServiceAdmin = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});
export const fetchCreateHotelServices = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});
export const fetchUpdateHotelService = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});
export const fetchDeleteHotelService = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});
export const fetchDeletePermanentlyHotelService = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});
export const fetchRevertHotelService = createAsyncThunk('hotels', async (roomId, thunkAPI) => {});

const initialState = {
    entities: [],
    loading: 'idle',
};

// Then, handle actions in your reducers:
const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {},
    //   extraReducers: (builder) => {
    //     builder.addCase(fetchLogin.fulfilled, (state, action) => {
    //       state.entities.push(action.payload);
    //     });
    //   },
});

export default hotelSlice.reducer;
