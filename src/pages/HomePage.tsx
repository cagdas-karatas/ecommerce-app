import React, { useEffect, useState } from 'react';
import "../styles/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const HomePage: React.FC = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    axios.defaults.withCredentials = true;

    const fakestoreapiAxios = axios.create({
        withCredentials: false
    });

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

        fakestoreapiAxios.get("https://fakestoreapi.com/products").then(
            response => {
                setProducts(response.data);
            }
        ).catch(
            error=>{
                alert("ürünleri getirirken bir hata oluştu");
            }
        );
    }, []);

    return (
        <div className="home-page-wrapper">
            <nav className="app-bar">
                <span className="home-link">Hepsişurda</span>
                <div className="search-box">
                    <input type="text" placeholder="Ara" />
                    <SearchIcon className='search-icon'></SearchIcon>
                </div>
                <div style={{ display: isLoggedIn ? "none" : "flex" }} className="before-login-buttons">
                    <button className="before-login-button" id='login-button' onClick={()=>navigate("/login")}>Login</button>
                    <button className="before-login-button" id='sign-up-button' onClick={()=>navigate("/sign-up")}>Sign Up</button>
                </div>
                <div style={{ display: isLoggedIn ? "flex" : "none" }} className="after-login-buttons">
                    <button className="circle-button" onClick={()=>{navigate("/add-product")}}>
                        <AddIcon className="person-icon"/>
                    </button>
                    <button className="circle-button">
                        <ShoppingCartIcon className="shoppingCartIcon"/>
                    </button>
                    <button className="circle-button">
                        <PersonIcon className="person-icon"/>
                    </button>
                </div>
            </nav>

            <div className="content">
                <ProductList products={products}></ProductList>
            </div>
        </div>
    )
}

export default HomePage;
