import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    newTask: [],
    completedTask: [],
    progressTask: [],
    canceledTask: [],
    totalTaskCountByStatus: []
}

const TaskSlices = createSlice({

    name: "taskslc",
    initialState,

    reducers: {

        StartLoading: (state) => {
            state.loading = true;
        },

        EndLoading: (state) => {
            state.loading = false;
        },

        SetAllNewTask: (state, action) => {
            state.newTask = action.payload
        },

        SetAllCompletedTask: (state, action) => {
            state.completedTask = action.payload
        },

        SetAllProgressTask: (state, action) => {
            state.progressTask = action.payload
        },

        SetAllCanceledTask: (state, action) => {
            state.canceledTask = action.payload
        },

        SetTotalTaskCountByStatus: (state, action) => {
            state.totalTaskCountByStatus = action.payload
        }

    }

});

export const { StartLoading, EndLoading, SetAllNewTask, SetAllCompletedTask, SetAllProgressTask, SetAllCanceledTask, SetTotalTaskCountByStatus } = TaskSlices.actions
export default TaskSlices.reducer 