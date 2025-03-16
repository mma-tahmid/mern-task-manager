import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrTasks } from "react-icons/gr";
import { LogOut } from 'lucide-react';
import { LogOutApiRequest } from '../../ApiRequest/UserApiRequest';
import { useDispatch } from 'react-redux';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logOutHandler = async () => {

        await LogOutApiRequest(dispatch, navigate)

    }

    return (

        <>

            <div className='bg-white shadow p-4'>

                <div className='flex justify-between items-center'>

                    <div className='flex gap-x-2 items-center'>
                        <GrTasks className='text-[22px] text-[#FF3131]' />
                        <span className='uppercase text-[22px] font-bold'>Task Manager</span>
                    </div>

                    <div className='flex gap-x-3 items-center '>

                        <Link className='rounded-sm bg-[red] py-2 px-2 flex items-center justify-center' to="/registration"> <li className='text-[14px] list-none uppercase text-white'>Sign Up</li> </Link>

                        <Link className='rounded-sm bg-[red] py-2 px-2 flex items-center justify-center' to="/login"> <li className='text-[14px] text-white list-none uppercase'>Login</li> </Link>

                        <Link className=' py-2 px-2'>
                            <img src="https://t4.ftcdn.net/jpg/03/64/21/11/240_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="profile_picture" className='h-10 w-10 rounded-full object-cover' />
                        </Link>

                        <div className='flex gap-x-5 items-center'>
                            <LogOut />
                            <button onClick={logOutHandler} className='outline-none border-none cursor-pointer' variant="link"> Log Out</button>
                        </div>

                    </div>
                </div>

            </div>



        </>
    );
};

export default NavBar;