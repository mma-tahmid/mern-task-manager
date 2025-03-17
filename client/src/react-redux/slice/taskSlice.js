import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    newTask: [],
    completedTask: [],
    progressTask: [],
    canceledTask: [],
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
        }




    }

});

export const { StartLoading, EndLoading, SetAllNewTask, SetAllCompletedTask, SetAllProgressTask, SetAllCanceledTask } = TaskSlices.actions
export default TaskSlices.reducer 