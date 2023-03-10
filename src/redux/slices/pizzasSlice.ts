import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

type FetchPizzasParams = {
    sortingCategory: string;
    order: string;
    currentNumberOfItems: number;
    currentPage: number;
    sortProperty: string;
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: FetchPizzasParams) => {
    const {
        sortingCategory,
        order,
        currentNumberOfItems,
        currentPage,
        sortProperty
    } = params

    const {data} = await axios.get<PizzaItem[]>(`https://63f20e814f17278c9a1f42b0.mockapi.io/pizzas?page=${currentPage}&limit=${currentNumberOfItems}&${sortingCategory}&sortBy=${sortProperty}&order=${order}`)

    return data
})

export type PizzaItem = {
    category: number;
    id: number;
    imageUrl: string;
    price: number;
    rating: string;
    sizes: number[];
    title: string;
    types: number[];
    info: string;
}

export type SelectedPizzaItem = {
    imageUrl: string;
    title: string;
    info: string;
}

interface PizzasSliceState {
    pizzasStore: PizzaItem[],
    searchedPizzas: PizzaItem[],
    status: 'loading' | 'success' | 'error',
    selectedPizza: SelectedPizzaItem
}

const initialState: PizzasSliceState = {
    pizzasStore: [],
    searchedPizzas: [],
    status: 'loading',
    selectedPizza: {
        imageUrl: '',
        title: '',
        info: ''
    }
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getSearchedPizzas(state, action: PayloadAction<string>) {
            state.searchedPizzas = state.pizzasStore.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        setSelectedPizza(state, action: PayloadAction<SelectedPizzaItem>) {
            state.selectedPizza = action.payload
        }
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

export const {getSearchedPizzas, setSelectedPizza} = pizzasSlice.actions

export default pizzasSlice.reducer
