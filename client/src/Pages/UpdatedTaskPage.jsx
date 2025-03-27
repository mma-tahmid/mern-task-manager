import React, { useEffect, useState } from 'react';
import MasterLayout from '../Components/MasterLayout';
import useGetTaskById from '../hooks/useGetTaskById';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdatedTaskPage = () => {

    const params = useParams();
    const tskId = params.id
    useGetTaskById(tskId)

    const navigate = useNavigate();

    const { singleTask } = useSelector((state) => state.taskslc)

    // const [inputData, setInputData] = useState({
    //     title: singleTask?.title,
    //     description: singleTask?.description
    // });

    const [inputData, setInputData] = useState({
        title: "",
        description: ""
    });

    // Read the Data
    useEffect(() => {
        if (singleTask) {
            setInputData({
                title: singleTask?.title || "",
                description: singleTask?.description || "",
            });
        }
    }, [singleTask]);

    const changeInputEventHandeler = (event) => {
        setInputData({ ...inputData, [event.target.name]: event.target.value })
    }

    //console.log(inputData)


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`/api/v7/tasks/update-task/${tskId}`, inputData, { withCredentials: true });

            if (response.data.success) {
                toast.success(response.data.message || "Task updated successfully!");
                navigate("/"); // Redirect to task list
            }

            else {
                toast.error(response.data.message)  // error of input field validation   
            }
        }

        catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update task!");
        }
    };

    return (

        <>

            <MasterLayout>


                <div className="flex justify-center items-center mt-16 ">
                    <div className="w-full max-w-xl p-6 shadow-lg rounded-2xl bg-white">

                        <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Update Task</h2>


                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="title">Title</label>

                                <input
                                    name='title'
                                    onChange={changeInputEventHandeler}
                                    value={inputData.title}
                                    placeholder="Enter task title"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="description">Description</label>

                                <textarea
                                    name='description'
                                    onChange={changeInputEventHandeler}
                                    value={inputData.description}
                                    placeholder="Enter task description"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer">Update Task</button>

                        </form>


                    </div>
                </div>


            </MasterLayout>
        </>
    );
};

export default UpdatedTaskPage;