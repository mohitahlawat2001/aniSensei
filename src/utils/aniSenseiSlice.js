import { createSlice } from "@reduxjs/toolkit";

const aniSenseiSlice = createSlice({
    name: 'aniSensei',
    initialState: {
        searchView: true,
        resultMovie: null,
        resultName:null,
    },
    reducers: {
        toggleSearchView: (state, action) => {
            state.searchView = !state.searchView;
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