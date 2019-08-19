import React, { Component } from 'react';
import cookie from './utils/cookie';
import nidformvalidation from "./Validation/Nidformvalidation";
import axios from 'axios';
import dateFormatConverter from './utils/dateFormatConverter';
import fileValidation from "./Validation/fileValidation";
import { Spring } from 'react-spring/renderprops';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Loading from "./loading/Spinner";
import { setNid } from "./Url/Nid";
import { getTransactionStatus } from "./Url/Eth";
const Joi = require('@hapi/joi');




class Nidform extends Component {
    state = {
        name: "",
        nameValidation: false,
        fatherName: "",
        fatherNameValidation: false,
        motherName: "",
        motherNameValidation: false,
        pob: "",
        pobValidation: false,
        dob: "",
        dobValidation: false,
        nidNo: "",
        nidNoValidation: false,
        bloodGroup: "",
        bloodGroupValidation: false,
        issueDate: "",
        issueDateValidation: false,
        address: "",
        addressValidation: false,
        nidImage: null,
        selectFileValidation: false,
        showForm: false,
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { name, fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address, nidImage } = this.state;

        // if (nidNo.length < 10) {
        //     this.getNidNoError = alert("NID No must be 10, 13 & 15 digits");
        //     this.setState({ nidNoValidation: true });
        //     return;
        // } else if (nidNo.length >= 11 && nidNo.length <= 12) {
        //     this.getNidNoError = alert("NID No must be 10, 13 & 15 digits");
        //     this.setState({ nidNoValidation: true });
        //     return;
        // }
        // else if (nidNo.length >= 14 && nidNo.length <= 16) {
        //     this.getNidNoError = alert("NID No must be 10, 13 & 15 digits");
        //     this.setState({ nidNoValidation: true });
        //     return;
        // } else if (nidNo.length > 17) {
        //     this.getNidNoError = alert("NID No must be 10, 13 & 15 digits");
        //     this.setState({ nidNoValidation: true });
        //     return;
        // }




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

            // if (result.error !== null) {
            //     throw Error(result.error.details[0].message);
            // }
            // else if (fileValidation.fileValidate("uploadNidFile", (3 * 1024 * 1024), ["image/jpeg", "image/png"]) === false) {
            //     console.log("File validation failed");
            // }

            if (fileValidation.fileValidate("uploadNidFile", (3 * 1024 * 1024), ["image/jpeg", "image/png"]) === false) {
                console.log("File validation failed");
            }
            else if (result.error !== null) {
                throw Error(result.error.details[0].message);
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
                    //SETNID
                    try {
                        const res = await axios.post(setNid, formData, config);
                        let txHash = res.data.txHash;
                        setTimeout(async () => {
                            try {
                                console.log("Hash of tx: ", txHash);
                                //Get Transaction Status
                                let txStatus = await axios.post(getTransactionStatus, { txHash: txHash }, config);
                                console.log("Transaction status: ", txStatus);
                                if (txStatus.data.status) {
                                    alert(`Tranasction Successfull: ${txStatus.data.status} : ${txStatus.data.confirmations}`);
                                    this.setState({ loading: false })
                                }
                                else {
                                    alert("Tx in mempool please wait for sometime");
                                    this.setState({ loading: false })
                                }
                            }
                            catch (ex) {
                                // alert(ex.toString());
                                if (ex.response) {
                                    if (ex.response.status === 400 || ex.response.status === 401) {
                                        console.log(ex.response.data);
                                        alert(ex.response.data.message);
                                    }
                                    else if (ex.response.status === 404) {
                                        alert("Not found");
                                    }
                                    else if (ex.response.status === 500) {
                                        alert(ex.response.data.message);
                                    }
                                }
                                else if (ex.request) {
                                    console.log(ex.request);
                                    alert("Error Connecting");
                                }
                                else {
                                    console.log("Error", ex.message);
                                    alert(ex.message);
                                }
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
                    }
                    catch (error) {
                        if (error.response) {
                            if (error.response.status === 400 || error.response.status === 401) {
                                console.log(error.response.data);
                                alert(error.response.data.message);
                            }
                            else if (error.response.status === 404) {
                                alert("Not found");
                            }
                            else if (error.response.status === 500) {
                                alert(error.response.data.message);
                            }
                        }
                        else if (error.request) {
                            console.log(error.request);
                            alert("Error Connecting");
                        }
                        else {
                            console.log("Error", error.message);
                            alert(error.message);
                        }
                    }
                });
            }
        }
        catch (ex) {
            //alert(ex.toString());
            if (ex.response) {
                if (ex.response.status === 400 || ex.response.status === 401) {
                    console.log(ex.response.data);
                    alert(ex.response.data.message);
                }
                else if (ex.response.status === 404) {
                    alert("Not found");
                }
                else if (ex.response.status === 500) {
                    alert(ex.response.data.message);
                }
            }
            else if (ex.request) {
                console.log(ex.request);
                alert("Error Connecting");
            }
            else {
                console.log("Error", ex.message);
                alert(ex.message);
            }
        }


    }




    onChangeName = e => this.setState({ name: e.target.value });
    onChangeFatherName = e => this.setState({ fatherName: e.target.value });
    onChangeMotherName = e => this.setState({ motherName: e.target.value });
    onChangePob = e => this.setState({ pob: e.target.value });
    //  handleChangeDate = date => this.setState({dob: date});

    // dateChanged = (provider, d) => {
    //     this.setState({ [provider]: d });
    // }
    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
       // console.log(typeof (input.value));
        try {
            const niddateConvert = dateFormatConverter.getNidFormat(input.value);
            this.setState({ dob: niddateConvert });
        }
        catch (ex) {
            // console.log(ex);
        }

    }
    handleIssueDateChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();

        try {
            const issueDateConvert = dateFormatConverter.getNidIssueDateFormat(input.value);
            this.setState({ issueDate: issueDateConvert });
        }
        catch (ex) {
            console.log(ex);
        }

    }






    onChangeNidNo = e => this.setState({ nidNo: e.target.value, nidNoValidation: true });
    onChangeAddress = e => this.setState({ address: e.target.value });
    // onChangeIssueDate = e => this.setState({ issueDate: e.target.value });



    handleBloodChange = e => {
        this.setState({ bloodGroup: e.target.value });
    }

    fileSelectedHandler = event => {
        this.setState({
            nidImage: event.target.files[0]
            //nidImage: URL.createObjectURL(event.target.files[0])
        })
    }


    handleNidNameClick = e => {
        this.setState({ nameValidation: false });
    }

    handleNidFatherNameClick = e => {
        this.setState({ fatherNameValidation: false });
    }

    handleNidMotherNameClick = e => {
        this.setState({ motherNameValidation: false });
    }

    handleNidPobClick = e => {
        this.setState({ pobValidation: false });
    }

    handleNidNoClick = e => {
        this.setState({ nidNoValidation: false });
    }

    handleNidBloodGroupClick = e => {
        this.setState({ bloodGroupValidation: false });
    }

    handleNidNoClick = e => {
        this.setState({ nidNoValidation: false });
    }

    handleNidIssueDateClick = e => {
        this.setState({ issueDateValidation: false });
    }

    handleNidAddressClick = e => {
        this.setState({ addressValidation: false });
    }

    handleNidSelectFileClick = e => {
        this.setState({ selectFileValidation: false });
    }



    render() {
        // const { name,fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address,showForm } = this.state;
        const { bloodGroup, showForm, loading } = this.state;
        //  console.log("in render",name);
        const data = (
            <div className="container">
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"

                }} className="">


                    <button type="submit" onClick={() => {


                        this.setState({ showForm: !this.state.showForm })
                    }}
                        className="btn btn-primary btn-block" style={{ backgroundColor: "#fff", color: "#999" }}>

                        NID Informations &nbsp; &nbsp; &nbsp; <i className="fas fa-caret-down"></i>
                    </button>
                    <br />

                    {showForm ?

                        <Spring
                            from={{ opacity: 0, marginTop: -50 }}
                            to={{ opacity: 1, marginTop: 0 }}
                        >
                            {props => (
                                <div style={props}>
                                    <form onSubmit={this.onSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="uploadNidFile">Provide NID Image</label>&nbsp;&nbsp;
                                         <i style={{ color: 'red', textAlign: "center" }}>{this.state.selectFileValidation === true ? this.getNidSelectFileError : ""}</i>
                                            <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" id="uploadNidFile" aria-describedby="fileHelp" onClick={this.handleNidSelectFileClick}></input>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Name:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.nameValidation === true ? this.getNidNameError : ""}</i>
                                            <input label="Name" type="text" placeholder="Name" onChange={this.onChangeName} className="form-control" id="name" onClick={this.handleNidNameClick}></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fatherName">Father's Name:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.fatherNameValidation === true ? this.getNidFatherNameError : ""}</i>
                                            <input label="Father Name" type="text" placeholder="Father Name" onChange={this.onChangeFatherName} className="form-control" id="fatherName" onClick={this.handleNidFatherNameClick}></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="motherName">Mother's Name:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.motherNameValidation === true ? this.getNidMotherNameError : ""}</i>
                                            <input label="Mother Name" type="text" placeholder="Mother Name" onChange={this.onChangeMotherName} className="form-control" id="motherName" onClick={this.handleNidMotherNameClick}></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pob">Place of Birth:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.pobValidation === true ? this.getNidPobError : ""}</i>
                                            <input label="Place of Birth" type="text" placeholder="Place of Birth" onChange={this.onChangePob} className="form-control" id="pob" onClick={this.handleNidPobClick}></input>
                                        </div>
                                        <div className="form-group">
                                            <div>
                                                <p>Date of Birth</p>&nbsp;&nbsp;
                                        {/* <i style={{color: 'red', textAlign:"center"}}>{this.state.dobValidation === true ? this.getNidDobError : ""}</i> */}
                                                <DayPickerInput onDayChange={this.handleDayChange} />
                                            </div>
                                            {/* <DatePicker  onChange={this.handleDayChange} /> */}
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="nidNo">NID No:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.nidNoValidation === true ? this.getNidNoError : ""}</i>
                                            <input label="NID No" type="text" placeholder="NID Number" onChange={this.onChangeNidNo} className="form-control" id="nidNo" onClick={this.handleNidNoClick}></input>
                                        </div>
                                        <div className="form-group">

                                            <label htmlFor="bloodGroup">Blood Group:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.bloodGroupValidation === true ? this.getNidBloodGroupError : ""}</i>
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
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.issueDateValidation === true ? this.getNidIssueDateError : ""}</i>
                                            <input label="Issue Date" type="text" placeholder="Issue Date" onChange={this.onChangeIssueDate} className="form-control" id="pwd" onClick={this.handleNidIssueDateClick}></input>
                                        </div> */}

                                        <div className="form-group">
                                            <div>
                                                <p>Issue Date:</p>&nbsp;&nbsp;
                                                <DayPickerInput onDayChange={this.handleIssueDateChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Address">Address:</label>&nbsp;&nbsp;
                                        <i style={{ color: 'red', textAlign: "center" }}>{this.state.addressValidation === true ? this.getNidAddressError : ""}</i>
                                            <input label="Address" type="text" placeholder="Address" onChange={this.onChangeAddress} className="form-control" id="Address" onClick={this.handleNidAddressClick}></input>
                                        </div>

                                        {/* <div className="form-group">
                                            <label htmlFor="uploadNidFile">Provide NID Image</label>&nbsp;&nbsp;
                                         <i style={{ color: 'red', textAlign: "center" }}>{this.state.selectFileValidation === true ? this.getNidSelectFileError : ""}</i>
                                            <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" id="uploadNidFile" aria-describedby="fileHelp" onClick={this.handleNidSelectFileClick}></input>

                                        </div> */}


                                        <small id="fileHelp" className="form-text text-muted" >
                                            <i style={{ color: "#33bfaa" }} className="fas fa-exclamation-circle"></i>&nbsp;
                                                Before submitting form, please check all your provided information again.</small>

                                        <br />
                                        <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#00cccc" }}>Submit</button>
                                        <br />
                                    </form>

                                </div>
                            )}
                        </Spring> : null}





                    {/* <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#fff", color: "#999" }}>
                        TIN Informations &nbsp; &nbsp; &nbsp; <i className="fas fa-caret-down"></i>
                    </button> */}



                </div>






            </div >
        );
        return (
            <div>
                {loading ? <Loading message="NID records will be inserted in few minutes" /> : data}
            </div>
        );
    }
}

export default Nidform;