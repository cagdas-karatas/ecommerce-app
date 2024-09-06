import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import "../styles/ProfilePage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Modal } from '@mui/material';
import { ShopRequest } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [hasRequest, setHasRequest] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [shopRequest, setShopRequest] = useState<ShopRequest | undefined>(undefined);

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${user.token.accesToken}`
    }
  });

  useEffect(() => {
    authAxios.get(`http://localhost:5212/api/Shop/requests?UserId=${user.user.userId}`)
      .then(
        response => {
          console.log("sonuç geldi");
          if (response.data.length > 0) {
            console.log("sonucun length'i 0'dan fazla");
            setHasRequest(true);
            setShopRequest(response.data[0]);
          }
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }, []);

  const handleShowRequest = () => {
    setInfoModalShow(true);
  }

  if (!(user && user.user && user.user.userType)) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className='profile-page-wrapper'>
      <h1>Hoşgeldiniz {user.user.firstName} {user.user.lastName}</h1>
      <p>Kullanıcı Adı: {user.user.userName}</p>
      <p>Telefon: {user.user.phoneNumber}</p>
      <p>E-mail: {user.user.email}</p>
      <p>Yetki: {user.user.userType}</p>
      {
        !hasRequest
          ?
          <p style={{ display: user.user.userType === "customer" ? "initial" : "none" }} className="become-a-seller">
            Wanna become a seller? <a onClick={() => navigate("/seller-form")}>Click Here</a>
          </p>

          :
          <p style={{ display: user.user.userType === "customer" ? "initial" : "none" }} className="become-a-seller">
            <a onClick={handleShowRequest}>Check Your Application</a>
            <Modal open={infoModalShow} onClose={() => setInfoModalShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <div className="request-info-modal">
                  <div className="modal-header">
                    <h2>Mağaza İstek Bilgileri</h2>
                  </div>
                  <div className="modal-content">
                    <table className='request-list'>
                      {
                        shopRequest !== undefined
                          ?
                          <div>
                            <tr>
                              <th>Request No</th>
                              <th>Shop Name</th>
                              <th>Tax Number</th>
                              <th>Company Phone Number</th>
                              <th>Shop Address</th>
                              <th>Approve Status</th>
                              <th>User Id</th>
                            </tr>
                            <tr>
                              <td>{shopRequest.shopRequestId}</td>
                              <td>{shopRequest.shopName}</td>
                              <td>{shopRequest.taxNumber}</td>
                              <td>{shopRequest.companyPhoneNumber}</td>
                              <td>{shopRequest.shopAddress}</td>
                              <td style={{ color: shopRequest.approveStatus === "approved" ? "green" : shopRequest.approveStatus === "rejected" ? "red" : "orange" }}>{shopRequest.approveStatus}</td>
                              <td>{shopRequest.userId}</td>
                            </tr>
                          </div>

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
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button id='ok-button' onClick={() => setInfoModalShow(false)}> Ok </button>
                  </div>
                </div>
              </Box>
            </Modal>
          </p>
      }

    </div>
  )
}

export default ProfilePage;
