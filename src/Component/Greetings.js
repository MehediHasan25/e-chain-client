import React, { Component } from 'react';
import cookie from "./utils/cookie";
import { Redirect } from 'react-router-dom';
import Images from './Images';

class Greetings extends Component {
    state = {}

    onSubmit = e => {
        e.preventDefault();
        this.props.history.push("./allinfo");
    }

    render() {
        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }
        return (
            <div className="container">
                <Images />
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }} className="col-sm-3">
                    <div className="text-center ">
                        <h2>E-KYC</h2>
                    </div>
                </div>
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }} className="col-sm-7 border border-light ">
                    <p className="text-center" style={{ textAlign: "justify", fontSize: "13px", color: "green" }}>
                        <i class="fas fa-check-circle"></i> Create own digital KYC one in lifetime.
                    </p>
                    <p className="text-center" style={{ textAlign: "justify", fontSize: "13px", color: "green" }}>
                        <i class="fas fa-check-circle"></i> Create own digital KYC one in lifetime.Save valuable time and cost.
                    </p>
                    <p className="text-center" style={{ textAlign: "justify", fontSize: "13px", color: "green" }}>
                        <i class="fas fa-check-circle"></i> Preserve KYC in secure peer to peer blockchain network. 
                    </p>
                    <p className="text-center" style={{ textAlign: "justify", fontSize: "13px", color: "green" }}>
                        <i class="fas fa-check-circle"></i> Use and share KYC information in digital form.
                    </p>



                    <button className="btn btn-info btn-block my-4" type="submit" onClick={this.onSubmit} style={{ backgroundColor: "#00cccc" }}>Create E-KYC</button>

                </div>






            </div>
        );
    }
}

export default Greetings;