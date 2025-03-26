import React, { useState } from 'react';
import MasterLayout from '../Components/MasterLayout';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserApiRequest } from '../ApiRequest/UserApiRequest';

const UpdateProfilePage = () => {

    const { currentUser, loading } = useSelector((state) => state.userslc)



    const [inputData, setInputData] = useState({
        email: currentUser?.email,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        mobile: currentUser?.mobile,
        imageFile: currentUser?.photo?.photoUrl, // imageFile --> different name from userl model photo property
    })

    const changeInputEventHandeler = async (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    //console.log(inputData)

    const changeFileHandeler = async (event) => {
        const fille = event.target.files?.[0] // input type file and this property is files
        setInputData({
            ...inputData,
            imageFile: fille,

        })
    }
    //console.log(inputData)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("email", inputData.email) //FormData.append("key", value)
        formData.append("firstName", inputData.firstName)
        formData.append("lastName", inputData.lastName)
        formData.append("mobile", inputData.mobile)
        if (inputData.imageFile) {
            formData.append("image_or_pdf_file", inputData.imageFile) // "image_or_pdf_file" comes from multer.js
        }

        await UpdateUserApiRequest(currentUser._id, formData, dispatch);
        // if pass inputData as a parameter image upload functionality is not work. but text update functinality works 
    }

    return (

        <>
            <MasterLayout>

                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 shadow-lg rounded-2xl space-y-6 mt-7">
                    <div className="grid grid-cols-3 gap-6">


                        <div>
                            <label className="block mb-2 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                readOnly={true}
                                value={inputData.email}
                                onChange={changeInputEventHandeler}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={inputData.firstName}
                                onChange={changeInputEventHandeler}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={inputData.lastName}
                                onChange={changeInputEventHandeler}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-2 text-sm font-medium">Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={inputData.mobile}
                                onChange={changeInputEventHandeler}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-2 text-sm font-medium">User Image</label>
                            <input
                                type="file"
                                name="image_or_pdf_file"  // "image_or_pdf_file" comes from multer backend
                                onChange={changeFileHandeler}
                                accept="image/*"
                                className="w-full p-2 border rounded-lg cursor-pointer"
                            />
                            <h6> {currentUser?.photo?.photofileName}</h6>
                        </div>

                    </div>

                    {
                        loading ? (
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Loading...
                            </button>
                        ) : (
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Submit
                            </button>
                        )

                    }



                </form>

            </MasterLayout >
        </>
    );
};

export default UpdateProfilePage; 