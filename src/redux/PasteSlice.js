import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    pastes: JSON.parse(localStorage.getItem("pastes")) || []  // empty array
}

const PasteSlice = createSlice({
    name: "paste",
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;  // jo paste pass kiya tha, usey nikaala
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste Created");
        },
        updateToPastes: (state, action) => {
            const newPaste = action.payload;
            const index = state.pastes.findIndex((item) => {
                return item._id === newPaste._id;
            });

            if(index >= 0) {
                state.pastes[index] = newPaste;

                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste Updated");
            }
        },
        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
        },
        removeFromPastes: (state, action) => {
            const pasteIdToBeRemoved = action.payload;
            const indexOfPasteToBeRemoved = state.pastes.findIndex((item) => {
                return item._id === pasteIdToBeRemoved;
            }) 

            if(indexOfPasteToBeRemoved >= 0) {
                state.pastes.splice(indexOfPasteToBeRemoved, 1);

                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste Deleted");
            }
        }
    } 
})

// exporting the actions
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = PasteSlice.actions

// exporting the reducer
export default PasteSlice.reducer