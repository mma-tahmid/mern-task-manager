import React, { useEffect } from 'react';
import MasterLayout from '../Components/MasterLayout';

import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AllTaskListByStatusApiRequest } from '../ApiRequest/TaskApiRequest';




const CanceledTaskPage = () => {

    const dispatch = useDispatch();


    const fetchAllCanceledTask = async () => {

        await AllTaskListByStatusApiRequest(dispatch, "canceled") //task-status= canceled
    }

    useEffect(() => {
        fetchAllCanceledTask()
    }, [])



    const { canceledTask } = useSelector((state) => state.taskslc)


    return (

        <>

            <MasterLayout>

                <div className=" flex gap-x-10 flex-wrap mt-4 gap-y-7 ">

                    {
                        canceledTask?.map((item, i) => (

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
                                        <button className="cursor-pointer text-green-500 hover:text-green-600 transition">
                                            <CiEdit className='text-[20px]' />
                                        </button>

                                        {/* Delete Icon */}
                                        <button className="text-red-500 hover:text-red-600 transition cursor-pointer">
                                            <AiOutlineDelete className='text-[20px]' />
                                        </button>
                                    </div>

                                    <div>
                                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">{item.status}</span>


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

export default CanceledTaskPage;