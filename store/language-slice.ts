import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type SliceState = { english:Boolean }
const initialState:SliceState = {english:true}
const languageSlice = createSlice({
    name: 'changeLanguage',
    initialState,
    reducers: {
        changeToEnglish: (state,action:PayloadAction<void>) => {
            state={ english: true }
        },
        changeToTurkish:(state, action:PayloadAction<void>) => {
            state={english:false}
        }
    }
});

export const { changeToEnglish, changeToTurkish } = languageSlice.actions

export default languageSlice.reducer;