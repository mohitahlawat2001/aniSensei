import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starred: true,
        starredMovies: [],
    },
    reducers: {
        addStarredMovies: (state, action) => {
            state.starredMovies = [...state.starredMovies, action.payload];
        },
        removeStarredMovies: (state, action) => {
            state.starredMovies = state.starredMovies.filter(movie => movie.id !== action.payload);
        },
        toggleStarred: (state, action) => {
            state.starred = action.payload;
        }
    }
});

export const { addStarredMovies, removeStarredMovies , toggleStarred } = starredSlice.actions;

export default starredSlice.reducer;