import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from "./utils/cookie";

class Navbar extends Component {
    state = {}

    handlelogout = e => {
        cookie.setCookie("x-auth-token", "", -1);
        cookie.setCookie("username", "", -1);
    }



    render() {
        return (
            <nav className="navbar navbar-expand-lg">



                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile" style={{ color: "#999", marginRight: "10px" }}><i className="far fa-id-badge">&nbsp;Profile</i> <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard" style={{ color: "#999", marginRight: "10px" }}>Dashboard</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="#" style={{ color: "#999", marginRight: "10px" }}>Settings</Link>
                    
                </li> */}
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" style={{ color: "#999", marginRight: "10px" }} role="button" aria-haspopup="true" aria-expanded="false" >Settings</Link>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/changepass">Change Password</Link>
                            <Link className="dropdown-item" to="/logpage">Profile log</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/qrpage" style={{ color: "#999", marginRight: "10px" }}>QR</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={this.handlelogout} to="/login" style={{ color: "#999" }}>Logout</Link>
                    </li>
                </ul>



            </nav>
        );
    }
}

export default Navbar;