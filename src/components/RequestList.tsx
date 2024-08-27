import axios from 'axios';
import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { ShopRequest } from '../types';
import "../styles/RequestList.css"

const RequestList: React.FC = () => {
    const [data, setData] = useState<ShopRequest[]>([]);

    useEffect(()=>{
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
    });

    return (
        <div className='request-list-wrapper'>
            <table className="request-list">
                <thead>
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
                        data ? data.map((requestItem, index) => (
                            <tr>
                                <td>{requestItem.shopName}</td>
                                <td>{requestItem.taxNumber}</td>
                                <td>{requestItem.companyPhoneNumber}</td>
                                <td>{requestItem.shopAddress}</td>
                                <td>{requestItem.approveStatus}</td>
                                <td>{requestItem.userId}</td>
                                <td className='actions'>
                                    <button>Kabul</button>
                                    <button>Red</button>
                                </td>
                            </tr>
                        )) : "Getirilecek Request Bulunamadı"
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RequestList;
