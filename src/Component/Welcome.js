import React, { Component } from 'react';
import ImageConversion from './utils/ImageConversion';
import './css/Welcome.css';
import axios from 'axios';
import cookie from './utils/cookie';
import {getProfileImage, uploadProfileImage, updateProfileImage} from "./Url/User";
import profile from './ProImage/profile.png';

class Welcome extends Component {
    state = {
        profileImage: null,
        img: profile,
        flagImage: false
    }
   
    fileSelectedHandler = event => {
        try {
            this.setState({
                profileImage: event.target.files[0]
                });
        } catch (ex) {
            console.log(ex);
        }
        
    }

    


    componentDidMount(){
        axios.get(getProfileImage , {headers:{ 
            "x-auth-token": cookie.getCookie("x-auth-token")
        }})
                        .then(newres => {
                            try {
                               // console.log(newres);
                                let base64Flag = 'data:image/jpeg;base64,';
                                let imageBuffer = newres.data.image.data.data;
                                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                                let convertImageFlag = base64Flag + imageString;
                                this.setState({ img : convertImageFlag, flagImage: true });
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

    // componentDidUpdate(){
    //     axios.get(`http://localhost:4000/user/get-profile-image`, {headers:{ 
    //         "x-auth-token": cookie.getCookie("x-auth-token")
    //     }})
    //                     .then(newres => {
    //                         try {
    //                             console.log(newres);
    //                             let base64Flag = 'data:image/jpeg;base64,';
    //                             let imageBuffer = newres.data.image.data.data;
    //                             let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
    //                             let convertImageFlag = base64Flag + imageString;
    //                             this.setState({ img : convertImageFlag });
    //                         } catch (ex) {
    //                             console.log(ex);
    //                         }

    //                     })
    //                     .catch(err => console.log(err));

    // }
   


    fileUploadHandler = async () => {
        
        const fd = new FormData();
        fd.append('profileImage', this.state.profileImage, this.state.profileImage.name);
        console.log(this.state.profileImage);
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        if(this.state.flagImage !== true){
        
            axios.post(uploadProfileImage, fd, config)
            .then(res => {
                console.log(res);
                //console.log(res.data._id);
                if (res.data.id !== null) {
                    axios.get(getProfileImage, config)
                        .then(newres => {

                            try {
                                let base64Flag = 'data:image/jpeg;base64,';
                                let imageBuffer = newres.data.image.data.data;
                                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                                let convertImageFlag = base64Flag + imageString;
                                this.setState({ img : convertImageFlag , flagImage:true });
                            } catch (ex) {
                                if (ex.response) {
                                    if (ex.response.status === 400 || ex.response.status === 401) {
                                        console.log(ex.response.data);
                                        alert(ex.response.data.message);
                                    }
                                    else if (ex.response.status === 404) {
                                        alert("Not found");
                                    }
                                    else if (ex.response.status === 500) {
                                        alert(ex.response.data.message);
                                    }
                                }
                                else if (ex.request) {
                                    console.log(ex.request);
                                    alert("Error Connecting");
                                }
                                else {
                                    console.log("Error", ex.message);
                                    alert(ex.message);
                                }
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


            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        console.log(error.response.data);
                        alert(error.response.data.message);
                    }
                    else if (error.response.status === 404) {
                        alert("Not found");
                    }
                    else if (error.response.status === 500) {
                        alert(error.response.data.message);
                    }
                }
                else if (error.request) {
                    console.log(error.request);
                    alert("Error Connecting");
                }
                else {
                    console.log("Error", error.message);
                    alert(error.message);
                }
            });
       
        } else{


            axios.put(updateProfileImage, fd, config)
            .then(res => {
                console.log(res);
                //console.log(res.data._id);
                if (res.data.id !== null) {
                    axios.get(getProfileImage, config)
                        .then(newres => {
                            try {
                                let base64Flag = 'data:image/jpeg;base64,';
                                let imageBuffer = newres.data.image.data.data;
                                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                                let convertImageFlag = base64Flag + imageString;
                                this.setState({ img : convertImageFlag });
                            } catch (ex) {
                                if (ex.response) {
                                    if (ex.response.status === 400 || ex.response.status === 401) {
                                        console.log(ex.response.data);
                                        alert(ex.response.data.message);
                                    }
                                    else if (ex.response.status === 404) {
                                        alert("Not found");
                                    }
                                    else if (ex.response.status === 500) {
                                        alert(ex.response.data.message);
                                    }
                                }
                                else if (ex.request) {
                                    console.log(ex.request);
                                    alert("Error Connecting");
                                }
                                else {
                                    console.log("Error", ex.message);
                                    alert(ex.message);
                                }
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


            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        console.log(error.response.data);
                        alert(error.response.data.message);
                    }
                    else if (error.response.status === 404) {
                        alert("Not found");
                    }
                    else if (error.response.status === 500) {
                        alert(error.response.data.message);
                    }
                }
                else if (error.request) {
                    console.log(error.request);
                    alert("Error Connecting");
                }
                else {
                    console.log("Error", error.message);
                    alert(error.message);
                }
            });

        }



        

        





        // this.setState = {
        //     profileImage: null
        // }
        //this.props.history.push('/about');

    }

    render() {
        // const { strImage } = this.state;
        // console.log(strImage);
        return (
            <div className="container">

                <div className="d-flex flex-column" >
                    <div className="d-flex justify-content-center" >
                        <h1><i className="fab fa-weebly" style={{ color: "#33bfaa", fontSize: "50px" }}></i>elcome&nbsp;<i className="fas fa-exclamation" style={{ color: "#33bfaa", fontSize: "30px" }} ></i></h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src={this.state.img}
                            style={{ maxWidth: "15%", cursor: "pointer" }}
                            className="rounded-circle img-fluid img-thumbnail" id="profilePicture" alt="profilePicture" />

                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="card border-primary mb-3">
                            <div className="card-body d-flex justify-content-between">
                                <div className="">
                                    <input type="file" onChange={this.fileSelectedHandler.bind(this)} className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
                                </div>
                                <div className="">
                                    <button type="button" onClick={this.fileUploadHandler} style={{ backgroundColor: "#33bfaa" }} className="btn btn-primary">Upload</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        );
    }
}

export default Welcome;