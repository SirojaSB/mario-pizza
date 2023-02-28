import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const {
        sortingCategory,
        order,
        currentNumberOfItems,
        currentPage,
        sortProperty
    } = params

    const {data} = await axios.get(`https://63f20e814f17278c9a1f42b0.mockapi.io/pizzas?page=${currentPage}&limit=${currentNumberOfItems}&${sortingCategory}&sortBy=${sortProperty}&order=${order}`)

    return data
})

const initialState = {
    pizzasStore: [],
    searchedPizzas: [],
    status: 'loading'
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getSearchedPizzas(state, action) {
            state.searchedPizzas = state.pizzasStore.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzasStore = [];
            state.searchedPizzas = [];
            state.status = 'loading';
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzasStore = action.payload;
            state.searchedPizzas = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzasStore = [];
            state.searchedPizzas = [];
            state.status = 'error';
        })
    }
})

export const {getSearchedPizzas} = pizzasSlice.actions

export default pizzasSlice.reducer
