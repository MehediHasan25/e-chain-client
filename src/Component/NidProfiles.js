import React, { Component } from 'react';
import "./css/table.css";
import cookie from "./utils/cookie";
import {getNid} from "./Url/Nid";
import ImageConversion from './utils/ImageConversion';
import axios from 'axios';
import "./css/table.css";

class NidProfiles extends Component {
    state = {
        name: " ",
        fatherName: "",
        motherName: "",
        pob: "",
        dob: "",
        nidNo: "",
        bloodGroup: "",
        issueDate: "",
        address: "",
        nidImage: "",
        oldNidImage:""
       

    }


    componentDidMount() {
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
        //GETNID
        axios.get(getNid, config)
            .then(res => {
           //     console.log(res);
                let base64Flag = 'data:image/jpeg;base64,';
                let imageBuffer = res.data.nidImage.data.data;
                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                let convertImageFlag = base64Flag + imageString;
                this.setState({
                    name: res.data.nidData.name,
                    fatherName: res.data.nidData.fatherName,
                    motherName: res.data.nidData.motherName,
                    pob: res.data.nidData.pob,
                    dob: res.data.nidData.dob,
                    nidNo: res.data.nidData.nidNo,
                    bloodGroup: res.data.nidData.bloodGroup,
                    issueDate: res.data.nidData.issueDate,
                    address: res.data.nidData.address,
                    nidImage: convertImageFlag,
                    oldNidImage: convertImageFlag
                   

                });


            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        console.log(error.response.data);
                       // alert(error.response.data.message);
                    }
                    else if (error.response.status === 404) {
                        console.log("Error 404: not found");
                        //alert("Not found");
                    }
                    else if (error.response.status === 500) {
                        console.log("Internal Server Error");
                    }
                }
                else if (error.request) {
                    console.log(error.request);
                   // alert("Error Connecting");
                }
                else {
                    console.log("Error", error.message);
                    //alert(error.message);
                }
            });

    }
   

    render() {

        const divStyle = {

            textAlign: 'center',
            // margin: '5px',
            border: '1px solid #DDDDDD'
        };

        return (
            <div className="container">
               

                <h3 style={{color: "#33bfaa"}}>NID Information</h3>
                <div className="row">
                    <div className="col-sm-8">
                        <table>
                        <thead>
                                <tr>

                                    <th scope="col">Title</th>
                                    <th scope="col">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td>Father Name</td>
                                    <td>{this.state.fatherName}</td>
                                </tr>
                                <tr>
                                    <td>Mother Name</td>
                                    <td>{this.state.motherName}</td>
                                </tr>
                                <tr>
                                    <td>Place of Birth</td>
                                    <td>{this.state.pob}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{this.state.dob}</td>
                                </tr>
                                <tr>
                                    <td>NID No</td>
                                    <td>{this.state.nidNo}</td>
                                </tr>
                                <tr>
                                    <td>Blood Group</td>
                                    <td>{this.state.bloodGroup}</td>
                                </tr>
                                <tr>
                                    <td>Issue Date</td>
                                    <td>{this.state.issueDate}</td>
                                </tr>

                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
                                </tr>
                                </tbody>
                        </table>

                    </div>
                    <div className="col-sm-4" style={divStyle} >
                        <img src={this.state.oldNidImage} className="rounded" alt="NID" id="nidImage" height="200px" width="250px" />
                    </div>

                </div>

            </div>



        );
    }
}

export default NidProfiles;