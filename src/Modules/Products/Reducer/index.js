import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import TEST_APIURL from '../../../Config/index'

export const productSlice = createSlice({
    name: "product",
    initialState: {
        productArray: []
    },
    reducers: {
        listProducts: (state, action) => {
            state.productArray = action.payload;
        }
    }
});

export const listproductAsych = (data) => async (dispatch) => {
    try {
        const response = await axios.get(`${TEST_APIURL.TEST_APIURL}/products`, {});
        if (response.status === 200) {
            dispatch(listProducts(response.data.products));
        }
    } catch (err) {
        throw new Error(err);
    }
};

export const { listProducts } = productSlice.actions;
export default productSlice.reducer;

