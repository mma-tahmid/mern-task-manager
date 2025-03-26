import axios from 'axios';
import toast from 'react-hot-toast';

import { StartLoading, EndLoading, SetAuthUser } from '../react-redux/slice/userSlice';

// User Registration Request


export const RegistrationRequest = async (inputData, navigate, dispatch) => {

    try {

        dispatch(StartLoading())

        const response = await axios.post("/api/v7/user-auth/registration", inputData, {
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            withCredentials: true
        })

        if (response.data.success) {

            navigate("/login")
            toast.success(response.data.message) // toast use for notifications 
        }
        else {
            toast.error(response.data.message)  // error of input field validation   
        }

    }
    catch (error) {
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

export const LoginRequest = async (inputData, navigate, dispatch) => {
    try {
        dispatch(StartLoading())

        const response = await axios.post("/api/v7/user-auth/login", inputData, { withCredentials: true })
        //console.log(response)

        if (response.data.success) {

            dispatch(SetAuthUser(response.data.output))
            navigate("/")
            toast.success(response.data.message) // toast use for notifications 
        }
        else {
            toast.error(response.data.message) // Show input field validation error
        }

    }
    catch (error) {

        if (error.response.status === 400) {
            toast.error(error.response.data.message); // Error for invalid email 
        } else {
            //console.error("Network or other error:", error);
            //toast.error(error.message) // perfect-this one show server error (Error: Request failed with status code 500 when internet is off )
            toast.error(error.message || "Something went wrong. Please try again"); // Network error 
        }

    }
    finally {
        dispatch(EndLoading())
    }
}



export const LogOutApiRequest = async (dispatch, navigate) => {

    try {

        const response = await axios.get("/api/v7/user-auth/logout")

        if (response.data.success) {
            dispatch(SetAuthUser(null))

            navigate("/login")
            toast.success(response.data.message)
        }

    }

    catch (error) {
        console.log(error)
        toast.error(error.response.data.message) // Show Error in LogOut from Backend
    }
}



export const UpdateUserApiRequest = async (uId, inputData, dispatch) => {

    try {

        dispatch(StartLoading())

        const response = await axios.put(`/api/v7/user-auth/update-profile/${uId}`, inputData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        if (response.data.success) {

            //navigate("/login")
            dispatch(SetAuthUser(response.data.output))
            toast.success(response.data.message) // toast use for notifications 
        }
        else {
            toast.error(response.data.message)  // error of input field validation   
        }

    }
    catch (error) {
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