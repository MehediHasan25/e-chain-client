import React, { Component } from 'react';
import cookie from "../utils/cookie";
import "../css/table.css";
import {getTinLog} from "../Url/Tin";
import axios from 'axios';


class tinLog extends Component {
    state = {
       tin:[],
       taxesCircle:[],
       taxesZone:[],
       name:[],
       fatherName:[],
       motherName:[],
       currentAddress:[],
       permanentAddress:[],
       previousTin:[],
       status:[],
       date:[],
        time: []
    }

    getTinChangeMap(state) {
        let len = state.name.length;
        let changeMap = [];
        for (let i = 0; i < len; i++) changeMap[i] = [];
        for (let i = 1; i < len; i++) {
            if (state.tin[i - 1] !== state.tin[i]) changeMap[i].push("tin");
            if (state.taxesCircle[i - 1] !== state.taxesCircle[i]) changeMap[i].push("taxesCircle");
            if (state.taxesZone[i - 1] !== state.taxesZone[i]) changeMap[i].push("taxesZone");
            if (state.name[i - 1] !== state.name[i]) changeMap[i].push("name");
            if (state.fatherName[i - 1] !== state.fatherName[i]) changeMap[i].push("fatherName");
            if (state.motherName[i - 1] !== state.motherName[i]) changeMap[i].push("motherName");
            if (state.currentAddress[i - 1] !== state.currentAddress[i]) changeMap[i].push("currentAddress");
            if (state.permanentAddress[i - 1] !== state.permanentAddress[i]) changeMap[i].push("permanentAddress");
            if (state.previousTin[i - 1] !== state.previousTin[i]) changeMap[i].push("previousTin");
            if (state.status[i - 1] !== state.status[i]) changeMap[i].push("status");
            if (state.date[i - 1] !== state.date[i]) changeMap[i].push("date");
            
        }
        return changeMap;
    }



    componentDidMount() {

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
/////////////////////////////getTinLog
        axios.get(getTinLog, config)
            .then(res => {
                console.log(res);
               const tinData = res.data.tinLog;

               let tin =[]; let taxesCircle =[]; let taxesZone=[]; let name=[]; let fatherName=[]; 
               let motherName=[]; let currentAddress=[]; let permanentAddress =[]; let previousTin=[];
               let status=[]; let date=[]; let time=[];

                for (let i = 0; i < tinData.length; i++) {
                    tin.push(tinData[i].tin.tin);
                    taxesCircle.push(tinData[i].tin.taxesCircle);
                    taxesZone.push(tinData[i].tin.taxesZone);
                    name.push(tinData[i].tin.name);
                    fatherName.push(tinData[i].tin.fatherName);
                    motherName.push(tinData[i].tin.motherName);
                    currentAddress.push(tinData[i].tin.currentAddress);
                    permanentAddress.push(tinData[i].tin.permanentAddress);
                    previousTin.push(tinData[i].tin.previousTin);
                    status.push(tinData[i].tin.status);
                    date.push(tinData[i].tin.date);
                    time.push(tinData[i].unixTime);
                }
                this.setState({
                   tin:tin,
                   taxesCircle:taxesCircle,
                   taxesZone:taxesZone,
                   name:name,
                   fatherName:fatherName,
                   motherName:motherName,
                   currentAddress: currentAddress,
                   permanentAddress: permanentAddress,
                   previousTin:previousTin,
                   status:status,
                   date: date,
                   time:time
                });


            })
            .catch(error => console.log(error.response));


    }


    render() {
        let changeMap = this.getTinChangeMap(this.state);
        return (
            <div className="container">
                <h3 style={{ color: "#33bfaa" }}>TIN Log</h3>
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
                            <td><b>Tin</b></td>
                            {this.state.tin.map((value, index) => {
                                if (changeMap[index].indexOf("tin") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Taxes Circle</b></td>
                            {this.state.taxesCircle.map((value, index) => {
                                if (changeMap[index].indexOf("taxesCircle") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Taxes Zone</b></td>
                            {this.state.taxesZone.map((value, index) => {
                                if (changeMap[index].indexOf("taxesZone") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

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
                            <td><b>Current Address</b></td>
                            {this.state.currentAddress.map((value, index) => {
                                if (changeMap[index].indexOf("currentAddress") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>


                        <tr>
                            <td><b>Permanent Address</b></td>
                            {this.state.permanentAddress.map((value, index) => {
                                if (changeMap[index].indexOf("permanentAddress") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Previous TIN</b></td>
                            {this.state.previousTin.map((value, index) => {
                                if (changeMap[index].indexOf("previousTin") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Status</b></td>
                            {this.state.status.map((value, index) => {
                                if (changeMap[index].indexOf("status") === -1) {
                                    return <td key={index}>{value}</td>
                                }
                                else {
                                    return <td key={index} style={{ color: "green" }}>{value}</td>
                                }

                            })}
                        </tr>

                        <tr>
                            <td><b>Date</b></td>
                            {this.state.date.map((value, index) => {
                                if (changeMap[index].indexOf("date") === -1) {
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

export default tinLog;


