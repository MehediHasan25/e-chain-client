import React, { Component } from 'react';
import cookie from "../utils/cookie";
import "../css/table.css";
import axios from 'axios';
import {getNidLog} from "../Url/Nid";


class nidLog extends Component {
    state = {
        name: [],
        fatherName: [],
        motherName: [],
        pob: [],
        dob: [],
        nidNo: [],
        bloodGroup: [],
        issueDate: [],
        address: [],
        time: []
    }

    getNidChangeMap(state) {
        let len = state.name.length;
        let changeMap = [];
        for (let i = 0; i < len; i++) changeMap[i] = [];
        for (let i = 1; i < len; i++) {
            if (state.name[i - 1] !== state.name[i]) changeMap[i].push("name");
            if (state.fatherName[i - 1] !== state.fatherName[i]) changeMap[i].push("fatherName");
            if (state.motherName[i - 1] !== state.motherName[i]) changeMap[i].push("motherName");
            if (state.pob[i - 1] !== state.pob[i]) changeMap[i].push("pob");
            if (state.dob[i - 1] !== state.dob[i]) changeMap[i].push("dob");
            if (state.nidNo[i - 1] !== state.nidNo[i]) changeMap[i].push("nidNo");
            if (state.bloodGroup[i - 1] !== state.bloodGroup[i]) changeMap[i].push("bloodGroup");
            if (state.issueDate[i - 1] !== state.issueDate[i]) changeMap[i].push("issueDate");
            if (state.address[i - 1] !== state.address[i]) changeMap[i].push("address");
        }
        return changeMap;
    }



    componentDidMount() {

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
        ////////////////////////getNidLog
        axios.get(getNidLog, config)
            .then(res => {
                console.log(res);
                const nidData = res.data.nidLog;

                let name = []; let fatherName = []; let motherName = []; let pob = []; let dob = [];
                let nidNo = []; let bloodGroup = []; let issueDate = []; let address = []; let time = [];

                for (let i = 0; i < nidData.length; i++) {
                    name.push(nidData[i].nid.name);
                    fatherName.push(nidData[i].nid.fatherName);
                    motherName.push(nidData[i].nid.motherName);
                    pob.push(nidData[i].nid.pob);
                    dob.push(nidData[i].nid.dob);
                    nidNo.push(nidData[i].nid.nidNo);
                    bloodGroup.push(nidData[i].nid.bloodGroup);
                    issueDate.push(nidData[i].nid.issueDate);
                    address.push(nidData[i].nid.address);
                    time.push(nidData[i].unixTime);
                }
                this.setState({
                    name: name,
                    fatherName: fatherName,
                    motherName: motherName,
                    pob: pob,
                    dob: dob,
                    nidNo: nidNo,
                    bloodGroup: bloodGroup,
                    issueDate: issueDate,
                    address: address,
                    time: time
                });


            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        console.log(error.response.data);
                        alert(error.response.data.message);
                       
                    }
                    else if (error.response.status === 404) {
                        alert("Not Found");
                    }
                    else if (error.response.status === 500) {
                        alert(error.response.data.message);
                    }
                }
                else if(error.request){
                    console.log(error.request);
                    alert("Error Connectiong");
                }
                else{
                    console.log("Error", error.message);
                    alert(error.message);
                }
            });


    }


    render() {
        let changeMap = this.getNidChangeMap(this.state);
        return (
            <div className="container">
                <h3 style={{ color: "#33bfaa" }}>NID Log</h3> 
                <table>
                    <thead>
                        <tr>
                            <th>DateTime</th>
                            {this.state.time.map((value, index) => {
                                let d = new Date(value);
                                return <th key={index}>{d.toLocaleString()}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            {this.state.name.map((value, index) => {
                                if (changeMap[index].indexOf("name") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>
                        <tr>
                            <td><b>Father Name</b></td>
                            {this.state.fatherName.map((value, index) => {
                                if (changeMap[index].indexOf("fatherName") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Mother Name</b></td>
                            {this.state.motherName.map((value, index) => {
                                if (changeMap[index].indexOf("motherName") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>Place of Birth</b></td>
                            {this.state.pob.map((value, index) => {
                                if (changeMap[index].indexOf("pob") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>Date of Birth</b></td>
                            {this.state.dob.map((value, index) => {
                                if (changeMap[index].indexOf("dob") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>NID No</b></td>
                            {this.state.nidNo.map((value, index) => {
                                if (changeMap[index].indexOf("nidNo") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>Blood Broup</b></td>
                            {this.state.bloodGroup.map((value, index) => {
                                if (changeMap[index].indexOf("bloodGroup") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>Issue Date</b></td>
                            {this.state.issueDate.map((value, index) => {
                                if (changeMap[index].indexOf("issueDate") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>

                        <tr>
                            <td><b>Address</b></td>
                            {this.state.address.map((value, index) => {
                                if (changeMap[index].indexOf("address") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }
                            })}
                        </tr>
                    </tbody>

                </table>


            </div>
        );
    }
}

export default nidLog;


