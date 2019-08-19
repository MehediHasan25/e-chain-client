import React, { Component } from 'react';
import cookie from '../utils/cookie';
import ImageConversion from '../utils/ImageConversion';
import Images from "../Images";
import Navbar from "../Navbar";
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFormatConverter from '../utils/dateFormatConverter';
import Loading from "../loading/Spinner";
import nidformvalidation from "../Validation/Nidformvalidation";
import fileValidation from "../Validation/fileValidation";
import { Redirect } from 'react-router-dom';
import { getNid, setNid } from "../Url/Nid";
import { getTransactionStatus } from "../Url/Eth";
const Joi = require('@hapi/joi');

class UpdateNid1 extends Component {
    state = {
        name: '',
        fatherName: '',
        motherName: '',
        pob: '',
        dob: '',
        nidNo: '',
        bloodGroup: '',
        issueDate: '',
        address: '',
        nidImage: '',
        oldNidImage: '',
        loading: false
    }

    componentWillMount() {
        document.title = 'Update NID';
    }


    componentDidMount() {
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
        ////////////////////////////////getNid
        axios.get(getNid, config)
            .then(res => {
                let base64Flag = 'data:image/jpeg;base64,';
                let imageBuffer = res.data.nidImage.data.data;
                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                let convertImageFlag = base64Flag + imageString;
                //console.log(convertImageFlag.data);
                // console.log(typeof(imageString));
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
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 400 || err.response.status === 401) {
                        console.log(err.response.data);
                        // alert(err.response.data.message);

                    }
                    else if (err.response.status === 404) {
                        //alert("Not Found");
                        console.log("Not Found");
                    }
                    else if (err.response.status === 500) {
                        //alert(err.response.data.message);
                        console.log("Internal Server Error");
                    }
                }
                else if (err.request) {
                    console.log(err.request);
                    //alert("Error Connectiong");
                }
                else {
                    console.log("Error", err.message);
                    // alert(err.message);
                }
            });
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address, nidImage } = this.state;
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        const formData = new FormData();


        try {
            const nidobj = {
                name,
                fatherName,
                motherName,
                pob,
                dob,
                nidNo,
                bloodGroup,
                issueDate,
                address,

            }

            const result = Joi.validate(nidobj, nidformvalidation.setNidJoiSchema);

            if (result.error !== null) {
                throw Error(result.error.details[0].message);
            }
            else if (fileValidation.fileValidate("updateNidFile", (3 * 1024 * 1024), ["image/jpeg", "image/png"]) === false) {
                console.log("File validation failed");
            }
            else {
                formData.append('name', name);
                formData.append('fatherName', fatherName);
                formData.append('motherName', motherName);
                formData.append('pob', pob);
                formData.append('dob', dob);
                formData.append('nidNo', nidNo);
                formData.append('bloodGroup', bloodGroup);
                formData.append('issueDate', issueDate);
                formData.append('address', address);
                formData.append('nidImage', nidImage, nidImage.name);
                this.setState({ loading: true }, async () => {
                    ////////////////////setNid
                    const res = await axios.post(setNid, formData, config);
                    let txHash = res.data.txHash;
                    setTimeout(async () => {
                        try {
                            console.log("Hash of tx: ", txHash);
                            ////////////////////////////getTransactionStatus
                            let txStatus = await axios.post(getTransactionStatus, { txHash: txHash }, config);
                            console.log("Transaction status: ", txStatus);
                            if (txStatus.data.status) {
                                alert(`Tranasction Successfull: ${txStatus.data.status} : ${txStatus.data.confirmations}`);
                                this.setState({ loading: false });
                                this.props.history.push("/profile");
                            }
                            else {
                                alert("Tx in mempool please wait for sometime");
                                this.setState({ loading: false });

                            }
                        }
                        catch (ex) {
                            alert(ex.toString());
                            this.setState({ loading: false })
                        }
                    }, 1000 * 10);
                    console.log("End");
                    this.setState({
                        name: '',
                        fatherName: '',
                        motherName: '',
                        pob: '',
                        dob: '',
                        nidNo: '',
                        bloodGroup: '',
                        issueDate: '',
                        address: '',
                        nidImage: ''
                    });
                });
            }
        }
        catch (ex) {
            alert(ex.toString());
        }


    }


    onChangeName = e => this.setState({ name: e.target.value });
    onChangeFatherName = e => this.setState({ fatherName: e.target.value });
    onChangeMotherName = e => this.setState({ motherName: e.target.value });
    onChangePob = e => this.setState({ pob: e.target.value });

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        //  console.log(input.value);
        try {
            const niddateConvert = dateFormatConverter.getNidFormat(input.value);
            this.setState({ dob: niddateConvert });
        }
        catch (ex) {
            //console.log(ex);
        }

    }


    handleIssueDateChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();

        try {
            const issueDateConvert = dateFormatConverter.getNidIssueDateFormat(input.value);
            this.setState({ issueDate: issueDateConvert });
        }
        catch (ex) {
            //   console.log(ex);
        }

    }


    onChangeNidNo = e => this.setState({ nidNo: e.target.value });
    onChangeAddress = e => this.setState({ address: e.target.value });
    //onChangeIssueDate = e => this.setState({ issueDate: e.target.value });

    handleBloodChange = e => {
        this.setState({ bloodGroup: e.target.value });
    }

    fileSelectedHandler = event => {
        this.setState({
            nidImage: event.target.files[0]
            //nidImage: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {
        const { name, fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address, loading } = this.state;

        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }
        const updateNidData = (
            <div className="container">
                <br />

                {/* <div className="d-flex align-items-center justify-content-sm-between">
                    <div className="col-sm-4" >
                        <Images />
                    </div>

                    <div className="col-sm-6" >
                        <Navbar />
                    </div>
                </div> */}
                <br />

                <h3 style={{ textAlign: "center", color: "#33bfaa" }}> Update NID Information </h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-6">

                            <br />

                            <div className="form-group">
                                <label htmlFor="updateNidFile">Update NID Image</label>&nbsp;&nbsp;
                                    <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" id="updateNidFile" aria-describedby="fileHelp" onClick={this.handleNidSelectFileClick}></input>

                            </div>

                            <div className="form-group">
                                <label htmlFor="name" >Name:</label>&nbsp;&nbsp;
                        <input label="Name" type="text" value={name} placeholder="Name" onChange={this.onChangeName} className="form-control" id="nidname" onClick={this.handleNidNameClick}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fathername">Father's Name:</label>&nbsp;&nbsp;
                        <input label="Father Name" type="text" value={fatherName} placeholder="Father Name" onChange={this.onChangeFatherName} className="form-control" id="fatherName" onClick={this.handleNidFatherNameClick}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="motherName">Mother's Name:</label>&nbsp;&nbsp;
                        <input label="Mother Name" type="text" value={motherName} placeholder="Mother Name" onChange={this.onChangeMotherName} className="form-control" id="motherName" onClick={this.handleNidMotherNameClick}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pob">Place of Birth:</label>&nbsp;&nbsp;
                        <input label="Place of Birth" type="text" value={pob} placeholder="Place of Birth" onChange={this.onChangePob} className="form-control" id="pob" onClick={this.handleNidPobClick}></input>
                            </div>
                            <div className="form-group">
                                <div>
                                    <p>Date of Birth:</p>&nbsp;&nbsp;
                            <DayPickerInput value={dob} onDayChange={this.handleDayChange} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="nidNo">NID No:</label>&nbsp;&nbsp;
                        <input label="NID No" type="text" value={nidNo} placeholder="NID Number" onChange={this.onChangeNidNo} className="form-control" id="nidNo" onClick={this.handleNidNoClick}></input>
                            </div>
                            <div className="form-group">

                                <label htmlFor="bloodGroup">Blood Group:</label>&nbsp;&nbsp;
                        <select id="bloodGroup" className="custom-select" value={bloodGroup} name={this.props.name} onChange={this.handleBloodChange.bind(this)} onClick={this.handleNidBloodGroupClick}  >
                                    <option value="">--Select--</option>
                                    <option value="A+">A+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>



                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="pwd">Issue Date:</label>&nbsp;&nbsp;
                        <input label="Issue Date" type="text" value={issueDate} placeholder="Issue Date" onChange={this.onChangeIssueDate} className="form-control" id="pwd" onClick={this.handleNidIssueDateClick}></input>
                            </div> */}
                            <div className="form-group">
                                <div>
                                    <p>Issue Date:</p>&nbsp;&nbsp;
                                     <DayPickerInput value={issueDate} onDayChange={this.handleIssueDateChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Address">Address:</label>&nbsp;&nbsp;
                        <input label="Address" type="text" value={address} placeholder="Address" onChange={this.onChangeAddress} className="form-control" id="Address" onClick={this.handleNidAddressClick}></input>
                            </div>

                       

                            <small id="fileHelp" className="form-text text-muted" >
                                    <i style={{ color: "#33bfaa" }} className="fas fa-exclamation-circle"></i>&nbsp;
                        Before submitting form, please check all your provided information again.</small>
                        <br/>

                            <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#00cccc" }}>Submit</button>
                            <br />
                        </div>
                        <div className=" mx-auto d-block">
                            <br /> <br /> <br /> <br /> <br />
                            <img src={this.state.oldNidImage} className="img-thumbnail" alt="" width="304" height="236" />
                            <p style={{ textAlign: "center", color: "#33bfaa" }}>NID Image</p>
                        </div>
                    </div>
                </form>
            </div>
        );
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


                {loading ? <Loading /> : updateNidData}
            </div>

        );
    }
}

export default UpdateNid1;