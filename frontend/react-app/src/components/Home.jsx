import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Footer from "./Footer";
import Categories from "./Categories";
import './Home.css';
import API_URL from "../constants";


function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [searc, setsearch] = useState('');
  // const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [issearch, setissearch] = useState(false);
  const [cproducts, setcproducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-products`);
        if (response.data.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Server Error:', error);
        alert('Server Err.');
      }
    };
    fetchData();
  }, []);

  const handlesearch = (value) => {
        setSearch(value);
    }

  const handleClick = () => {
    // Check if search is empty
    if (!search.trim()) {
        // Display a toast error message
        toast.error('Enter an item to find.', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        return;
    }

    const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
    axios.get(url)
        .then((res) => {
            setcproducts(res.data.products);
            setissearch(true);
        })
        .catch((err) => {
            // Display a toast error message for server errors
            toast.error('Server Error. Please try again later.', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
        });
}

const handleCategory = (value) => {
  let filteredProducts = products.filter((item, index) => {
      if (item.category === value) {
          return item;
      }
  })
  setcproducts(filteredProducts)
}

  const handleLike = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      // Display toast message for login requirement
      toast.warning('Please Login/Signup first!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      return;
    }

    const url = `${API_URL}/like-product`;
    const data = { userId, productId };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          // Display toast message
          toast.success('Liked!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500});
        }
      })
      .catch((err) => {
        console.error('Server Err.', err);
        alert('Server Err.');
      });
  };

  
  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      // Display toast message for login requirement
      toast.warning('Please Login/Signup first!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      return;
    }

    const url = `${API_URL}/cart-product`;
    const data = { userId, productId };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          // Display toast message
          toast.success('Added to Cart!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500});
        }
      })
      .catch((err) => {
        console.error('Server Err.', err);
        alert('Server Err.');
      });
  };
  

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
        <Header search={searc} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts &&
                <h5> SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}
      {/* {isSearch && filteredProducts.length === 0 && <h5>No Results Found</h5>} */}
     
      <div className="d-flex justify-content-center flex-wrap">
        {isSearch ? filteredProducts : products.map((item) => (
          <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
            <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
              <FaHeart className="icons" />
            </div>
            <img width="350px" height="350px" src={`${API_URL}/${item.pimage}`} />
            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
            <p className="m-2">{item.pname} | {item.category}</p>
            <button style={{ width: '50px' }} onClick={(e) => handleAddToCart(item._id, e)} className="icons-con">
              <FaCartPlus size={20} className="icon" />
            </button>


          </div>
        ))}
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Home;
