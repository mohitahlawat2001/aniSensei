import { createSlice } from "@reduxjs/toolkit";

const aniSenseiSlice = createSlice({
    name: 'aniSensei',
    initialState: {
        searchView: true,
    },
    reducers: {
        toggleSearchView: (state, action) => {
            state.searchView = !state.searchView;
        }
    }
});


export const { toggleSearchView } = aniSenseiSlice.actions;

export default aniSenseiSlice.reducer;