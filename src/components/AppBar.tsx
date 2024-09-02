import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/AppBar.css"
import axios from 'axios';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

interface SideMenuItem {
    name: string;
    href: string;
}

interface AppBarProps {
    header: string;
    headerHref: string;
    withSideMenu: boolean;
    sideMenuItems?: SideMenuItem[];
    withSearchBox: boolean;
    userType: any;
}

export default function AppBar({ header, headerHref, withSideMenu, sideMenuItems, withSearchBox, userType }: AppBarProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

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
                <Drawer variant="temporary" open={open} onClose={toggleDrawer}>
                    <List>
                        {sideMenuItems && sideMenuItems.map((item, index) => (
                            <ListItem button component={Link} to={item.href} onClick={toggleDrawer} key={index}>
                                <ListItemText style={{ padding: "5px 30px 5px 30px" }} primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div style={{ display: withSideMenu ? "flex" : "none" }} className="side-menu-button" onClick={toggleDrawer} >
                    <MenuIcon className="side-menu-icon" />
                    <MenuIcon className="side-menu-icon" id="side-menu-icon-shadow" />
                </div>
                <span className="home-link" onClick={() => { navigate(headerHref) }}>{header}</span>
            </div>

            <div style={{ display: withSearchBox ? "flex" : "none" }} className="search-box">
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
                        <div className="dropdown-menu">
                            <a onClick={() => navigate("profile")}>Profile</a>
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: userType === "seller" ? "flex" : "none" }} className="user-buttons" id="seller-buttons">
                <div className="menu-button">
                    <Link to={"store"}>
                        <button className="circle-button">
                            <StorefrontIcon id="store-icon" />
                        </button>
                    </Link>
                </div>

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
                        <div className="dropdown-menu">
                            <a onClick={() => navigate("profile")}>Profile</a>
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ display: userType === "admin" ? "flex" : "none" }} className="user-buttons" id='admin-buttons'>
                <div className="menu-button">
                    <button className="circle-button">
                        <PersonIcon id="person-icon" />
                    </button>
                    <div className="dropdown-wrapper">
                        <div className="dropdown-menu">
                            <a onClick={() => navigate("profile")}>Profile</a>
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
