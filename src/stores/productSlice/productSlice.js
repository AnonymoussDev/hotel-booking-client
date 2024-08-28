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
export const fetchGetProductsAdmin = createAsyncThunk('/products', async (options, thunkAPI) => {
    try {
        const response = await productService.getProductsAdmin(options);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});
export const fetchGetProductAdmin = createAsyncThunk('/products', async (options, thunkAPI) => {
    try {
        const response = await productService.getProductAdmin(options);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchCreateProduct = createAsyncThunk('product', async (creatProductDto, thunkAPI) => {
    try {
        const response = await productService.createProduct(creatProductDto);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchUpdateProduct = createAsyncThunk('product', async ({ productId, productUpdateDto }, thunkAPI) => {
    try {
        const response = await productService.updateProductById(productId, productUpdateDto);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchDeleteProduct = createAsyncThunk('sale', async (productId, thunkAPI) => {
    const response = await productService.deleteProductById(productId);
    return response.data;
});

export const fetchRevertProduct = createAsyncThunk('sale', async (productId, thunkAPI) => {
    const response = await productService.revertProductById(productId);
    return response.data;
});

export const fetchDeletePermanentlyProduct = createAsyncThunk('sale', async (productId, thunkAPI) => {
    const response = await productService.deletePermanentlyProductById(productId);
    return response.data;
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
