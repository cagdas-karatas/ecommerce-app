import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ShopRequest } from '../types';
import "../styles/RequestList.css";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useUser } from '../contexts/UserContext';
import { error } from 'console';

const RequestList: React.FC = () => {
    const { user } = useUser();
    const [data, setData] = useState<ShopRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [requestId, setRequestId] = useState<number>(0);

    useEffect(() => {
        if (user && user.token) {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!loading) {
            axios.get("http://localhost:5212/api/Shop/requests")
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const getRequestData = () => {
        axios.get("http://localhost:5212/api/Shop/requests")
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

    const authAxios = axios.create({
        baseURL: "http://localhost:5212/api/Shop/",
        headers: {
            Authorization: `Bearer ${user.token.accesToken}`
        }
    });

    const handleAccept = (id: number) => {
        authAxios.post(id + "/approved")
            .then(
                response => {
                    alert("İşlem başarılı");
                    getRequestData();
                }
            )
            .catch(
                error => {
                    console.log(error);
                    alert("İşlem yapılırken bir hata oluştu");
                }
            );
    }

    const handleReject = (id: number) => {
        authAxios.post(id + "/rejected")
            .then(
                response => {
                    alert("İşlem başarılı");
                    getRequestData();
                }
            )
            .catch(
                error => {
                    console.log(error);
                    alert("İşlem yapılırken bir hata oluştu");
                }
            );
    }

    const handleSearch = () => {
        console.log("basıldı");
        authAxios.get(`http://localhost:5212/api/Shop/requests?${requestId !== 0 ? `ShopRquestId=${requestId}` : ""}`)
            .then(
                response => {
                    console.log("sonuç geldi");
                    setData(response.data);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            );
    }

    return (
        <div className='request-list-wrapper'>
            <div className="filter-row">
                <input className='filter-item' type="number" placeholder='Request No' onChange={(e) => setRequestId(parseInt(e.target.value))} />
                <button id="search-button" onClick={handleSearch}>Ara</button>
            </div>
            <table className="request-list">
                <thead>
                    <th>Request No</th>
                    <th>Shop Name</th>
                    <th>Tax Number</th>
                    <th>Company Phone Number</th>
                    <th>Shop Address</th>
                    <th>Approve Status</th>
                    <th>User Id</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        data.length > 0
                            ? data.map((requestItem, index) => (
                                <tr>
                                    <td>{requestItem.shopRequestId}</td>
                                    <td>{requestItem.shopName}</td>
                                    <td>{requestItem.taxNumber}</td>
                                    <td>{requestItem.companyPhoneNumber}</td>
                                    <td>{requestItem.shopAddress}</td>
                                    <td style={{ color: requestItem.approveStatus === "approved" ? "green" : requestItem.approveStatus === "rejected" ? "red" : "orange" }}>{requestItem.approveStatus}</td>
                                    <td>{requestItem.userId}</td>
                                    <td>
                                        <div className="actions" style={{ display: requestItem.approveStatus === "pending" ? "flex" : "none" }}>
                                            <button id='accept-button' onClick={() => { handleAccept(requestItem.shopRequestId) }}>
                                                <DoneIcon />
                                            </button>
                                            <button id='reject-button' onClick={() => { handleReject(requestItem.shopRequestId) }}>
                                                <ClearIcon />
                                            </button>
                                        </div>
                                        <a style={{ display: requestItem.approveStatus === "pending" ? "none" : "initial" }}>No Action</a>
                                    </td>
                                </tr>
                            ))
                            : <tr>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                                <td>none</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default RequestList;
