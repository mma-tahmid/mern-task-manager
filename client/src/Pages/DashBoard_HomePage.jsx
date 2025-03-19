import React from 'react';
import MasterLayout from '../Components/MasterLayout';
import { useEffect } from 'react';
import { TotalTaskCountByStatusApiRequest } from '../ApiRequest/TaskApiRequest';
import { useDispatch, useSelector } from 'react-redux';



const DashBoard_HomePage = () => {


    const dispatch = useDispatch()

    // Api call
    const fetchTotalTaskCountByStatus = async () => {
        await TotalTaskCountByStatusApiRequest(dispatch)
    }

    useEffect(() => {
        fetchTotalTaskCountByStatus()

    }, [])


    const { totalTaskCountByStatus } = useSelector((state) => state.taskslc)



    return (

        <>

            <MasterLayout>

           
                <div className=" flex gap-x-10 flex-wrap mt-4 gap-y-7 ">

                    {
                        totalTaskCountByStatus?.map((item, i) => (


                            <div key={i} className='w-[360px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition'>

                                <h3 className="text-xl font-semibold text-gray-800 capitalize"> total {item._id}</h3>
                                <h4 className="text-gray-600 mt-4"> {item.total} </h4>

                            </div>

                        ))


                    }

                    {/* {
                        Array.isArray(totalTaskCountByStatus) && totalTaskCountByStatus.map((item, i) => (
                            <div key={i} className='w-[360px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition'>
                                <h3 className="text-xl font-semibold text-gray-800">Total {item?._id}</h3>
                                <p className="text-gray-600 mt-1">{item?.total}</p>
                            </div>
                        ))
                    } */}




                </div>


            </MasterLayout >

        </>
    );
};

export default DashBoard_HomePage;

// To make only the first letter of a word uppercase and the rest lowercase, you can use the following method:

// Using CSS (capitalize)
// You can use the capitalize utility class in Tailwind CSS to automatically capitalize the first letter of each word.