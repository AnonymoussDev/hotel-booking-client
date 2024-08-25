import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductService from 'src/services/product.service';

const productService = new ProductService();

export const fetchGetProductsByService = createAsyncThunk('/products', async (serviceId, thunkAPI) => {
    try {
        const response = await productService.getProductsByServices(serviceId);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

// admin
export const fetchGetProductAdmin = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchGetProductsAdmin = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchCreateProduct = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchUpdateProduct = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchDeleteProduct = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchDeletePermanentlyProduct = createAsyncThunk('products', async (roomId, thunkAPI) => {});
export const fetchRevertProduct = createAsyncThunk('products', async (roomId, thunkAPI) => {});

const initialState = {
    entities: [],
    loading: 'idle',
};

// Then, handle actions in your reducers:
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
});

export default productSlice.reducer;
