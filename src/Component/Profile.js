import React, { Component } from 'react';
import Images from './Images';
import Navbar from './Navbar';
import UserProfile from "./UserProfile";
import NidProfiles from "./NidProfiles";
import TinProfiles from "./TinProfiles";
import cookie from "./utils/cookie";
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    state = {}

    componentWillMount() {
        document.title = 'Profile';
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
                <UserProfile />
                <br />
                <hr style={{ color: "black" }} />
                <br />
                <NidProfiles />

                <br />
                <hr style={{ color: "black" }} />
                <br />

                <TinProfiles />

            </div>
        );
    }
}

export default Profile;