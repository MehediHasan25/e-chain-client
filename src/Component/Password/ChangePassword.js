import React, { Component } from 'react';
import cookie from "../utils/cookie";
import Images from "../Images";
import Navbar from "../Navbar";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { changePassword } from "../Url/User";

class ChangePassword extends Component {
    state = {
        oldPassword: '',
        oldPasswordValidation: false,
        newPassword: '',
        newPasswordValidation: false,
        confirmPassword: '',
        confirmPasswordValidation: false
    }

    componentWillMount() {
        document.title = 'Change Password';
    }

    onSubmit = e => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = this.state;

        if (oldPassword === '') {
            this.getoldPasswordError = "**old password is empty";
            this.setState({ oldPasswordValidation: true });
            return;
        } else if (oldPassword.length < 8) {
            this.getoldPasswordError = "**old password must be 8 characters";
            this.setState({ oldPasswordValidation: true });
            return;
        }

        const username = cookie.getCookie("username");
        

        if (newPassword === '') {
            this.getnewPasswordError = "**new password field is empty";
            this.setState({ newPasswordValidation: true });
            return;
        } else if (newPassword.length < 8) {
            this.getnewPasswordError = "**new password must be 8 characters";
            this.setState({ newPasswordValidation: true });
            return;
        } else if (oldPassword === newPassword) {
            this.getnewPasswordError = "** old password and new password are same";
            this.setState({ newPasswordValidation: true });
            return;
        }else if(newPassword === username){
            this.getnewPasswordError = "** new password and userid are same";
            this.setState({ newPasswordValidation: true });
            return;  
        }






        if (confirmPassword === '') {
            this.getConfirmPasswordError = "**confirm password is empty";
            this.setState({ confirmPasswordValidation: true });
            return;

        } else if (confirmPassword.length < 8) {
            this.getConfirmPasswordError = "**confirm password less than 8 characters";
            this.setState({ confirmPasswordValidation: true });
            return;

        } else if (newPassword !== confirmPassword) {
            this.getConfirmPasswordError = "**confirm password not match!!!";
            this.setState({ confirmPasswordValidation: true });
            return;
        }

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        const obj = {
            oldPassword,
            newPassword
        }
       // console.log(obj);
        ///////////////////////changePassword
        axios.post(changePassword, obj, config)
            .then(res => {
              //  console.log(res);
                alert('successfully changed password');
                cookie.setCookie("x-auth-token", null, -1);
                this.props.history.push("/login");
            }).catch(err => {
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

    onChangeOldPassword = e => {
        this.setState({ oldPassword: e.target.value, oldPasswordValidation: false });
    }
    onChangeNewPassword = e => {
        this.setState({ newPassword: e.target.value, newPasswordValidation: false });
    }
    onChangeConfirmPassword = e => {
        this.setState({ confirmPassword: e.target.value, confirmPasswordValidation: false });
    }

    // handleConfirmPasswordClick = e => {
    //     this.setState({ confirmPasswordValidation: false });
    // }

    // handleOldPasswordClick = e => {
    //     this.setState({ oldPasswordValidation: false });
    // }

    // handleNewPasswordClick = e => {
    //     this.setState({ newPasswordValidation: false });
    // }


    render() {
        const { oldPassword, newPassword, confirmPassword } = this.state;

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

                <div style={{ marginLeft: "auto", marginRight: "auto" }} className="col-sm-6 border border-light p-5">

                    <form onSubmit={this.onSubmit}>

                        <p className="h4 mb-4 text-center" style={{ color: "#00cccc" }}>Change Password</p>
                        <br />
                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.oldPasswordValidation === true ? this.getoldPasswordError : ""}</i>
                        <input label="Old Password" name="oldPassword" type="password" placeholder=" Old password " value={oldPassword} onChange={this.onChangeOldPassword} id="defaultOldPassword" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleOldPasswordClick}></input>
                        <br />
                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.newPasswordValidation === true ? this.getnewPasswordError : ""}</i>
                        <input label="New Password" name="newPassword" type="password" placeholder=" New Password " value={newPassword} onChange={this.onChangeNewPassword} id="defaultNewPassword" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleNewPasswordClick}></input>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.confirmPasswordValidation === true ? this.getConfirmPasswordError : ""}</i>
                        <input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={this.onChangeConfirmPassword} id="defaultConfirmPassword" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleConfirmPasswordClick}></input>

                        <button className="btn btn-info btn-block my-4" type="submit" style={{ backgroundColor: "#00cccc" }}>Submit</button>


                    </form>
                </div>
            </div>
        );
    }
}

export default ChangePassword;