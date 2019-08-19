import React, { Component } from 'react';
import Images from "../Images";
import Navbar from "../Navbar";
import NIDLog from "./nidLog";
import TINlog from "./tinLog";
import cookie from "../utils/cookie";
import { Redirect } from 'react-router-dom';



class logPage extends Component {
    state = {}

    componentWillMount() {
        document.title = 'Profile Log';
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

                <NIDLog />
                <br />
                <hr style={{ color: "black" }} />
                <br />

                <TINlog />
                <br />

            </div>
        );
    }
}

export default logPage;