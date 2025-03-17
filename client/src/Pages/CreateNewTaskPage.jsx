import React, { useState } from 'react';
import MasterLayout from '../Components/MasterLayout';
import { CreateTaskApiRequest } from '../ApiRequest/TaskApiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CreateNewTaskPage = () => {


    const [inputData, setInputData] = useState({
        title: "",
        description: ""
    })

    const changeInputEventHandeler = async (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    //console.log(inputData)

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        await CreateTaskApiRequest(inputData, navigate, dispatch)  // need same parameter order 
    }



    return (

        <>
            <MasterLayout>


                <div className="flex justify-center items-center mt-16 ">
                    <div className="w-full max-w-xl p-6 shadow-lg rounded-2xl bg-white">

                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Task</h2>


                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="title">Title</label>

                                <input
                                    name='title'
                                    onChange={changeInputEventHandeler}
                                    placeholder="Enter task title"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="description">Description</label>

                                <textarea
                                    name='description'
                                    onChange={changeInputEventHandeler}
                                    placeholder="Enter task description"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer">Create Task</button>

                        </form>


                    </div>
                </div>


            </MasterLayout>
        </>
    );
};

export default CreateNewTaskPage;