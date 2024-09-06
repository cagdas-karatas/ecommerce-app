import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';
import "../styles/ProductDetailsPage.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const ProductDetailsPage: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    if(location && location.state)
    {
        setLoading(false);
    }
  }, [location]);

  if(loading)
  {
    return <div>Ürün bulunamadı</div>
  }

  const { product } = location.state as { product: Product };

  const handleAddToShoppingCart = () => {
    axios.post(`http://localhost:5212/api/ShoppingCart?p_id=${product.productId}&u_id=${user.user.userId}`)
    .then(
      response => {
        alert("ürün başarıyal sepete eklendi");
        setCounter(counter+1);
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  } 

  return (
    <div className="product-details-page-wrapper">
      <div className="image">
        <img src={"http://localhost:5212/images/" + product.imageName} alt={product.productName} />
      </div>
      <div className="details-content">
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        <p>Price: ₺{product.price} <button onClick={handleAddToShoppingCart}><AddShoppingCartIcon /></button> {counter}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;