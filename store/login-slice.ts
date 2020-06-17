import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type SliceState = { loggedIn:'INITIAL' | 'ANONYM' | 'REGISTERED' | 'VERIFIED' }
const initialState:SliceState = {loggedIn:'INITIAL'}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedIn: (state, action:PayloadAction<void>) => {
            return {...state,loggedIn: 'REGISTERED'}
        },
        setVerified: (state, action:PayloadAction<void>) => {
            return {...state,loggedIn: 'VERIFIED'}
        },
        setLoggedOut:(state, action:PayloadAction<void>) => {
            return {...state,loggedIn:'ANONYM'}
        }
    }
});

export const { setLoggedIn, setLoggedOut, setVerified } = loginSlice.actions

export default loginSlice.reducer;