import React, { Component } from 'react';
import ImageConversion from '../utils/ImageConversion';
import '../css/Welcome.css';
import axios from 'axios';
import cookie from '../utils/cookie';
import {getProfileImage,uploadProfileImage,updateProfileImage} from "../Url/User";

class UpdateProfilePic extends Component {
    state = {
        profileImage: null,
        img: "",
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




    componentDidMount() {
        ////////////getProfileImage
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
                    this.setState({ img: convertImageFlag, flagImage: true });
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
                        alert("Not Found");
                    }
                    else if (err.response.status === 500) {
                        alert(err.response.data.message);
                    }
                }
                else if(err.request){
                    console.log(err.request);
                    alert("Error Connectiong");
                }
                else{
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
        try {
            fd.append('profileImage', this.state.profileImage, this.state.profileImage.name);
            const config = {
                headers: {
                    "x-auth-token": cookie.getCookie("x-auth-token")
                }
            }

            if (this.state.flagImage !== true) {
           /////////////////////////////uploadProfileImage
                axios.post(uploadProfileImage, fd, config)
                    .then(res => {
                        console.log(res);
                        //console.log(res.data._id);
                        if (res.data.id !== null) {
                            ///////////////getProfileImage
                            axios.get(getProfileImage, config)
                                .then(newres => {
                                    try {
                                        let base64Flag = 'data:image/jpeg;base64,';
                                        let imageBuffer = newres.data.image.data.data;
                                        let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                                        let convertImageFlag = base64Flag + imageString;
                                        this.setState({ img: convertImageFlag, flagImage: true });
                                    } catch (ex) {
                                        console.log(ex);
                                    }

                                })
                                .catch(err => console.log(err));
                        }


                    })
                    .catch(error => alert(error.response.data.message));

            } else {

 //////////////////////////////////////updateProfileImage
                axios.put(updateProfileImage, fd, config)
                    .then(res => {
                        console.log(res);
                        //console.log(res.data._id);
                        if (res.data.id !== null) {
                            /////////////////getProfileImage
                            axios.get(getProfileImage, config)
                                .then(newres => {
                                    try {
                                        let base64Flag = 'data:image/jpeg;base64,';
                                        let imageBuffer = newres.data.image.data.data;
                                        let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                                        let convertImageFlag = base64Flag + imageString;
                                        this.setState({ img: convertImageFlag });
                                    } catch (ex) {
                                        console.log(ex);
                                    }

                                })
                                .catch(err => console.log(err));
                        }


                    })
                    .catch(error => alert(error.response.data.message));

            }


        } catch (ex) {
            alert("no file choosen");
        }

        //console.log(this.state.profileImage);











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

export default UpdateProfilePic;