import React, { useEffect, useState } from 'react';
import "../styles/HomePage.css";
import ProductList from '../components/ProductList';
import axios from 'axios';
import { Product } from '../types';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import AppBar from '../components/AppBar';
import ProfilePage from './ProfilePage';
import SellerFormContainer from '../components/SellerFormContainer';
import StorePage from './StorePage';
import AddProductPage from './AddProductPage';
import ProductDetailsPage from './ProductDetailsPage';
import ShoppingCartPage from './ShoppingCartPage';

const HomePage: React.FC = () => {
    const { setUser } = useUser();
    const { user } = useUser();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [userType, setUserType] = useState<string>("none");
    const [loading, setLoading] = useState(true);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:5212/api/Login/usercheck").then(
            response => {
                setUser(response.data);
                setLoading(false);
                if (user.user.userType === "admin") {
                    navigate("/admin");
                }
                else {
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

    }, [loading]);

    return (
        <div className="home-page-wrapper">
            <AppBar header='Hepsişurada' headerHref='/' withSideMenu={userType === "seller" ? true : false} sideMenuItems={userType === "seller" ? [{name: "Ürün ekle", href:"add-product"}] : undefined} withSearchBox={true} userType={userType} />

            <div className="content">
                <Routes>
                    <Route path='/' element={<ProductList products={products} fetchForSeller={false}/>} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path='seller-form' element={<SellerFormContainer />} />
                    <Route path='store' element={<StorePage/>}/>
                    <Route path='add-product' element={<AddProductPage />} />
                    <Route path='product-details' element={<ProductDetailsPage />} />
                    <Route path='shopping-cart' element={<ShoppingCartPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default HomePage;
