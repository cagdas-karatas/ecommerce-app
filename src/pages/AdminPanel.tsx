import React, { useEffect } from 'react'
import AppBar from '../components/AppBar';
import RequestList from '../components/RequestList';
import "../styles/AdminPanel.css"
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

const AdminPanel = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    useEffect(()=>{
        axios.get("http://localhost:5212/api/Login/usercheck")
        .then(
            response => {
                setUser(response.data);
            }
        )
        .catch(
            error => {
                navigate("/");
            }
        );
    }, [setUser, navigate]);


    return (
        <div className='admin-page-wrapper'>
            <AppBar header='Admin Panel' headerHref='/admin' withSideMenu={true} sideMenuItems={[{name: "Mağaza İstekleri", href: "request-list"}]} userType={"admin"} withSearchBox={false} />

            <div className="content">
                <Routes>
                    <Route path='request-list' element={<RequestList />}></Route>
                    <Route path='profile' element={<ProfilePage />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default AdminPanel;
