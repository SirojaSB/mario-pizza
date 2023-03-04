import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type CartItem = {
    id?: number;
    imageUrl: string;
    title: string;
    size: number;
    type: string;
    count: number;
    price: number;
}

interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItem[],
    idCount: number;
}

const data: CartSliceState = JSON.parse(localStorage.getItem('cart') || '') ||
    {
        totalPrice: 0,
        totalCount: 0,
        items: [],
        idCount: 0
    }

const initialState: CartSliceState = {
    totalPrice: data.totalPrice,
    totalCount: data.totalCount,
    items: data.items,
    idCount: data.idCount
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const foundItem = state.items.find((item) => (item.title === action.payload.title) && (item.size === action.payload.size) && (item.type === action.payload.type))

            if (foundItem) {
                foundItem.count++
            } else {
                state.idCount++
                state.items.push({...action.payload, count: 1, id: state.idCount})
            }

            state.totalPrice = state.items.reduce((sum, item) => {
                return sum += item.price * item.count
            }, 0)

            state.totalCount = state.items.reduce((sum, item) => {
                return sum += item.count
            }, 0)
        },
        increaseCountOfItem(state, action: PayloadAction<number>) {
            const foundItem = state.items.find((item) => item.id === action.payload)

            if (foundItem) {
                foundItem.count++
                state.totalPrice = state.totalPrice + foundItem.price
                state.totalCount++
            }
        },
        decreaseCountOfItem(state, action: PayloadAction<number>) {
            const foundItem = state.items.find((item) => item.id === action.payload)

            if (foundItem && (foundItem.count !== 1)) {
                foundItem.count--
                state.totalPrice = state.totalPrice - foundItem.price
                state.totalCount--
            } else {
                state.items = state.items.filter(item => item.id !== action.payload)
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            const foundItem = state.items.find((item) => item.id === action.payload)

            if (foundItem) {
                state.totalPrice = state.totalPrice - foundItem.price
                state.totalCount = state.totalCount - foundItem.count

                state.items = state.items.filter(item => item.id !== action.payload)
            }
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
            state.idCount = 0
        },
    }
})

export const getCartSelector = (state: RootState) => state.cart

export const {
    addItem,
    removeItem,
    clearCart,
    decreaseCountOfItem,
    increaseCountOfItem
} = cartSlice.actions

export default cartSlice.reducer
