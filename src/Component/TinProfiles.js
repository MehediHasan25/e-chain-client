import React, { Component } from 'react';
import cookie from "./utils/cookie";
import ImageConversion from './utils/ImageConversion';
import axios from 'axios';
import {getTin} from "./Url/Tin";
import "./css/table.css";

class TinProfiles extends Component {
    state = { 
        tin: '',
        taxesCircle: '',
        taxesZone : '',
        name: '',
        fatherName: '',
        motherName: '',
        currentAddress: '',
        permanentAddress: '',
        previousTin: '',
        status: '',
        date: '',
        tinImage: '',
        oldTinImage: ''
     }

     componentDidMount(){
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
///////////////getTin////////////
        axios.get(getTin, config)
        .then(res => {
    //      console.log(res);
            let base64Flag = 'data:image/jpeg;base64,';
            let imageBuffer = res.data.tinImage.data.data;
            let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
            let convertImageFlag = base64Flag + imageString;
            this.setState({
                tin:res.data.tinData.tin.tin,
                taxesCircle:res.data.tinData.tin.taxesCircle,
                taxesZone:res.data.tinData.tin.taxesZone,
                name:res.data.tinData.tin.name,
                fatherName:res.data.tinData.tin.fatherName,
                motherName:res.data.tinData.tin.motherName,
                currentAddress:res.data.tinData.tin.currentAddress,
                permanentAddress:res.data.tinData.tin.permanentAddress,
                previousTin:res.data.tinData.tin.previousTin,
                status:res.data.tinData.tin.status,
                date:res.data.tinData.tin.date,
                tinImage: convertImageFlag,
                oldTinImage: convertImageFlag

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
                    //alert(error.response.data.message);
                }
            }
            else if (error.request) {
                console.log(error.request);
                console.log("Error Connecting");
               // alert("Error Connecting");
            }
            else {
              //  console.log("Error", error.message);
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
           

            <h3 style={{color: "#33bfaa"}}>TIN Information</h3>
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
                                <td>TIN</td>
                                <td>{this.state.tin}</td>
                            </tr>
                            <tr>
                                <td>Taxes Circle</td>
                                <td>{this.state.taxesCircle}</td>
                            </tr>
                            <tr>
                                <td>Taxes Zone</td>
                                <td>{this.state.taxesZone}</td>
                            </tr>
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
                                <td>Current Address</td>
                                <td>{this.state.currentAddress}</td>
                            </tr>
                            <tr>
                                <td>Permanent Address</td>
                                <td>{this.state.permanentAddress}</td>
                            </tr>
                            <tr>
                                <td>Previous TIN</td>
                                <td>{this.state.previousTin}</td>
                            </tr>

                            <tr>
                                <td>Status</td>
                                <td>{this.state.status}</td>
                            </tr>

                            <tr>
                                <td>Date</td>
                                <td>{this.state.date}</td>
                            </tr>

                           
                            </tbody>
                    </table>

                </div>
                <div className="col-sm-4" style={divStyle} >
                    <img src={this.state.oldTinImage} className="rounded" alt="TIN" id="TinImage" height="200px" width="250px" />
                </div>

            </div>

        </div>
         );
    }
}
 
export default TinProfiles;