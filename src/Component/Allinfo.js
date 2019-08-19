import React, { Component } from 'react';
import Images from './Images';
import Nidform from './Nidform';
import TinForm from './TinForm';
import Navbar from './Navbar';
import Welcome from './Welcome';
import cookie from "./utils/cookie";
import { Redirect } from 'react-router-dom';


class Allinfo extends Component {
    state = {}

    componentWillMount() {
        document.title = 'Information';
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
                <Welcome />
                <br />




                <div className="card border-light mb-3 col-sm-8 " style={{
                    marginLeft:"auto",
                    marginRight:"auto"
                }} >
                    <div className="card-header"
                        style={{ textAlign: "center", backgroundColor: "#33bfaa", color: "#ffffff", height:"40px" }}>
                        <h6>Provide your related informations below</h6>
                    </div>
                    <div className="card-body">

                        <Nidform />
                        
                        <TinForm />
                    </div>
                </div>









            </div>
        );
    }
}

export default Allinfo;