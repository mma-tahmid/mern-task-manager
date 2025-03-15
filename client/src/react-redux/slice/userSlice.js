import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    currentUser: null
}

const userSlices = createSlice({

    name: "userslc",
    initialState,

    reducers: {

        StartLoading: (state) => {
            state.loading = true;
        },

        EndLoading: (state) => {
            state.loading = false;
        },

        SetAuthUser: (state, action) => {
            state.currentUser = action.payload
        },




    }

});

export const { StartLoading, EndLoading, SetAuthUser } = userSlices.actions
export default userSlices.reducer 