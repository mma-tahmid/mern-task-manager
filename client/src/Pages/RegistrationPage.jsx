import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationRequest } from '../ApiRequest/UserApiRequest';
import { useDispatch, useSelector } from 'react-redux';


const RegistrationPage = () => {


    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
    })


    const { loading } = useSelector((state) => state.userslc)

    const changeInputEventHandler = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    //console.log(inputData)

    // const dispatch = 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await RegistrationRequest(inputData, navigate, dispatch);
    };




    return (

        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                name='firstName'
                                onChange={changeInputEventHandler}
                                value={inputData.firstName}
                                placeholder="Alex"
                                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name='lastName'
                                onChange={changeInputEventHandler}
                                value={inputData.lastName}
                                placeholder="Hales"
                                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name='email'
                                onChange={changeInputEventHandler}
                                value={inputData.email}
                                placeholder="xyz@gmail.com"
                                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                name='password'
                                onChange={changeInputEventHandler}
                                value={inputData.password}
                                placeholder="******"
                                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Mobile
                            </label>

                            <input
                                type="text"
                                name='mobile'
                                onChange={changeInputEventHandler}
                                value={inputData.mobile}
                                placeholder="01890876345"
                                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />
                        </div>

                        {
                            loading ? (<button disabled={loading} type="submit" className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition"
                            > Loading.... </button>) :

                                < button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition cursor-pointer"
                                > Sign Up </button>
                        }

                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline"> Log In </Link>
                    </p>
                    <p className='text-center text-sm text-orange-500'> <Link to=""> Forget Password </Link></p>
                </div>
            </div >



        </>
    );
};

export default RegistrationPage;