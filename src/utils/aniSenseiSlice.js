import { createSlice } from "@reduxjs/toolkit";

const aniSenseiSlice = createSlice({
    name: 'aniSensei',
    initialState: {
        searchView: 'Home',
        resultMovie: null,
        resultName:null,
    },
    reducers: {
        toggleSearchView: (state, action) => {
            state.searchView = action.payload;
        },
        addResultMovie: (state, action) => {
            const {resultName, resultMovie} = action.payload;
            state.resultMovie = resultMovie;
            state.resultName = resultName;
        }
    }
});


export const { toggleSearchView , addResultMovie } = aniSenseiSlice.actions;

export default aniSenseiSlice.reducer;