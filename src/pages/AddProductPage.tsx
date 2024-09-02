import React, { useEffect, useState } from 'react';
import "../styles/AddProductPage.css"
import { useUser } from '../contexts/UserContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { error } from 'console';
import { Category } from '../types';
import { useNavigate } from 'react-router-dom';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null | undefined>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    axios.get("http://localhost:5212/api/Category")
      .then(
        response => {
          setCategories(response.data);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    //kategori setlenmesi tamamlanınca selectedCategory setlenir.
    console.log("kategoiler setlend", categories);
    if (categories.length > 0) {
      setSelectedCategory(categories[0].categoryId);
    }
  }, [categories]);

  if (!(user && user.user && user.token)) {
    return <div>Loading...</div>;
  }

  const authAxios = axios.create({
    baseURL: "http://localhost:5212/api/Product/",
    headers: {
      Authorization: `Bearer ${user.token.accesToken}`,
      "Content-Type": 'multipart/form-data'
    }
  });

  const handleSave = () => {
    if (imageName == "") {
      alert("Ürün görseli seçiniz");
    } else {
      const productData = new FormData();
      productData.append('shopId', user.user.shopId);
      productData.append('productName', productName);
      productData.append('productDescription', description);
      if (selectedCategory) {
        productData.append('categoryId', selectedCategory.toString());
      }
      productData.append('price', price.toString());
      productData.append('imageName', imageName);
      if (file) {
        productData.append('imageFile', file);
      }

      authAxios.post("http://localhost:5212/api/Product", productData).then(
        response => {
          alert("ürün başarıyla eklendi");
          //ekran yenilenir, tüm alanlar boşaltılır
          navigate(0);
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
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleSelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    toggleDropdown();
  }

  const loadFile = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = x => {
        setFile(file);
        setImageName(file.name);
        setImageSrc(x.target?.result);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" onChange={(e) => { setProductName(e.target.value) }} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Product Category</label>
          <div className="dropdown">
            <div className="select" onClick={toggleDropdown}>
              {categories.find((category) => category.categoryId === selectedCategory)?.categoryName}
              <ArrowDropDownIcon />
            </div>
            <ul style={{ display: dropdownOpen ? "initial" : "none" }} className="dropdown_menu">
              {categories.length > 0 ? categories.map((categoryItem, index) => {
                return (
                  <li onClick={() => handleSelect(categoryItem.categoryId)}>
                    {categoryItem.categoryName}
                  </li>
                )
              }) : ""}
            </ul>
          </div>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" onChange={(e) => { setPrice(parseFloat(e.target.value)) }} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Product Description</label>
          <textarea rows={4} onChange={(e) => { setDescription(e.target.value) }} />
        </div>
      </div>
      <div className="form-row" id='upload-row'>
        <input type="file" id="uploader" accept="image/*" onChange={(e) => loadFile(e.target.files?.[0])} />
        <label htmlFor='uploader' id='uploadButton'>Upload Image</label>
        <a>{imageName == "" ? "Dosya seçilmedi" : imageName}</a>
      </div>
      <button className="submit-btn" onClick={() => handleSave()}>Add Product</button>
    </div >
  );
};

export default AddProductPage;
