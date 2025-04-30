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

    // catch (error) {
    //     console.log(error)
    //     if (error.response) {
    //         toast.error(error.response.data.message); // Error of existing email 
    //     } else {
    //         //console.error("Network or other error:", error);
    //         toast.error("Something went wrong. Please try again.") // Network error 
    //     }

    // }

    catch (error) {
        console.log(error);

        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login"; // Unauthorized, redirect to login
            } else {
                toast.error(error.response.data.message || "An error occurred."); // Other server-side errors
            }
        } else {
            toast.error("Something went wrong. Please try again."); // Network error (no response)
        }
    }

    finally {
        dispatch(EndLoading())
    }

}




// 

export const AllTaskListByStatusApiRequest = async (dispatch, taskStatus, navigate) => {

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
        if (error.response?.status === 401) {
            navigate('/login'); // Redirect to login page
        } // if cookies in browser is empty & expire then it works. doesn't show logout button automatic redirect login page
    }

}


export const TotalTaskCountByStatusApiRequest = async (dispatch) => {

    try {

        dispatch(StartLoading())

        const response = await axios.get("/api/v7/tasks/count-total-number-by-task-status", { withCredentials: true })

        if (response.data.success) {
            dispatch(SetTotalTaskCountByStatus(response.data.output))
            // console.log(response.data)
        }


    }

    catch (error) {
        console.log(error)
        if (error.response?.status === 401) {
            //navigate('/login'); // Redirect to login page
            window.location.href = "/login"
        }

    }

    finally {
        dispatch(EndLoading())
    }

}


export const DeleteTaskApiRequest = async (taskId) => {

    try {

        // dispatch((StartLoading))

        const response = await axios.delete(`/api/v7/tasks/delete-task/${taskId}`, { withCredentials: true });
        toast.success(response.data.message)

    } catch (error) {
        console.error("Error deleting item:", error);
        toast.error(error.response.data.message)
        if (error.response?.status === 401) {
            //navigate('/login'); // Redirect to login page
            window.location.href = "/login"
        }
    }

    // finally {
    //     dispatch((EndLoading))

    // }

}


// Update Status

export const UpdateStatusApiRequest = async (taskId, taskStatus) => {

    try {

        const response = await axios.get(`/api/v7/tasks/update-task-status/${taskId}/${taskStatus}`, { withCredentials: true })

        if (response.data.success) {
            toast.success(response.data.message)
            // console.log(response.data)
        }

    }

    catch (error) {
        console.log(error)
        if (error.response?.status === 401) {
            //navigate('/login'); // Redirect to login page
            window.location.href = "/login"
        }
    }

}

