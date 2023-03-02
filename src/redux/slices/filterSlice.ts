import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

type SortNameItem = {
    name: string;
    sortProperty: string;
}

interface FilterSliceState {
    activeIndexOfCategory: number;
    activeSortProperty: SortNameItem;
    currentPage: number;
    currentNumberOfItems: number;
}

const initialState: FilterSliceState = {
    activeIndexOfCategory: 0,
    activeSortProperty: {
        name: 'популярности ↓',
        sortProperty: 'rating'
    },
    currentPage: 1,
    currentNumberOfItems: 8
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeCategory(state, action: PayloadAction<number>) {
            state.activeIndexOfCategory = action.payload
        },
        changeActiveProperty(state, action: PayloadAction<SortNameItem>) {
            state.activeSortProperty = action.payload
        },
        changeCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        changeCurrentNumberOfItems(state, action: PayloadAction<number>) {
            state.currentNumberOfItems = action.payload
        },
        setFilterFromUrl(state, action: PayloadAction<FilterSliceState>) {
            state.activeIndexOfCategory = action.payload.activeIndexOfCategory
            state.currentPage = action.payload.currentPage
            state.activeSortProperty = action.payload.activeSortProperty
        }
    }
})

export const getFilterSelector = (state: RootState) => state.filter

export const {
    changeCategory,
    changeActiveProperty,
    changeCurrentPage,
    changeCurrentNumberOfItems,
    setFilterFromUrl
} = filterSlice.actions

export default filterSlice.reducer
