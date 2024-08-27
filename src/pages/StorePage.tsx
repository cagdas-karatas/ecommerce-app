import React, { useEffect } from 'react'
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const StorePage = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(()=>{
        if (user===null || user.userType !== "seller")
        {
            navigate("/");
        }
    });

    return (
        <div>
            store page
        </div>
    )
}

export default StorePage;
