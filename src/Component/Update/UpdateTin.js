import React, { Component } from 'react';
import cookie from '../utils/cookie';
import Images from "../Images";
import Navbar from "../Navbar";
import ImageConversion from '../utils/ImageConversion';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFormatConverter from '../utils/dateFormatConverter';
import Loading from "../loading/Spinner";
import fileValidation from "../Validation/fileValidation";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { getTin, setTin } from "../Url/Tin";
import { getTransactionStatus } from "../Url/Eth";


class UpdateTin extends Component {
    state = {
        tin: '',
        taxesCircle: '',
        taxesZone: '',
        name: '',
        fatherName: '',
        motherName: '',
        currentAddress: '',
        permanentAddress: '',
        previousTin: '',
        status: 'Individual',
        date: '',
        tinImage: '',
        oldTinImage: '',
        loading: false
    }

    componentWillMount() {
        document.title = 'Update TIN';
    }


    componentDidMount() {
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }
        ////////////getTin
        axios.get(getTin, config)
            .then(res => {
                // console.log(res);
                let base64Flag = 'data:image/jpeg;base64,';
                let imageBuffer = res.data.tinImage.data.data;
                let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
                let convertImageFlag = base64Flag + imageString;

                let tinData = res.data.tinData.tin;
                this.setState({
                    tin: tinData.tin,
                    taxesCircle: tinData.taxesCircle,
                    taxesZone: tinData.taxesZone,
                    name: tinData.name,
                    fatherName: tinData.fatherName,
                    motherName: tinData.motherName,
                    currentAddress: tinData.currentAddress,
                    permanentAddress: tinData.permanentAddress,
                    previousTin: tinData.previousTin,
                    status: tinData.status,
                    date: tinData.date,
                    tinImage: convertImageFlag,
                    oldTinImage: convertImageFlag
                });
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 400 || err.response.status === 401) {
                        console.log(err.response.data);
                        //alert(err.response.data.message);

                    }
                    else if (err.response.status === 404) {
                        // alert("Not Found");
                        console.log("Not found");
                    }
                    else if (err.response.status === 500) {
                        // alert(err.response.data.message);
                        console.log("Internal Server Error");
                    }
                }
                else if (err.request) {
                    console.log(err.request);
                    // alert("Error Connectiong");
                }
                else {
                    console.log("Error", err.message);
                    // alert(err.message);
                }
            });
    }


    onSubmit = async (e) => {
        e.preventDefault();

        const { tin, taxesCircle, taxesZone, name, fatherName, motherName, currentAddress, permanentAddress, previousTin, status, date, tinImage } = this.state;
        // console.log(fatherName);
        // console.log(motherName);
        // console.log(permanentAddress);

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        let formData = new FormData();

        try {
            if (fileValidation.fileValidate("updateTinFile", (3 * 1024 * 1024), ["image/jpeg", "image/png"]) === false) {
                console.log("File validation failed");
            }
            else {
                formData.append('tin', tin);
                formData.append('taxesCircle', taxesCircle);
                formData.append('taxesZone', taxesZone);
                formData.append('name', name);
                formData.append('fatherName', fatherName);
                formData.append('motherName', motherName);
                formData.append('currentAddress', currentAddress);
                formData.append('permanentAddress', permanentAddress);
                formData.append('previousTin', previousTin);
                formData.append('status', status);
                formData.append('date', date);
                formData.append('tinImage', tinImage, tinImage.name);


                this.setState({ loading: true }, async () => {
                    ///////////////////////setTin
                    const res = await axios.post(setTin, formData, config);
                    let txHash = res.data.txHash;
                    setTimeout(async () => {
                        try {
                            console.log("Hash of tx: ", txHash);
                            //////////////////////////////getTransactionStatus
                            let txStatus = await axios.post(getTransactionStatus, { txHash: txHash }, config);
                            console.log("Transaction status: ", txStatus);
                            if (txStatus.data.status) {
                                alert(`Tranasction Successfull: ${txStatus.data.status} : ${txStatus.data.confirmations}`);
                                this.setState({ loading: false });
                                this.props.history.push("/profile");
                            }
                            else {
                                alert("Tx in mempool please wait for sometime");
                                this.setState({ loading: false })
                            }
                        }
                        catch (ex) {
                            alert(ex.toString());
                            this.setState({ loading: false })
                        }
                    }, 1000 * 10);
                    console.log("End");
                    this.setState({
                        tin: '',
                        taxesCircle: '',
                        taxesZone: '',
                        name: '',
                        fatherName: '',
                        motherName: '',
                        currentAddress: '',
                        permanentAddress: '',
                        previousTin: '',
                        // status: '',
                        date: '',
                        tinImage: ''
                    });
                });

            }

        } catch (ex) {
            alert(ex.toString());
        }


        // const formData = new FormData();
        // formData.append('tin', tin);
        // formData.append('taxesCircle', taxesCircle);
        // formData.append('taxesZone', taxesZone);
        // formData.append('name', name);
        // formData.append('fatherName', fatherName);
        // formData.append('motherName', motherName);
        // formData.append('currentAddress', currentAddress);
        // formData.append('permanentAddress', permanentAddress);
        // formData.append('previousTin', previousTin);
        // formData.append('status', status);
        // formData.append('date', date);
        // formData.append('tinImage', tinImage, tinImage.name);


        // this.setState({ loading: true }, async () => {
        //     const res = await axios.post(`http://localhost:4000/tin/set-tin`, formData, config);
        //     let txHash = res.data.txHash;
        //     setTimeout(async () => {
        //         try {
        //             console.log("Hash of tx: ", txHash);
        //             let txStatus = await axios.post('http://localhost:4000/eth/get-tx-status', { txHash: txHash }, config);
        //             console.log("Transaction status: ", txStatus);
        //             if (txStatus.data.status) {
        //                 alert(`Tranasction Successfull: ${txStatus.data.status} : ${txStatus.data.confirmations}`);
        //                 this.setState({ loading: false });
        //                 this.props.history.push("/profile");
        //             }
        //             else {
        //                 alert("Tx in mempool please wait for sometime");
        //                 this.setState({ loading: false })
        //             }
        //         }
        //         catch (ex) {
        //             alert(ex.toString());
        //             this.setState({ loading: false })
        //         }
        //     }, 1000 * 60 * 1);
        //     console.log("End");
        // });
    }



    onChangeTin = e => this.setState({ tin: e.target.value });
    onChangeTaxesCircle = e => this.setState({ taxesCircle: e.target.value });
    onChangeTaxesZone = e => this.setState({ taxesZone: e.target.value });
    onChangeName = e => this.setState({ name: e.target.value });
    onChangeFatherName = e => {
        //console.log("From onchange fathername: ", e.target.value);
        this.setState({ fatherName: e.target.value })
    };
    onChangeMotherName = e => this.setState({ motherName: e.target.value });
    onChangeCurrentAddress = e => this.setState({ currentAddress: e.target.value });
    onChangePermanentAddress = e => this.setState({ permanentAddress: e.target.value });
    onChangePreviousTin = e => this.setState({ previousTin: e.target.value });
    onChangeStatus = e => this.setState({ status: e.target.value });

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        // console.log(input.value);
        try {
            const tindateConvert = dateFormatConverter.getTinFormat(input.value);
            this.setState({ date: tindateConvert });
        } catch (ex) {
            //    console.log(ex);
        }

    }

    fileSelectedHandler = event => {
        this.setState({
            tinImage: event.target.files[0]
            //tinImage: URL.createObjectURL(event.target.files[0])
        })
    }



    render() {
        const { tin, taxesCircle, taxesZone, name, currentAddress, previousTin, status, date, loading } = this.state;

        if (cookie.getCookie("x-auth-token") === "" && cookie.getCookie("username") === "") {
            return <Redirect to='/login' />
        }
        const updateTinData = (
            <div className="container">
                <br />
                <br />
                <h3 style={{ textAlign: "center", color: "#33bfaa" }}> Update Tin Information </h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <br />

                            <div className="form-group">
                                <label htmlFor="tinImage">Provide TIN Image</label>
                                <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" id="updateTinFile" aria-describedby="fileHelp"></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="tin">TIN:</label>
                                <input type="text" placeholder="TIN" value={tin} onChange={this.onChangeTin} className="form-control" id="tin" ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="taxesCircle">Taxes Circle:</label>
                                <input type="text" placeholder="Taxes Circle" value={taxesCircle} onChange={this.onChangeTaxesCircle} className="form-control" id="taxesCircle"></input>
                            </div>


                            <div className="form-group">
                                <label htmlFor="taxesZone">Taxes Zone:</label>
                                <input type="text" placeholder="Taxes Zone" value={taxesZone} onChange={this.onChangeTaxesZone} className="form-control" id="taxesZone" ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" placeholder="Name" value={name} onChange={this.onChangeName} className="form-control" id="name" ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fatherName">Father Name:</label>
                                <input label="Father Name" type="text" defaultValue={this.state.fatherName} placeholder="Father Name" onChange={this.onChangeFatherName} className="form-control" id="fatherName" onClick={this.handleNidFatherNameClick}></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="motherName">Mother Name:</label>
                                <input type="text" placeholder="Mother Name" defaultValue={this.state.motherName} onChange={this.onChangeMotherName} className="form-control" id="motherName" ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="currentAddress">Current Address:</label>
                                <input type="text" placeholder="Current Address" value={currentAddress} onChange={this.onChangeCurrentAddress} className="form-control" id="currentAddress"></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="permanentAddress">Permanent Address:</label>
                                <input type="text" placeholder="Permanent Address" defaultValue={this.state.permanentAddress} onChange={this.onChangePermanentAddress} className="form-control" id="permanentAddress"></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="previousTin">Previous TIN No:</label>
                                <input type="text" placeholder="Previous TIN No" value={previousTin} onChange={this.onChangePreviousTin} className="form-control" id="previousTin"></input>
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="status">Status:</label>
                                <input type="text" placeholder="Status" value={status} onChange={this.onChangeStatus} className="form-control" id="pwd" ></input>
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="status">Status:</label>&nbsp;&nbsp;
                                <select id="tinstatus" className="custom-select" value={status} name={this.props.name} onChange={this.onChangeStatus}>

                                    <option value="Individual"> Individual </option>

                                </select>

                            </div>

                            <div className="form-group">
                                <label htmlFor="pwd">Date: &nbsp;</label>
                                <DayPickerInput value={date} onDayChange={this.handleDayChange} />
                            </div>

                            

                            <small id="fileHelp" className="form-text text-muted" >
                                <i style={{ color: "#33bfaa" }} className="fas fa-exclamation-circle"></i>&nbsp;
                                            Before submitting form, please check all your provided information again.</small>
                            <br />

                            <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#33bfaa" }}>Submit</button>
                            <br />
                        </div>
                        <div className=" mx-auto d-block">
                            <br /> <br /> <br /> <br /> <br />
                            <img src={this.state.oldTinImage} className="img-thumbnail" alt="" width="304" height="236" />
                            <p style={{ textAlign: "center", color: "#33bfaa" }}>TIN Image</p>
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
                {loading ? <Loading message="TIN Information will be updated within few minutes" /> : updateTinData}
            </div>

        );
    }
}

export default UpdateTin;