import React, { Component } from 'react';
import cookie from "../utils/cookie";
import { Redirect } from 'react-router-dom';
import Images from "../Images";

var QRCode = require('qrcode.react');



class QRpage extends Component {
    state = {}

    componentWillMount() {
        document.title = 'QRCode';
    }


    handleClick = e => {
        this.props.history.push("/dashboard");
    }

    render() {
        const username = cookie.getCookie('username');
        //// Base 64 conversion (username)
        const base64String = Buffer.from(username).toString('base64');
        console.log(base64String);

        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }

        const boxStyle = {
            height: "300px",
            width: " 300px",
            border: "1px solid #33bfaa",
            margin: "auto"
        }

        return (
            <div className="container" >
                <div className="row justify-content-md-center">
                    <Images />
                </div>
                <h3 style={{ textAlign: "center", color: "#33bfaa" }}> Your QRCode</h3>
                <br />


                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <div className="row " style={boxStyle} >
                            <QRCode value={base64String} style={{ margin: "auto" }} size={200} />
                            {/* <QRCode value={username} style={{ margin: "auto" }} size={200} /> */}
                        </div>
                        <br />
                        <button className="btn btn-primary" onClick={this.handleClick} style={{ display: "inline-block", width: "100%" }}>Return to Dashboard</button>
                    </div>
                    <div className="col-sm-4"></div>
                </div>


            </div>
        );
    }
}

export default QRpage;