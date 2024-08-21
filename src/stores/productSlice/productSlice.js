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
