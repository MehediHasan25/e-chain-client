import React, { Component } from 'react';
import cookie from "./utils/cookie";
import ImageConversion from './utils/ImageConversion';
import axios from 'axios';
import { getUserInfo, getProfileImage } from "./Url/User";
import "./css/table.css";

class UserProfile extends Component {
    state = {
        username: '',
        mobile: '',
        email: '',
        regDate: '',
        userImage: ''
    }

    componentDidMount() {
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
        ////////// User Info////////////
        axios.get(getUserInfo, config)
            .then(res => {
                let data = res.data;
                this.setState({
                    username: data.username,
                    mobile: data.mobile,
                    email: data.email,
                    regDate: data.regDate
                });

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

        ///////////////////////////////////////////////////////////
        // try {
        //     let r = await axios.post('/get-all', { id: 1 });
        //     console.log(r.data);
        //     console.log(r.status);
        //     alert(r.data.message);
        // }
        // catch (ex) {

        //     if (ex.response) {
        //         // The request was made and the server responded with a status code
        //         // that falls out of the range of 2xx
        //         if (ex.response.status === 400 || ex.response.status === 401) {
        //             console.log(ex.response.data);
        //             alert(ex.response.data.message)
        //         }
        //         else if (ex.response.status === 404) {
        //             alert("Not found");
        //         }
        //         else if (ex.response.status === 500) {
        //             alert(ex.response.data.message)
        //         }
        //     }
        //     else if (ex.request) {
        //         // The request was made but no response was received
        //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //         // http.ClientRequest in node.js
        //         console.log(ex.request);
        //         alert("Error connecting");
        //     }
        //     else {
        //         // Something happened in setting up the request that triggered an Error
        //         console.log('Error', ex.message);
        //         alert(ex.message);

        //     }

        // }
        //////////////////////////////////////////////////////////


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
                    this.setState({ userImage: convertImageFlag });
                } catch (ex) {
                    console.log(ex);
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


    render() {
        const divStyle = {

            textAlign: 'center',
            // margin: '5px',
            border: '1px solid #DDDDDD'
        };
        return (
            <div className="container">


                <h3 style={{ color: "#33bfaa" }}>User Information</h3>
                <div className="row">
                    <div className="col-sm-8">
                        <table>
                            <thead>
                                <tr>

                                    <th scope="col">Title</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>User Id</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>Mobile</td>
                                    <td>{this.state.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td>Registration Date</td>
                                    <td>{this.state.regDate}</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                    <div className="col-sm-4" style={divStyle} >
                        <img src={this.state.userImage} className="rounded" alt="User" id="UserImage" height="200px" width="250px" />
                    </div>

                </div>

            </div>

        );
    }
}

export default UserProfile;