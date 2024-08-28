import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RoomService from 'src/services/room.service';

const roomService = new RoomService();

export const fetchGetAvailableRooms = createAsyncThunk('/room', async (options, thunkAPI) => {
    try {
        const response = await roomService.getAvailableRooms(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchGetRoomDetail = createAsyncThunk('room', async (roomId, thunkAPI) => {
    try {
        const response = await roomService.getRoomDetail(roomId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchPostRoomRating = createAsyncThunk('room', async ({ crateRoomRatingDto, roomId }, thunkAPI) => {
    const response = await roomService.createRoomRating(crateRoomRatingDto, roomId);
    return response.data;
});

export const fetchRatingByRoomId = createAsyncThunk('room', async (roomId, thunkAPI) => {
    try {
        const response = await roomService.getRatingByRoomId(roomId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

// admin

export const fetchGetRoomsAdmin = createAsyncThunk('/rooms', async (options, thunkAPI) => {
    try {
        const response = await roomService.getRoomsAdmin(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchGetRoomAdmin = createAsyncThunk('/room', async (roomId, thunkAPI) => {
    try {
        const response = await roomService.getRoomDetailAdmin(roomId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchCreateRoom = createAsyncThunk('room', async (createRoomDto, thunkAPI) => {
    try {
        const response = await roomService.createRoom(createRoomDto);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchUpdateRoom = createAsyncThunk('room', async ({ roomId, updateRoomDto }, thunkAPI) => {
    try {
        const response = await roomService.updateRoomById(roomId, updateRoomDto);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchDeleteRoom = createAsyncThunk('room', async (roomId, thunkAPI) => {
    const response = await roomService.deleteRoomById(roomId);
    return response.data;
});

export const fetchDeletePermanentlyRoom = createAsyncThunk('room', async (roomId, thunkAPI) => {
    const response = await roomService.deleteRoomPermanentlyById(roomId);
    return response.data;
});

export const fetchRevertRoomById = createAsyncThunk('room', async (roomId, thunkAPI) => {
    const response = await roomService.revertRoomById(roomId);
    return response.data;
});

const initialState = {
    rooms: [],
};

// Then, handle actions in your reducers:
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setStoreRooms: (state, action) => {
            state.rooms = [...action.payload];
        },
    },
});

export const { setStoreRooms } = roomSlice.actions;
export default roomSlice.reducer;
