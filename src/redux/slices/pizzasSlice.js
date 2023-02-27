import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const {
        sortingCategory,
        order,
        currentNumberOfItems,
        currentPage,
        sortProperty,
        searchValue
    } = params

    const {data} = await axios.get(`https://63f20e814f17278c9a1f42b0.mockapi.io/pizzas?page=${currentPage}&limit=${currentNumberOfItems}&${sortingCategory}&sortBy=${sortProperty}&order=${order}`)

    return data.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
})

const initialState = {
    pizzas: [],
    status: 'loading'
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.pizzas = [];
            state.status = 'loading';
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.pizzas = action.payload;
            state.status = 'error';
        })
    }
})

export const {setPizzas} = pizzasSlice.actions

export default pizzasSlice.reducer
