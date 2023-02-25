import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const foundItem = state.items.find((item) => (item.title === action.payload.title) && (item.size === action.payload.size) && (item.type === action.payload.type))

            if (foundItem) {
                foundItem.count++
            } else {
                state.items.push({...action.payload, count: 1, id: state.items.length + 1})
            }

            state.totalPrice = state.items.reduce((sum, item) => {
                return sum += item.price * item.count
            }, 0)

            state.totalCount = state.items.reduce((sum, item) => {
                return sum+= item.count
            }, 0)
        },
        decreaseCountOfItem(state, action) {
            const foundItem = state.items.find((item) => item.id === action.payload)

            if (foundItem.count !== 1) {
                foundItem.count--
            } else {
                state.items = state.items.filter(item => item.id !== action.payload)
            }
        },
        removeItem(state, action) {
            const foundItem = state.items.find((item) => item.id === action.payload)

            state.totalPrice = state.totalPrice - foundItem.price
            state.totalCount = state.totalCount - foundItem.count

            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
    }
})

export const {
    addItem,
    removeItem,
    clearCart,
    decreaseCountOfItem
} = cartSlice.actions

export default cartSlice.reducer
