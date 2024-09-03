import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Category } from '../types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../styles/CategoryDropdown.css"

interface CategoryDropdownProps {
    initialValue?: number;
    onSelected: (value: number) => void; // Yeni prop
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ initialValue, onSelected }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
        console.log("kategoiler setlendi", categories);
        if (categories.length > 0) {
            setSelectedCategory(initialValue === undefined ? categories[0].categoryId : initialValue);
        }
    }, [categories]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSelect = (categoryId: number) => {
        setSelectedCategory(categoryId);
        onSelected(categoryId); // Yeni seçilen kategori dışarıya bildirilir
        toggleDropdown();
    }

    return (
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
    )
}

export default CategoryDropdown;
