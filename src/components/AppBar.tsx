import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import "../styles/AppBar.css"
import axios from 'axios';

interface AppBarProps {
    header: string;
    headerHref: string;
    withSideMenu: boolean;
    withSearchBox: boolean;
    userType: any;
}

export default function AppBar({header, headerHref, withSideMenu, withSearchBox, userType}: AppBarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("http://localhost:5212/api/Login/logout").then(
            response => {
                navigate("/");
            }
        );
    }

    const goToStore = () => {
        navigate("/store");
    }

    return (
        <nav className="app-bar">
            <div className="home-and-menu">
                <span className="home-link" onClick={() => { navigate(headerHref) }}>{header}</span>
            </div>

            <div style={{display: withSearchBox ? "flex" : "none"}} className="search-box">
                <input type="text" placeholder="Ara" />
                <SearchIcon className='search-icon'></SearchIcon>
            </div>

            <div style={{ display: userType === "none" ? "flex" : "none" }} className="user-buttons" id="none_user-buttons">
                    <button className="none-user-button" id='login-button' onClick={() => navigate("/login")}>Login</button>
                    <button className="none-user-button" id='sign-up-button' onClick={() => navigate("/sign-up")}>Sign Up</button>
                </div>
                
                <div style={{ display: userType === "customer" ? "flex" : "none" }} className="user-buttons" id="customer-buttons">
                    <div className="menu-button">
                        <button className="circle-button">
                            <ShoppingCartIcon id="shoppingCartIcon" />
                        </button>
                    </div>
                    <div className="menu-button">
                        <button className="circle-button">
                            <PersonIcon id="person-icon" />
                        </button>
                        <div className="dropdown-wrapper">
                            <div className="account-dropdown-menu">
                                <a>Profile</a>
                                <a href="/" onClick={() => handleLogout()}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: userType === "seller" ? "flex" : "none" }} className="user-buttons" id="seller-buttons">

                    <div className="menu-button">
                        <button className="circle-button">
                            <ShoppingCartIcon id="shoppingCartIcon" />
                        </button>
                    </div>

                    <div className="menu-button">
                        <button className="circle-button">
                            <PersonIcon id="person-icon" />
                        </button>
                        <div className="dropdown-wrapper">
                            <div className="account-dropdown-menu">
                                <a>Profile</a>
                                <a href="/" onClick={() => handleLogout()}>Logout</a>
                            </div>
                        </div>
                    </div>

                    <div className="menu-button">
                        <button className="circle-button" onClick={goToStore}>
                            <StorefrontIcon id="store-icon"/>
                        </button>
                    </div>

                </div>
        </nav>
    )
}
