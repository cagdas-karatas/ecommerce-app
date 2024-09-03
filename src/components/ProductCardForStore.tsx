import React, { useState } from 'react'
import { Category, Product } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../styles/ProductCardForStore.css";
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import CategoryDropdown from './CategoryDropdown';
import { Box, Modal } from '@mui/material';
import { Button } from 'react-bootstrap';

type ProductCardForStoreProps = {
    product: Product;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

const ProductCardForStore: React.FC<ProductCardForStoreProps> = ({ product }) => {
    const { user } = useUser();
    const [editModalShow, setEditModalShow] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>(product.categoryId);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

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
                    setIsDeleted(true);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    const handleEdit = () => {
        axios.get(`http://localhost:5212/api/Product/${product.productId}`)
            .then((result) => {
                setProductName(result.data.productName);
                setDescription(result.data.productDescription);
                setPrice(result.data.price);
            })
            .catch((error) => {
                console.log(error);
            });
        setEditModalShow(true);
    }

    const handleUpdate = () => {
        const productData = new FormData();
        productData.append('productId', product.productId.toString());
        productData.append('shopId', user.user.shopId);
        productData.append('productName', productName);
        productData.append('productDescription', description);
        productData.append('categoryId', selectedCategory.toString());
        productData.append('price', price.toString());
        productData.append('imageName', product.imageName);

        authAxios.put("http://localhost:5212/api/Product", productData).then(
            response => {
                alert("ürün başarıyla güncellendi");
                setEditModalShow(false);
            }
        ).catch(
            err => {
                if (err.response?.data?.errors) {
                    const errorMessages = Object.values(err.response.data.errors);
                    const combinedErrors = errorMessages.join('\n');
                    alert(combinedErrors);
                } else {
                    console.log(err);
                }
            }
        );
    }

    if (isDeleted) {
        return <a style={{ display: "none" }}></a>;
    }
    else {
        return (
            <div className="product-card-for-store" >
                <div className="action-button" id="delete-button" onClick={handleDelete}>
                    <DeleteIcon />
                </div>
                <div className="action-button" id="edit-button" onClick={handleEdit}>
                    <EditIcon />
                </div>
                <div className="image">
                    <img src={"http://localhost:5212/images/" + product.imageName} alt={product.productName} />
                </div>
                <div className="product-card-for-store-content">
                    <h3>{product.productName}</h3>
                    <p className='price'>Price: ₺{product.price}</p>
                </div>

                <Modal open={editModalShow} onClose={() => setEditModalShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <div className="modal">
                            <div className="modal-header">
                                <h2>Düzenle</h2>
                            </div>
                            <div className="modal-content">
                                <input type="text" className="edit-input" placeholder={"Ürün İsmi"} value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <input type="number" className="edit-input" placeholder={"Fiyat"} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                                <input type="text" className="edit-input" placeholder={"Açıklama"} value={description} onChange={(e) => setDescription(e.target.value)} />
                                <CategoryDropdown initialValue={product.categoryId} onSelected={(value) => setSelectedCategory(value)} />
                            </div>
                            <div className="modal-footer">
                                <button id='cancel-button' onClick={() => setEditModalShow(false)}> İptal </button>
                                <button id='update-button' onClick={handleUpdate}> Güncelle </button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div >);
    }
}

export default ProductCardForStore;
