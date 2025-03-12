import React from 'react';


import SideNavBar from './MasterLayoutComponents/SideNavBar';
import NavBar from './MasterLayoutComponents/NavBar';


const MasterLayout = ({ children }) => {


    //const sideBar= true
    return (

        <>
            <div className="flex h-screen">
                {/* Sidebar */}

                <SideNavBar />


                <div className="flex-1 flex flex-col">
                    {/* Navbar */}
                    <NavBar />

                    {/* Main Content */}
                    <main className="flex-1 p-6 overflow-y-auto">
                        {children}
                    </main>

                </div>
            </div>

        </>
    );
};







// const MasterLayout = ({ children }) => {

//     const [collapsed, setCollapsed] = useState(false);
//    //const sideBar= true
//     return (

//         <>
//             <div className="flex h-screen">
//                 {/* Sidebar */}

//                         <div className={`bg-gray-800 text-white p-4 transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
//                             <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
//                                 {collapsed ? <Menu /> : <X />}
//                                 {/* <Menu/> ----> Menu icon */}
//                             </button>

//                             {!collapsed && (
//                                 <nav className="space-y-4">
//                                     <a href="#" className="block">Dashboard</a>
//                                     <a href="#" className="block">Tasks</a>
//                                     <a href="#" className="block">Settings</a>
//                                 </nav>
//                             )}
//                         </div>


//                 <div className="flex-1 flex flex-col">
//                     {/* Navbar */}
//                     <header className="bg-white shadow p-4">Admin Dashboard</header>

//                     {/* Main Content */}
//                     <main className="flex-1 p-6 overflow-y-auto">
//                         {children}
//                     </main>
//                 </div>
//             </div>

//         </>
//     );
// };

export default MasterLayout;