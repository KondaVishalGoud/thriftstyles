import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../constants";
import './Header.css';
import './Footer.css'
function ProductDetail() {

    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    console.log(user, "userrrrr")
    const p = useParams()

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    const handleContact = (addedBy) => {
        console.log('id', addedBy)
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }


    return (<>
        <Header />
        {/* PRODUCT DETAILS : */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'40px' }}>
    {product && (
        <div className="d-flex flex-row align-items-center">
            <div style={{ alignItems: 'center',padding:'30px', marginBottom: '10px' }}>
                <img width="350px" height="350px" src={API_URL + '/' + product.pimage} alt="" />
            </div>
            <div style={{ alignItems: 'center', marginBottom: '10px' }}>
                {product.pimage2 && (
                    <img width="350px" height="350px" src={API_URL + '/' + product.pimage2} alt="" />
                )}
            </div>
            <div className="d-flex flex-column align-items-center"style={{ alignItems: 'center' }}>
                <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                <p className="m-2"> {product.pname} | {product.category} </p>
                <p className="m-2 text-success"> {product.pdesc} </p>

                {product.addedBy && (
                    <button className="chk-btn" onClick={() => handleContact(product.addedBy)}>
                        CONTACT
                    </button>
                )}

                {user && user.username && <h4>{user.username}</h4>}
                {user && user.mobile && <h3>{user.mobile}</h3>}
                {user && user.email && <h6>{user.email}</h6>}
            </div>
            
        </div>
    )}
    
</div>



    </>

    )
}

export default ProductDetail;