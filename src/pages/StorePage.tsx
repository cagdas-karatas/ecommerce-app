import React, { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import { Product } from '../types';
import "../styles/StorePage.css"

const StorePage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        if (user && user.token) {
            setLoading(false);
            axios.get("http://localhost:5212/api/Product")
            .then(
                response => {
                    setProducts(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        }
    }, [user]);

    useEffect(()=>{
        if (user === null || user.user.userType !== "seller")
        {
            navigate("/");
        }
    });

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className='store-page-wrapper'>
            <h2>Ürünler:</h2>
            <ProductList products={products}/>
        </div>
    );
}

export default StorePage;
