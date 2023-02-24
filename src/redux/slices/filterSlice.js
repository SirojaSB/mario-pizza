import {createSlice} from '@reduxjs/toolkit'

const initialState = {
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
        changeCategory(state, action) {
            state.activeIndexOfCategory = action.payload
        },
        changeActiveProperty(state, action) {
            state.activeSortProperty = action.payload
        },
        changeCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        changeCurrentNumberOfItems(state, action) {
            state.currentNumberOfItems = action.payload
        },
        setFilterFromUrl(state, action) {
            state.activeIndexOfCategory = action.payload.activeIndexOfCategory
            state.currentPage = action.payload.currentPage
            state.activeSortProperty = action.payload.activeSortProperty
        }
    }
})

export const {
    changeCategory,
    changeActiveProperty,
    changeCurrentPage,
    changeCurrentNumberOfItems,
    setFilterFromUrl
} = filterSlice.actions

export default filterSlice.reducer
