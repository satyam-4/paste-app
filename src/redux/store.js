import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./PasteSlice";

const store = configureStore({
    reducer: {
        paste: pasteReducer,
    }
})

export default store