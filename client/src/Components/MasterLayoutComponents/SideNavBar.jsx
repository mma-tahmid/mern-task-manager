import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { MdOutlineFiberNew } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";




const SideNavBar = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <>
            <div className={`bg-gray-800 text-white p-4 transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
                <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
                    {collapsed ? <Menu /> : <X />}
                    {/* <Menu/> ----> Menu icon */}
                </button>

                {!collapsed && (
                    <nav className="space-y-4">

                        <Link className='block' to="">
                            <div className='flex items-center gap-x-1'>
                                <MdOutlineSpaceDashboard className='text-orange-400 text-[20px]' />
                                <span className='text-white font-bold text-[18px]'>Dashboard</span>
                            </div>
                        </Link>
                       
                        <Link className='block' to="/create-new-task">
                            <div className='flex items-center gap-x-1'>
                                <MdCreateNewFolder className='text-orange-400 text-[20px]' />
                                <span className='text-white font-bold text-[18px]'>Create New</span>
                            </div>
                        </Link>

                        <Link className='block' to="/new-task">
                            <div className='flex items-center gap-x-1'>
                                <MdOutlineFiberNew  className='text-orange-400 text-[24px]' />
                                <span className='text-white font-bold text-[18px]'>New Task </span>
                            </div>
                        </Link>

                        <Link className='block' to="/inprogress-task">
                            <div className='flex items-center gap-x-1'>
                                <GrInProgress className='text-orange-400 text-[20px]' />
                                <span className='text-white font-bold text-[18px]'>In progress</span>
                            </div>
                        </Link>

                        <Link className='block' to="/completed-task">
                            <div className='flex items-center gap-x-1'>
                                <IoIosCheckmarkCircleOutline className='text-orange-400 text-[20px]' />
                                <span className='text-white font-bold text-[18px]'>Completed</span>
                            </div>
                        </Link>

                        <Link className='block' to="/canceled-task">
                            <div className='flex items-center gap-x-1'>
                                <MdCancelPresentation  className='text-orange-400 text-[20px]' />
                                <span className='text-white font-bold text-[18px]'>Canceled</span>
                            </div>
                        </Link>
                        
                    </nav>
                )}
            </div>
        </>
    );
};

export default SideNavBar;