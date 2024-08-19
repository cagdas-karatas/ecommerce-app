import React, { useEffect, useState } from 'react';
import "../styles/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { Product } from '../types';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then(
            response => {
                setProducts(response.data);
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
                <div className="buttons">
                    <div className="circle-button">
                        <ShoppingCartIcon></ShoppingCartIcon>
                    </div>
                    <div className="circle-button">
                        <PersonIcon className="person-icon"></PersonIcon>
                    </div>
                </div>
            </nav>

            <div className="content">
                <ProductList products={products}></ProductList>
            </div>
        </div>
    )
}

export default HomePage;
