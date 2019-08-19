import React, { Component } from 'react';
import Images from "../Images";
import Navbar from "../Navbar";
import { Link, Redirect } from 'react-router-dom';
import cookie from "../utils/cookie";
import NidImage from "./nidimagenew3.png"
import TinImage from "./tinimagenew2.png"
import UpdateImage from "./UpdateProfilePic";


class UpdatePage extends Component {
    state = {}

    componentWillMount() {
        document.title = 'Update Page';
    }

    render() {

        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }

        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-sm-between">
                    <div className="col-sm-4" >
                        <Images />
                    </div>

                    <div className="col-sm-6" >
                        <Navbar />
                    </div>
                </div>
                <br />

                <div>
                    <h3 style={{ textAlign: "center", color: "#33bfaa" }}> Update Profile Picture </h3>
                </div>
                <hr />
                <br />

                <UpdateImage />
                <br />



                <div>
                    <h3 style={{ textAlign: "center", color: "#33bfaa" }}> Update Information </h3>
                </div>
                <hr />
                <br />

                <div className="row justify-content-around">
                    <div className="col-4 ml-md-auto">
                        <div className="card" style={{ width: "20rem" }}>
                            <img className="card-img-top" src={NidImage} alt="" style={{ height: "200px" }} />

                            <div className="card-body">
                                <h5 className="card-title">Click image for Update NID Information</h5>

                                <Link to="/updatenid1" className="stretched-link">Update NID Information</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 ml-md-auto">
                        <div className="card" style={{ width: "20rem" }}>
                            <img className="card-img-top" src={TinImage} alt="" style={{ height: "200px" }} />

                            <div className="card-body">
                                <h5 className="card-title">Click image for Update TIN Information</h5>

                                <Link to="/updatetin" className="stretched-link">Update TIN Information</Link>
                            </div>
                        </div>
                    </div>

                </div>

                <br /> <br />
                <hr />
                <br /> <br />


                <div>
                    <h3 style={{ color: "#33bfaa" }}> Update Mobile Number </h3>
                </div>
                <hr />




            </div>
        );
    }
}

export default UpdatePage;
