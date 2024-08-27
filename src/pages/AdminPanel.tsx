import React from 'react'
import AppBar from '../components/AppBar';
import RequestList from '../components/RequestList';
import "../styles/AdminPanel.css"

const AdminPanel = () => {
    return (
        <div className='admin-page-wrapper'>
            <AppBar header='Admin Panel' headerHref='/admin' withSideMenu={true} userType={"admin"} withSearchBox={false} />

            <div className="content">
                <RequestList />
            </div>
        </div>
    )
}

export default AdminPanel;
