import React, { useState } from 'react'
import { Category, Product } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../styles/ProductCardForStore.css";
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import CategoryDropdown from './CategoryDropdown';
import { Box, Modal } from '@mui/material';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

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
    const [productState, setProductState] = useState(product);
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>(product.categoryId);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [imageSource, setImageSource] = useState(`http://localhost:5212/images/${product.imageName}`);
    const [imageName, setImageName] = useState(product.imageName);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [file, setFile] = useState<File>();

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

    const handleCancel = () => {
        setEditModalShow(false);
        setImageSource(`http://localhost:5212/images/${product.imageName}`);
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
        if (file) {
            productData.append('imageFile', file);
        }

        authAxios.put("http://localhost:5212/api/Product", productData).then(
            response => {
                alert("ürün başarıyla güncellendi");
                setEditModalShow(false);
                updateStateOfProduct();
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

    const loadFile = (file: File | undefined) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = x => {
                setFile(file);
                setImageName(file.name);
                setImageSource((x.target?.result) as string);
            }
            reader.readAsDataURL(file);
        }
    }

    const updateStateOfProduct = () => {
        axios.get(`http://localhost:5212/api/Product/${product.productId}`)
        .then(
            response => {
                const updatedProduct = {
                    ...productState,
                    productName: response.data.productName,
                    categoryId: response.data.categoryId,
                    price: response.data.price,
                    productDescription: response.data.productDescription,
                    imageName: response.data.imageName,
                };
                setProductState(updatedProduct);
                setImageSource(`http://localhost:5212/images/${response.data.imageName}`);
            }
        )
        .catch(
            error => {
                console.log(error);
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
                    <img src={imageSource} />
                </div>
                <div className="product-card-for-store-content">
                    <h3>{productState.productName}</h3>
                    <p className='price'>Price: ₺{productState.price}</p>
                </div>

                <Modal open={editModalShow} onClose={() => setEditModalShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <div className="modal">
                            <div className="modal-header">
                                <h2>Düzenle</h2>
                            </div>
                            <div className="modal-content">
                                <img id="preview-image" src={imageSource} alt="" />
                                <input style={{ display: "none" }} type="file" id="uploader" accept="image/*" onChange={(e) => loadFile(e.target.files?.[0])} />
                                <label htmlFor='uploader' id='uploadButton'><CropOriginalIcon /></label>
                                <a>{imageName == "" ? "Dosya seçilmedi" : imageName}</a>
                                <input type="text" className="edit-input" placeholder={"Ürün İsmi"} value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <input type="number" className="edit-input" placeholder={"Fiyat"} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                                <input type="text" className="edit-input" placeholder={"Açıklama"} value={description} onChange={(e) => setDescription(e.target.value)} />
                                <CategoryDropdown initialValue={product.categoryId} onSelected={(value) => setSelectedCategory(value)} />
                            </div>
                            <div className="modal-footer">
                                <button id='cancel-button' onClick={handleCancel}> İptal </button>
                                <button id='update-button' onClick={handleUpdate}> Güncelle </button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div >);
    }
}

export default ProductCardForStore;
