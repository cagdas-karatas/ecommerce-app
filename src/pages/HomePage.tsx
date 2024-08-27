import React, { useEffect, useState } from 'react';
import "../styles/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { Product } from '../types';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import AddProductPage from './AddProductPage';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import AppBar from '../components/AppBar';

const HomePage: React.FC = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [userType, setUserType] = useState<string>("none");
    const [open, setOpen] = useState(false);
    axios.defaults.withCredentials = true;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        axios.get("http://localhost:5212/api/Login/usercheck").then(
            response => {
                setUser(response.data.user);
                if(user.user.userType === "admin")
                {
                    navigate("/admin");
                }
                else
                {
                    setUserType(user.user.userType);
                }
            }
        ).catch(
            error => {
                if (error.response && error.response.status === 400) {
                    setUserType("none");
                }
            }
        );

        axios.get("http://localhost:5212/api/Product").then(
            response => {
                setProducts(response.data);
            }
        ).catch(
            error => {
                console.log("ürün yok");
            }
        );
    }, []);

    return (
        <div className="home-page-wrapper">
            <AppBar header='Hepsişurada' headerHref='/' withSideMenu={false} withSearchBox={true} userType={user ? user.user.userType : "none"}/>

            <div className="content">
                <ProductList products={products} />
            </div>
        </div>
    )
}

export default HomePage;
