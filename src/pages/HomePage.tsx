import React, { useEffect, useState } from 'react';
import "../styles/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { Product } from '../types';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import AddProductPage from './AddProductPage';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const HomePage: React.FC = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    axios.defaults.withCredentials = true;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        axios.get("http://localhost:5212/api/Login/usercheck").then(
            response => {
                setUser(response.data.user);
                setIsLoggedIn(true);
            }
        ).catch(
            error => {
                if (error.response && error.response.status === 400) {
                    setIsLoggedIn(false);
                }
            }
        );

        axios.get("http://localhost:5212/api/Product").then(
            response => {
                setProducts(response.data);
            }
        ).catch(
            error => {
                alert("ürünleri getirirken bir hata oluştu");
            }
        );
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:5212/api/Login/logout").then(
            response => {
                navigate("/");
            }
        );
    }

    return (
        <div className="home-page-wrapper">
            <nav className="app-bar">
                <Drawer variant="temporary" open={open} onClose={toggleDrawer}>
                    <List>
                        <ListItem button component={Link} to='add-product' onClick={toggleDrawer}>
                            <ListItemText style={{ padding: "5px 30px 5px 30px" }} primary={"Ürün Ekle"} />
                        </ListItem>
                    </List>
                </Drawer>
                <div className="home-and-menu">
                    <div className="side-menu-button" onClick={toggleDrawer} >
                        <MenuIcon className="side-menu-icon" />
                        <MenuIcon className="side-menu-icon" id="side-menu-icon-shadow" />
                    </div>
                    <span className="home-link" onClick={() => { navigate("/") }}>Hepsişurada</span>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Ara" />
                    <SearchIcon className='search-icon'></SearchIcon>
                </div>
                <div style={{ display: isLoggedIn ? "none" : "flex" }} className="before-login-buttons">
                    <button className="before-login-button" id='login-button' onClick={() => navigate("/login")}>Login</button>
                    <button className="before-login-button" id='sign-up-button' onClick={() => navigate("/sign-up")}>Sign Up</button>
                </div>
                <div style={{ display: isLoggedIn ? "flex" : "none" }} className="after-login-buttons">
                    <div className="menu-button">
                        <button className="circle-button">
                            <ShoppingCartIcon className="shoppingCartIcon" />
                        </button>
                    </div>
                    <div className="menu-button">
                        <button className="circle-button">
                            <PersonIcon className="person-icon" />
                        </button>
                        <div className="dropdown-wrapper">
                            <div className="account-dropdown-menu">
                                <a>Profile</a>
                                <a href="/" onClick={() => handleLogout()}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="content">
                <Routes>
                    <Route path='/' element={<ProductList products={products} />} />
                    <Route path='add-product' element={<AddProductPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default HomePage;
