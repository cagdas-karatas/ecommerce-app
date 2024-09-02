import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/ProductCardForStore.css";
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { error } from 'console';

type ProductCardForStoreProps = {
    product: Product;
}

const ProductCardForStore: React.FC<ProductCardForStoreProps> = ({ product }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const authAxios = axios.create({
        baseURL: "http://localhost:5212/api/Product/",
        headers: {
            Authorization: `Bearer ${user.token.accesToken}`
        }
    });

    const handleDelete = () => {
        authAxios.delete("http://localhost:5212/api/Product/" + product.productId)
            .then(
                repsonse => {
                    alert("ürün başarıyla silindi");
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    return (
        <div className="product-card-for-store">
            <div className="delete-button" onClick={handleDelete}>
                <DeleteIcon />
            </div>
            <div className="image">
                <img src={"http://localhost:5212/images/" + product.imageName} alt={product.productName} />
            </div>
            <div className="product-page-content">
                <h3>{product.productName}</h3>
                <p className='price'>Price: ₺{product.price}</p>
            </div>
        </div>
    );
}

export default ProductCardForStore;
