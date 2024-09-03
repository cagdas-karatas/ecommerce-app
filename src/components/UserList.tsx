import React, { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import { ShopRequest, User } from '../types';
import axios, { AxiosInstance } from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
    const { user } = useUser();
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    
    const authAxios = axios.create({
        headers:{
            Authorization: `Bearer ${user.token.accesToken}`
        }
    });

    useEffect(() => {
        if (user && user.token) {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!loading) {
            authAxios.get("http://localhost:5212/api/User")
                .then(
                    response => {
                        setData(response.data);
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                );
        }
    }, [loading]);

    const handleEdit = (userId: number) => {

    }

    const handleDelete = (userId: number) => {

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='request-list-wrapper'>
            <table className="request-list">
                <thead>
                    <th>User Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Shop Id</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        data ? data.map((userItem, index) => (
                            <tr>
                                <td>{userItem.userName}</td>
                                <td>{userItem.firstName}</td>
                                <td>{userItem.lastName}</td>
                                <td>{userItem.phoneNumber}</td>
                                <td>{userItem.email}</td>
                                <td>{userItem.userType === "admin" ? "Yönetici" : userItem.userType === "seller" ? "Satıcı" : "Müşteri"}</td>
                                <td>{userItem.shopId ? userItem.shopId : "-"}</td>
                                <td>
                                    <div className="actions">
                                        <button id='edit-button' onClick={() => { handleEdit(userItem.userId) }}>
                                            <EditIcon />
                                        </button>
                                        <button id='delete-button' onClick={() => { handleDelete(userItem.userId) }}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : "Kullanıcıları Getirirken Bir Sorun Oluştu"
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;