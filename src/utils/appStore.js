import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import aniSenseiSlice from "./aniSenseiSlice";
import configSlice from "./configSlice";

const appStore = configureStore({
    reducer: {
        // Add reducers here
        user : userSlice,
        movies : movieSlice,
        aniSensei : aniSenseiSlice,
        config : configSlice,
    }
});

export default appStore;