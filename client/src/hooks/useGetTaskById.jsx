
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetSingleTask } from '../react-redux/slice/taskSlice';

const useGetTaskById = (singleTaskId) => {

    const dispatch = useDispatch();

    const fetchSingleTask = async () => {

        try {
            const response = await axios.get(`/api/v7/tasks/get-single-task-by-id/${singleTaskId}`, { withCredentials: true })
            if (response.data.success) {
                dispatch(SetSingleTask(response.data.output))
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSingleTask()
    }, [singleTaskId, dispatch])
};

export default useGetTaskById;