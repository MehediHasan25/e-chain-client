import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { login } from "./Url/User";
import cookie from "./utils/cookie";

class Login extends Component {
    state = {
        username: "",
        usernameValidation: false,
        password: "",
        passwordValidation: false,
        errors: {}
    };

    componentWillMount() {
        document.title = 'Login';
    }

    setCookie(cname, cvalue, minutes) {
        var d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;


        if (username === '') {
            this.setState({ errors: { username: 'Please Enter Your Username' } });

            return;
        }

        if (password === '') {
            this.setState({ errors: { password: 'Please Enter your password' } });
        }
        const obj = {
            username,
            password
        }


        /////LoginApi called////////////////////
        axios.post(login, obj)
            .then(res => {
                // console.log(res);
                // console.log(res.headers['x-auth-token']);

                let token = res.headers['x-auth-token'];
                cookie.setCookie('x-auth-token', token, 120);
                cookie.setCookie('username', username, 120);
                if (res.data.userStatus === "new") {
                    this.props.history.replace('/greetings');
                } else {
                    this.props.history.replace('/dashboard');
                }
            })
            .catch(err => {
               
                if (err.response) {
                    if (err.response.status === 400 || err.response.status === 401) {
                        console.log(err.response.data);
                        alert(err.response.data.message);
                       //alert("Mehedi will occur error");
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

      


        // console.log(res.headers['x-auth-token']);
        // let token = res.headers['x-auth-token'];


        // let res = await axios.post(`http://localhost:4000/user/login`, obj);
        // console.log(res.headers['x-auth-token']);
        // let token = res.headers['x-auth-token'];
        //this.setCookie('x-auth-token', token, 120);
        // let gettoken = this.getCookie('x-auth-token');

        // var h = {
        //     'Content-Type': 'application/json',
        //     'x-auth-token': gettoken 
        // }

        // fetch(`http://localhost:4000/user/login`, {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(obj), // data can be `string` or {object}!
        //     headers:{
        //       'Content-Type': 'application/json'
        //     }
        //   })
        //   .then(async response => {
        //       if(response.status === 400) {
        //         let error = await response.json();
        //         alert(error.message);
        //        }else if(response.status === 401) {
        //         let error = await response.json();
        //          alert(error.message);

        //       }else{
        //           let token = response.headers['x-auth-token'];
        //           this.setCookie('x-auth-token', token, 120);
        //         this.props.history.replace('/login');
        //       }

        //     })
        //   .catch(error => console.error('Error:', error));

        //   let gettoken = this.getCookie('x-auth-token');

        // var h = {
        //     'Content-Type': 'application/json',
        //     'x-auth-token': gettoken 
        // }



        // let test = await axios.post(`http://localhost:4000/user/test`,null,{"headers":h});
        // console.log(test);

        // this.props.history.replace('/landingpage');
    }


    onChangeUserName = e => {
        this.setState({ username: e.target.value, usernameValidation: false });
    }
    onChangePassword = e => {
        this.setState({ password: e.target.value, passwordValidation: false });
    }

    // handleUsernameClick = e => {
    //     this.setState({usernameValidation: false});
    // }
    // handlePasswordClick = e => {
    //     this.setState({passwordValidation: false});
    // }

    render() {
        const { username, password, errors } = this.state;

        if (cookie.getCookie("x-auth-token") !== "" && cookie.getCookie("username") !== "") {
            return <Redirect to='/dashboard' />
        }


        return (
            <div className="container" >
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }} className="col-sm-6 border border-light p-5">

                    <form className="text-center " onSubmit={this.onSubmit}>

                        <p className="h4 mb-4" style={{ color: "#00cccc" }}>Login</p>

                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.usernameValidation === true ? this.getUsernameError : ""}</i>
                        <input label="Username" name="username" type="text" placeholder=" User Id" value={username} onChange={this.onChangeUserName} error={errors.username} id="defaultLoginFormusername" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handleUsernameClick}></input>
                        <i style={{ color: 'red', textAlign: "right" }}>{this.state.passwordValidation === true ? this.getPasswordError : ""}</i>
                        <input label="Password" name="password" type="password" placeholder="Password" value={password} onChange={this.onChangePassword} error={errors.password} id="defaultLoginFormpassword" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handlePasswordClick}></input>

                        <div className="d-flex align-items-center justify-content-between">
                            {/* <div>

                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"></input>
                                    <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                                </div>
                            </div> */}
                            {/* <div>

                                <a href="" style={{ color: "#00cccc" }}>Forgot password?</a>
                            </div> */}
                        </div>


                        <button className="btn btn-info btn-block my-4" type="submit" style={{ backgroundColor: "#00cccc" }}>Log In</button>


                        <p>Not a member?&nbsp;<Link to="/" style={{ color: "#00cccc" }}>SignUp</Link></p>







                    </form>
                </div>






            </div>
        );
    }
}

export default Login;