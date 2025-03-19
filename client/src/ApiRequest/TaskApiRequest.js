import axios from 'axios';
import toast from 'react-hot-toast';
import { EndLoading, SetAllCanceledTask, SetAllCompletedTask, SetAllNewTask, SetAllProgressTask, SetTotalTaskCountByStatus, StartLoading } from '../react-redux/slice/taskSlice';


// Create Task

export const CreateTaskApiRequest = async (inputData, navigate, dispatch) => {

    try {

        dispatch(StartLoading())

        const response = await axios.post("/api/v7/tasks/create-task", inputData, { withCredentials: true })
        // inputData is a post body for post request
        if (response.data.success) {
            navigate("/new-task")
            toast.success(response.data.message)
        }

        else {
            toast.error(response.data.message)
        }


    }

    catch (error) {
        console.log(error)
        if (error.response) {
            toast.error(error.response.data.message); // Error of existing email 
        } else {
            //console.error("Network or other error:", error);
            toast.error("Something went wrong. Please try again."); // Network error 
        }
    }

    finally {
        dispatch(EndLoading())
    }

}




// 

export const AllTaskListByStatusApiRequest = async (dispatch, taskStatus) => {

    try {
        const response = await axios.get(`/api/v7/tasks/list-task-by-status/${taskStatus}`, { withCredentials: true })

        if (response.data.success) {

            if (taskStatus === "new") {
                dispatch(SetAllNewTask(response.data.output))
            }
            else if (taskStatus === "completed") {
                dispatch(SetAllCompletedTask(response.data.output))
            }
            else if (taskStatus === "canceled") {
                dispatch(SetAllCanceledTask(response.data.output))
            }
            else if (taskStatus === "progress") {

                dispatch(SetAllProgressTask(response.data.output))
            }
        }

        else {
            toast.error("Some thing Went wrong")
        }

    }

    catch (error) {
        console.log(error)
    }

}


export const TotalTaskCountByStatusApiRequest = async (dispatch) => {

    try {

        dispatch(StartLoading())

        const response = await axios.get("/api/v7/tasks/count-total-number-by-task-status")

        if (response.data.success) {
            dispatch(SetTotalTaskCountByStatus(response.data.output))
            // console.log(response.data)
        }


    }

    catch (error) {
        console.log(error)
    }

    finally {
        dispatch(EndLoading())
    }

}


export const DeleteTaskApiRequest = async () => {


    
}




