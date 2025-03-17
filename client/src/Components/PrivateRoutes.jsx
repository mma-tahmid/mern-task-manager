import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {

    const { currentUser } = useSelector((state) => state.userslc)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser === null) {
            navigate("/login")
        }

    }, []);

    
    return (
        <>
            {children}
        </>

    )

};



export default PrivateRoutes;

