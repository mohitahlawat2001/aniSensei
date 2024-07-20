import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
    name: 'tv',
    initialState: {
        popularTv: null,
        topRatedTv: null,
        airingTodayTv: null,
        onTheAirTv: null,
    },
    reducers: {
        addPopularTv: (state, action) => {
            state.popularTv = action.payload;
        },
        addTopRatedTv: (state, action) => {
            state.topRatedTv = action.payload;
        },
        addAiringTodayTv: (state, action) => {
            state.airingTodayTv = action.payload;
        },
        addOnTheAirTv: (state, action) => {
            state.onTheAirTv = action.payload;
        }
    }
});

export const { addPopularTv, addTopRatedTv, addAiringTodayTv, addOnTheAirTv } = tvSlice.actions;

export default tvSlice.reducer;