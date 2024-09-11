import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SaleService from 'src/services/sale.service';
// import { userAPI } from "./userAPI";

const saleService = new SaleService();

// ADMIN
export const fetchGetSales = createAsyncThunk('/sales', async (options, thunkAPI) => {
    try {
        const response = await saleService.getSales(options);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchGetAvailableSales = createAsyncThunk('/sales', async (thunkAPI) => {
    try {
        const response = await saleService.getAvailableSales();
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchGetSale = createAsyncThunk('sale', async (saleId, thunkAPI) => {
    try {
        const response = await saleService.getSaleById(saleId);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchCreateSale = createAsyncThunk('room', async (createSaleDto, thunkAPI) => {
    try {
        const response = await saleService.createSale(createSaleDto);
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
});

export const fetchUpdateSale = createAsyncThunk('sale', async ({ saleId, updateSaleDto }, thunkAPI) => {
    try {
        const response = await saleService.updateSaleById(saleId, updateSaleDto);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
});

export const fetchDeleteSale = createAsyncThunk('sale', async (saleId, thunkAPI) => {
    const response = await saleService.deleteSaleById(saleId);
    return response.data;
});

export const fetchRevertSale = createAsyncThunk('sale', async (saleId, thunkAPI) => {
    const response = await saleService.revertSaleById(saleId);
    return response.data;
});

export const fetchDeletePermanentlySale = createAsyncThunk('sale', async (saleId, thunkAPI) => {
    const response = await saleService.deleteSalePermanentlyById(saleId);
    return response.data;
});

const initialState = {
    entities: [],
    loading: 'idle',
};

// Then, handle actions in your reducers:
const saleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {},
});

export default saleSlice.reducer;
