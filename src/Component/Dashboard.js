import React, { Component } from 'react';
import Images from './Images';
import { Link } from 'react-router-dom';
import ImageConversion from './utils/ImageConversion';
import axios from 'axios';
import cookie from './utils/cookie';
import { Redirect } from 'react-router-dom';
import profileImg from "./ProImage/profile.png";
import { getProfileImage } from "./Url/User";;

class Dashboard extends Component {
    state = {
        img: profileImg
    }

    componentWillMount() {
        document.title = 'Dashboard';
    }

    componentDidMount() {
        //////////////getProfileImage
        axios.get(getProfileImage, {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        })
            .then(newres => {
                try {
                    // console.log(newres);
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageBuffer = newres.data.image.data.data;
                    let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                    let convertImageFlag = base64Flag + imageString;
                    this.setState({ img: convertImageFlag });
                } catch (ex) {
                    // console.log(ex);
                    
                }

            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 400 || err.response.status === 401) {
                        console.log(err.response.data);
                        alert(err.response.data.message);
                    }
                    else if (err.response.status === 404) {
                        alert("Not found");
                    }
                    else if (err.response.status === 500) {
                        alert(err.response.data.message);
                    }
                }
                else if (err.request) {
                    console.log(err.request);
                    alert("Error Connecting");
                }
                else {
                    console.log("Error", err.message);
                    alert(err.message);
                }
            });
    }



    handleButton = e => {
        e.preventDefault();
        this.props.history.push("/profile");

    }

    handleeditButton = e => {
        e.preventDefault();
        this.props.history.push("/updatepage");
    }

    handleQRCode = e => {
        this.props.history.push("/qrpage");
    }

    handlelogout = e => {
        cookie.setCookie("x-auth-token", "", -1);
        cookie.setCookie("username", "", -1);
    }




    render() {
        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }

        return (
            <div className="container">

                <div className="row justify-content-md-center" >
                    <div className="col-md-3"  >
                        <Images />
                    </div>
                </div>

                <div className="row justify-content-md-center" >
                    <div className="col-md-0 col-md-offset-6" >
                        <img src={this.state.img} className="rounded-circle" alt="profileImage" width="100" height="100" />
                    </div>
                </div>
                <br />
                <div className="row justify-content-md-center" >
                    <div className="col-md-0 col-md-offset-6"  >
                        <h1 style={{ color: "#33bfaa" }}> Welcome</h1>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-sm-3" >
                        <button className="btn btn-primary" onClick={this.handleQRCode} type="button" id="dropdownMenuButton" style={{ "size": "20px", border: "none", width: "100%" }} >QR Code</button>
                    </div>
                    <div className="col-sm-3" >
                        <button onClick={this.handleButton} className="btn btn-info" type="button" id="dropdownMenuButton" style={{ "size": "20px", border: "none", width: "100%" }} >Your Profile</button>
                    </div>
                    <div className="col-sm-3" >
                        <button className="btn btn-primary " onClick={this.handleeditButton} type="button" id="dropdownMenuButton" style={{ "size": "20px", border: "none", width: "100%" }} >Edit Profile</button>
                    </div>
                    <div className="col-sm-3">
                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" style={{ "size": "20px", border: "none", width: "100%" }} >Settings</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="/changepass">Change Password</Link>
                                <Link className="dropdown-item" to="/logpage">Profile Log</Link>
                                <Link className="dropdown-item" onClick={this.handlelogout} to="/login">log out</Link>
                            </div>
                        </div>
                    </div>




                </div>
                <br /><br />
                
                <h2 style={{ textAlign: "center", color: "#33bfaa" }}>.....</h2>
                <h2 style={{ textAlign: "center", color: "#33bfaa" }}>..</h2>

            </div>
        );
    }
}

export default Dashboard;