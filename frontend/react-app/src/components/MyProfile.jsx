import { useEffect, useState } from "react";
import Header from "./Header";

import Footer from "./Footer";
import axios from "axios";
import API_URL from "../constants";

function MyProfile() {

    const [user, setuser] = useState({})

    useEffect(() => {
        let url = API_URL + '/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                console.log(res.data)
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    return (
        <div className="text-center">
          <Header />
          <div className="m-3 p-3 d-flex justify-content-center">
            <div>
              <h3 className="mt-2"> PROFILE </h3>
              <table className="table table-bordered" >
                <tbody>
                  <tr>
                    <td>USERNAME:</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>EMAIL ID:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>MOBILE:</td>
                    <td>{user.mobile}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
      


export default MyProfile;