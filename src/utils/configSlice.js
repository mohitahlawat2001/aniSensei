import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        lang: "en",
        theme: "light",
    },
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { setLanguage, setTheme } = configSlice.actions;

export default configSlice.reducer;