import React, { useEffect } from 'react';
import MasterLayout from '../Components/MasterLayout';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { AllTaskListByStatusApiRequest } from '../ApiRequest/TaskApiRequest';
import { useDispatch, useSelector } from 'react-redux';

const NewTaskPage = ({ isCompleted }) => {

    const dispatch = useDispatch();


    const fetchAllNewTask = async () => {

        await AllTaskListByStatusApiRequest(dispatch, "new") //task-status= new
    }

    useEffect(() => {
        fetchAllNewTask()
    }, [])



    const { newTask } = useSelector((state) => state.taskslc)

    return (

        <>

            <MasterLayout>

                <div className=" flex gap-x-10 flex-wrap mt-4 gap-y-7 ">

                    {
                        newTask?.map((item, i) => (

                            <div key={i} className='w-[360px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition'>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600 mt-1"> {item.description} </p>
                                    <p className="text-gray-600 mt-1"> {item.formattedDate} </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Status Toggle Icon */}
                                    <button className="text-green-500 hover:text-green-600 transition">
                                        adad {/* {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />} */}
                                    </button>

                                    {/* Delete Icon */}
                                    <button className="text-red-500 hover:text-red-600 transition">
                                        {/* <Trash2 size={24} /> */}aad
                                    </button>
                                </div>

                            </div>

                        ))
                    }




                </div>

            </MasterLayout>
        </>
    );
};

export default NewTaskPage;