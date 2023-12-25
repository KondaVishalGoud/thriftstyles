import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import './Footer.css'

import categories from './CategoriesList';
// ... other imports

import { useLocation } from "react-router-dom";

function Categories(props) {
    const location = useLocation();
    const currentLocation = location.pathname;

    const navigate = useNavigate();

    return (
        <div className='cat-container '>
            <div>
                <span className='pr-3'></span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        const isActive = currentLocation === `/category/${item}`;
                        return (
                            <span
                                onClick={() => navigate(`/category/${item}`)}
                                key={index}
                                className={`category ${isActive ? 'active' : ''}`}
                            >
                                {item}
                            </span>
                        )
                    })}
            </div>
        </div>
    )
}
export default Categories;
// ... rest of the code
