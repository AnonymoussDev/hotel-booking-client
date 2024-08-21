import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'src/services/auth.service';

const authService = new AuthService();

// First, create the thunk
export const fetchLogin = createAsyncThunk('auth/login', async (authCredentialDto, thunkAPI) => {
    try {
        const response = await authService.login(authCredentialDto);
        return response.data;
    } catch (error) {
        console.log('fetchLogin error: ', error);
        return error.response.data;
    }
});

export const fetchRegister = createAsyncThunk('auth/register', async (authCredentialDto, thunkAPI) => {
    try {
        const response = await authService.register(authCredentialDto);
        return response.data;
    } catch (error) {
        console.log('fetchRegister error: ', error);
        return error.response.data;
    }
});

export const fetchVerifyRegister = createAsyncThunk('auth/register', async ({ newEmail, token }, thunkAPI) => {
    try {
        const response = await authService.verifyRegister(newEmail, token);
        return response.data;
    } catch (error) {
        console.log('fetchVerifyRegister error: ', error);
        return error.response.data;
    }
});

export const fetchGetCurrentUser = createAsyncThunk('/user', async (thunkAPI) => {
    try {
        const response = await authService.getCurrentUser();
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

const initialState = {
    user: {},
    loading: 'idle',
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = { ...action.payload };
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
