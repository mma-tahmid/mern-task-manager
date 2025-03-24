import React, { useEffect } from 'react';
import MasterLayout from '../Components/MasterLayout';

import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AllTaskListByStatusApiRequest } from '../ApiRequest/TaskApiRequest';
import DeleteToDO from '../helper/DeleteAlert';
import { updateStatusToDo } from '../helper/UpdateStatusAlert';

const InProgressTaskPage = () => {


    const dispatch = useDispatch();


    const fetchAllProgressTask = async () => {

        await AllTaskListByStatusApiRequest(dispatch, "progress") //task-status= new
    }

    useEffect(() => {
        fetchAllProgressTask()
    }, [])

// Delete Functionality

const handleDelete = async (id) => {
    //console.log("Deleting Task ID:", taskId);
    await DeleteToDO(id)
    fetchAllProgressTask()
}

    const statusChangeItem = async (id, statues) => {
        //console.log("Deleting Task ID:", taskId);
        await updateStatusToDo(id,statues)
        fetchAllProgressTask()
    }

    const { progressTask } = useSelector((state) => state.taskslc)


    return (

        <>

            <MasterLayout>

                <div className=" flex gap-x-10 flex-wrap mt-4 gap-y-7 ">

                    {
                        progressTask?.map((item, i) => (

                            <div key={i} className='w-[360px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition'>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600 mt-1"> {item.description} </p>
                                </div>


                                <div className='flex justify-between items-center mt-6'>

                                    <div className="flex items-center gap-4 ">

                                        <div className='flex gap-x-1 items-center'>
                                            <MdOutlineDateRange className='text-[15px]' />
                                            <p className='text-[15px] '>{item.formattedDate}</p>
                                        </div>

                                        {/* Status Toggle Icon */}
                                        <button onClick={() => statusChangeItem(item._id, item.status)} className="cursor-pointer text-green-500 hover:text-green-600 transition">
                                            <CiEdit className='text-[20px]' />
                                        </button>

                                        {/* Delete Icon */}
                                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-600 transition cursor-pointer">
                                            <AiOutlineDelete className='text-[20px]' />
                                        </button>
                                    </div>

                                    <div>
                                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">{item.status}</span>


                                    </div>
                                </div>


                            </div>

                        ))
                    }




                </div>

            </MasterLayout>

        </>
    );
};

export default InProgressTaskPage;