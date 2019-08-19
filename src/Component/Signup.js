import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from "./utils/cookie";
import { Redirect } from 'react-router-dom';
import { checkUsername, checkMobile, checkEmail, signUp } from "./Url/User";
import { spaceUsername } from "./utils/spaceDetection";
import axios from 'axios';

class Signup extends Component {
    state = {
        username: '',
        usernameValidation: false,
        password: '',
        passwordValidation: false,
        confirmpassword: '',
        confirmpasswordValidation: false,
        mobile: '',
        mobileValidation: false,
        email: '',
        emailValidation: false,
        errors: {},

    };

    setCookie(cname, cvalue, minutes) {
        var d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    componentWillMount() {
        document.title = 'Sign Up';
    }





    onSubmit = async (e) => {
        e.preventDefault();

        const { username, password, mobile, email, confirmpassword } = this.state;

        if (username === '') {
            this.getUsernameError = "**username is empty";
            this.setState({ usernameValidation: true });
            return;
        }

        if (spaceUsername(username) === true) {
            this.getUsernameError = "**There should be no space in UserId";
            this.setState({ usernameValidation: true });
            return;
        }

        if (username.length < 3 || username.length >= 30) {
            this.getUsernameError = "**Username must be greater than 3 and less than 30 characters"
            this.setState({ usernameValidation: true });
            return;
        }
        const objname = {
            username
        }
        //`http://localhost:4000/user/check-username`
        let uniquename = await axios.post(checkUsername, objname);
        //  console.log(uniquename.data.status);
        if (uniquename.data.status === true) {
            this.getUsernameError = "**duplicate userid";
            this.setState({ usernameValidation: true });
            return;
        }



        if (password === '') {
            this.getPasswordError = "**password is empty";
            this.setState({ passwordValidation: true });
            return;
        } else if (password.length < 8) {
            this.getPasswordError = "**password must be 8 characters";
            this.setState({ passwordValidation: true });
            return;
        }else if(password === username){
            this.getPasswordError = "**password is not allowed same as username";
            this.setState({ passwordValidation: true });
            return;
        }
        // else if (spacePassword(password) === true){
        //     this.getPasswordError = "**There should be no space in password";
        //     this.setState({ passwordValidation: true });
        //     return;
        // }



        if (confirmpassword === '') {
            this.getConfirmPasswordError = "**confirm password is empty";
            this.setState({ confirmpasswordValidation: true });
            return;

        } else if (confirmpassword.length < 8) {
            this.getConfirmPasswordError = "**confirm password less than 8 characters";
            this.setState({ confirmpasswordValidation: true });
            return;

        } else if (confirmpassword !== password) {
            this.getConfirmPasswordError = "**confirm password not match!!!";
            this.setState({ confirmpasswordValidation: true });
            return;
        }


        if (mobile === '') {
            this.getMobileError = "**mobile number field is empty";
            this.setState({ mobileValidation: true });
            return;
        } else if (mobile.length < 11) {
            this.getMobileError = "**mobile number is less  than 11 digits";
            this.setState({ mobileValidation: true });
            return;
        } else if (mobile.length > 11) {
            this.getMobileError = "**mobile number is greate than 11 digits";
            this.setState({ mobileValidation: true });
            return;
        }

        //  if (spaceMobile(mobile)=== false){
        //     this.getMobileError = "**Mobile number should be 11 characters & any digit from 0 to 9";
        //     this.setState({ mobileValidation: true });
        //     return;
        // }
        const objmobile = {
            mobile
        }

        // let uniquemobile = await axios.post(`http://localhost:4000/user/check-mobile`, objmobile);
        let uniquemobile = await axios.post(checkMobile, objmobile);
        // console.log(uniquemobile.data.status);
        if (uniquemobile.data.status === true) {
            this.getMobileError = "** Mobile Number already exist";
            this.setState({ mobileValidation: true });
            return;
        }

        if (email === "") {
            this.getEmailError = "**email field is empty";
            this.setState({ emailValidation: true });
            return;
        } else if (this.validateEmail(email) === false) {
            this.getEmailError = "**email is invalid";
            this.setState({ emailValidation: true });
            return;
        }

        const objemail = {
            email
        }

        // let uniqueEmail = await axios.post(`http://localhost:4000/user/check-email`, objemail);
        let uniqueEmail = await axios.post(checkEmail, objemail);
        // console.log(uniquemobile.data.status);
        if (uniqueEmail.data.status === true) {
            this.getEmailError = "** Email already exist";
            this.setState({ emailValidation: true });
            return;
        }

        //  console.log(this.validateEmail(email));

        const obj = {
            username,
            password,
            mobile,
            email
        };

        //let res = await axios.post(`http://localhost:4000/user/signup`, obj);
        try {
            let res = await axios.post(signUp, obj);
            //  console.log(res);
            //   console.log(res.status);
            let data = res.data.userId;
            cookie.setCookie('userId', data, 5);
            this.props.history.replace('/pin');

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


    }



    onChangeUserName = e => {
        this.setState({ username: e.target.value, usernameValidation: false });
    }
    onChangePassword = e => {
        this.setState({ password: e.target.value, passwordValidation: false });
    }
    onChangeConfirmPassword = e => {
        this.setState({ confirmpassword: e.target.value, confirmpasswordValidation: false });
    }
    onChangeMobile = e => {
        this.setState({ mobile: e.target.value, mobileValidation: false });
    }
    onChangeEmail = e => {
        this.setState({ email: e.target.value, emailValidation: false });
    }


    // handleUsernameClick = e => {
    //     this.setState({ usernameValidation: false });
    // }
    // handlePasswordClick = e => {
    //     this.setState({ passwordValidation: false });
    // }

    // handleConfirmPasswordClick = e => {
    //     this.setState({ confirmpasswordValidation: false });
    // }

    // handleMobileClick = e => {
    //     this.setState({ mobileValidation: false });
    // }

    // handleEmailClick = e => {
    //     this.setState({ emailValidation: false });
    // }


    render() {
        if (cookie.getCookie("x-auth-token") !== "" && cookie.getCookie("username") !== "") {
            return <Redirect to='/dashboard' />
        }else if (cookie.getCookie('userId') !== "") {
            return <Redirect to='/' />
        }
        const { username, password, mobile, email, confirmpassword, errors } = this.state;

        return (

            <div className="container">
                <div style={{ marginLeft: "auto", marginRight: "auto" }} className="col-sm-6 border border-light p-5">

                    <form className="text-center" onSubmit={this.onSubmit}>


                        <p className="h4 mb-4 text-center" style={{ color: "#00cccc" }}>Sign Up</p>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.usernameValidation === true ? this.getUsernameError : ""}</i>
                        <input label="Username" name="username" type="text" placeholder=" User Id" value={username} onChange={this.onChangeUserName} error={errors.username} id="defaultLoginFormusername" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleUsernameClick}></input>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.passwordValidation === true ? this.getPasswordError : ""}</i>
                        <input label="Password" name="password" type="password" placeholder="Password" value={password} onChange={this.onChangePassword} error={errors.password} id="defaultLoginFormpassword" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handlePasswordClick}></input>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.confirmpasswordValidation === true ? this.getConfirmPasswordError : ""}</i>
                        <input label="Confirm Password" name="confirmpassword" type="password" placeholder="confirm Password" value={confirmpassword} onChange={this.onChangeConfirmPassword} error={errors.confirmpassword} id="confirmpass" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleConfirmPasswordClick}></input>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.mobileValidation === true ? this.getMobileError : ""}</i>
                        <input label="Mobile Number" name="mobile" type="text" placeholder="Mobile Number" value={mobile} onChange={this.onChangeMobile} error={errors.mobile} id="defaultLoginFormmobile" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleMobileClick}></input>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.emailValidation === true ? this.getEmailError : ""}</i>
                        <input label="Email" name="email" type="text" placeholder="Email" value={email} onChange={this.onChangeEmail} error={errors.email} id="defaultLoginFormemail" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleEmailClick}></input>


                        <p style={{ fontSize: "13px", color: "#848e8e", fontStyle: "italic" }}>Signing up for a E-KYC account means you agree to the Privacy Policy and<br /> Terms of Service.</p>



                        <button className="btn btn-info btn-block my-4" type="submit" style={{ backgroundColor: "#00cccc" }}>Sign Up</button>


                        <p>Already Have an account?&nbsp;<Link to="/login" style={{ color: "#00cccc" }}>Login</Link></p>







                    </form>
                </div>

            </div>








            // <div className="container">
            //     <div>
            //         <br></br>

            //         <h1 style={{ textAlign: "center", color: "#989799" }} >Add Person</h1>
            //     </div>

            //     <br></br>

            //     <div Align="center">
            //         <form onSubmit={this.onSubmit}>

            //             <div className='col-md-5' >
            //                 <TextInputGroup
            //                     label="Name"
            //                     Align="left"
            //                     name="username"
            //                     type="text"
            //                     placeholder="Enter your username"
            //                     value={username}
            //                     onChange={this.onChangeUserName}
            //                     error={errors.username}
            //                 />


            //                 <TextInputGroup
            //                     label="Password"
            //                     name="password"
            //                     type="text"
            //                     placeholder="Password"
            //                     value={password}
            //                     onChange={this.onChangePassword}
            //                     error={errors.password}
            //                 />

            //                 <TextInputGroup
            //                     label="Mobile Number"
            //                     name="mobile"
            //                     type="text"
            //                     placeholder="Mobile Number"
            //                     value={mobile}
            //                     onChange={this.onChangeMobile}
            //                     error={errors.mobile}
            //                 />

            //                 <TextInputGroup
            //                     label="Email"
            //                     name="email"
            //                     type="text"
            //                     placeholder="Email Address"
            //                     value={email}
            //                     onChange={this.onChangeEmail}
            //                     error={errors.email}
            //                 />
            //             </div>


            //             {/* <input
            //                 type="submit"            
            //                 value="Add Person"
            //                 className="btn btn-primary"
            //             /> */}

            //             <div className="col-md-5" Align="right">
            //                 <button type="submit" className="btn btn-info btn-sm">SignUp</button>
            //             </div>
            //         </form>

            //     </div>

            // </div>

        );
    }
}

export default Signup;