import { useEffect, useState } from "react";
import Header from "./Header";

import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";


function MyProducts() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

   
    return (
        <div>
          <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
          <Categories handleCategory={handleCategory} />
    
          <div className="d-flex justify-content-center flex-wrap">
            {cproducts && products.length > 0 &&
              cproducts.map((item, index) => {
                return (
                  <div key={item._id} className="card m-3 ">
                   
                    <img width="350px" height="350px" src={API_URL + '/' + item.pimage} />
                    <p className="m-2"> {item.pname}  | {item.category} </p>
                    <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                   
                  </div>
                );
              })}
          </div>
    
          <h5> ALL RESULTS  </h5>
    
          <div className="d-flex justify-content-center flex-wrap">
            {products && products.length > 0 &&
              products.map((item, index) => {
                return (
                  <div key={item._id} className="card m-3 ">
                   
                    <img width="250px" height="250px" src={API_URL + '/' + item.pimage} />
                    <p className="m-2"> {item.pname}  | {item.category} </p>
                    <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                   
                  </div>
                );
              })}
          </div>
          <Footer />
        </div>
      );
    }
    
    export default MyProducts;