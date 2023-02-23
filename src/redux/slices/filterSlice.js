import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeIndexOfCategory: 0,
    activeSortProperty: {
        name: 'популярности ↓', sortProperty: 'rating'
    }
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
        }
    }
})

export const { changeCategory, changeActiveProperty } = filterSlice.actions

export default filterSlice.reducer
