import React, { Component } from 'react'
import cookie from './utils/cookie';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFormatConverter from './utils/dateFormatConverter';
import { Spring } from 'react-spring/renderprops';
import fileValidation from "./Validation/fileValidation";
import Loading from "./loading/Spinner";
import axios from 'axios';
import { setTin } from "./Url/Tin";
import { getTransactionStatus } from "./Url/Eth";



class TinForm extends Component {
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
        status: "Individual",
        date: '',
        tinImage: null,
        showForm: false,
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { tin, taxesCircle, taxesZone, name, fatherName, motherName, currentAddress, permanentAddress, previousTin, status, date, tinImage } = this.state;
        console.log(fatherName);
        console.log(motherName);
        console.log(permanentAddress);

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        const formData = new FormData();

        try {
            if (fileValidation.fileValidate("uploadTinFile", (3 * 1024 * 1024), ["image/jpeg", "image/png"]) === false) {
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
                    //settin api
                    try {
                        const res = await axios.post(setTin, formData, config);
                        console.log(res);
                        let txHash = res.data.txHash;
                        setTimeout(async () => {
                            try {
                                console.log("Hash of tx: ", txHash);
                                //getTransactionStatus
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
                            tin: '',
                            taxesCircle: '',
                            taxesZone: '',
                            name: '',
                            fatherName: '',
                            motherName: '',
                            currentAddress: '',
                            permanentAddress: '',
                            previousTin: '',
                            status: '',
                            date: '',
                            tinImage: ''
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

        } catch (ex) {
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
        }




    }

    onChangeTin = e => this.setState({ tin: e.target.value });
    onChangeTaxesCircle = e => this.setState({ taxesCircle: e.target.value });
    onChangeTaxesZone = e => this.setState({ taxesZone: e.target.value });
    onChangeName = e => this.setState({ name: e.target.value });
    onChangeFatherName = e => this.setState({ fatherName: e.target.value });
    onChangeMotherName = e => this.setState({ motherName: e.target.value })
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
           // console.log(ex);
        }

    }

    fileSelectedHandler = event => {
        this.setState({
            tinImage: event.target.files[0]
            //tinImage: URL.createObjectURL(event.target.files[0])
        })
    }


    render() {
        const { showForm, loading, status } = this.state;
        const tindata = (
            <div className="container">
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"

                }} className="">


                    <button type="submit" onClick={() => {


                        this.setState({ showForm: !this.state.showForm })
                    }}
                        className="btn btn-primary btn-block" style={{ backgroundColor: "#fff", color: "#999" }}>

                        TIN Informations &nbsp; &nbsp; &nbsp; <i className="fas fa-caret-down" style={{ color: "#33bfaa" }}></i>
                    </button>
                    <br />

                    {showForm ?

                        <Spring
                            from={{ opacity: 0, marginTop: -50 }}
                            to={{ opacity: 1, marginTop: 0 }}
                        >
                            {props => (
                                <div style={props}>



                                    <div className="card border-light mb-3">
                                        <div className="card-header"
                                            style={{ textAlign: "center", backgroundColor: "#33bfaa", color: "#ffffff" }}>
                                            Provide Your Taxpayer Identification Number Informations
                                    </div>
                                        <div className="card-body" >
                                            <form onSubmit={this.onSubmit}>

                                            <div className="form-group">
                                                    <label htmlFor="uploadTinFile">Provide TIN Image</label>
                                                    <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" id="uploadTinFile" aria-describedby="fileHelp"></input>
                                                    
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="tin">TIN:</label>
                                                    <input type="text" placeholder="TIN" onChange={this.onChangeTin} className="form-control" id="indivtin" ></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="taxesCircle">Taxes Circle:</label>
                                                    <input type="text" placeholder="Taxes Circle" onChange={this.onChangeTaxesCircle} className="form-control" id="taxesCircle"></input>
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="taxesZone">Taxes Zone:</label>
                                                    <input type="text" placeholder="Taxes Zone" onChange={this.onChangeTaxesZone} className="form-control" id="taxesZone" ></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="name">Name:</label>
                                                    <input type="text" placeholder="Name" onChange={this.onChangeName} className="form-control" id="name" ></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="fatherName">Father Name:</label>
                                                    <input type="text" placeholder="Father Name" onChange={this.onChangeFatherName} className="form-control" id="fatherName" ></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="motherName">Mother Name:</label>
                                                    <input type="text" placeholder="Mother Name" onChange={this.onChangeMotherName} className="form-control" id="motherName" ></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="currentAddress">Current Address:</label>
                                                    <input type="text" placeholder="Current Address" onChange={this.onChangeCurrentAddress} className="form-control" id="currentAddress"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="permanentAddress">Permanent Address:</label>
                                                    <input type="text" placeholder="Permanent Address" onChange={this.onChangePermanentAddress} className="form-control" id="permanentAddress"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="previousTin">Previous TIN No:</label>
                                                    <input type="text" placeholder="Previous TIN No" onChange={this.onChangePreviousTin} className="form-control" id="previousTin"></input>
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="status">Status:</label>
                                                    <input type="text" placeholder="Status" onChange={this.onChangeStatus} className="form-control" id="pwd" ></input>
                                                </div> */}
                                                <div className="form-group">

                                                    <label htmlFor="status">Status:</label>&nbsp;&nbsp;
                                                    <select id="status" className="custom-select" value={status} name={this.props.name} onChange={this.onChangeStatus}>

                                                        <option value="Individual">Individual</option>

                                                    </select>



                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="date">Date:</label>
                                                    <DayPickerInput onDayChange={this.handleDayChange} />
                                                </div>

                                               
                                                <small id="fileHelp" className="form-text text-muted" >
                                                        <i style={{ color: "#33bfaa" }} className="fas fa-exclamation-circle"></i>&nbsp;
                                            Before submitting form, please check all your provided information again.</small>
                                            <br/>
                                                <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#33bfaa" }}>Submit</button>
                                                <br />
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </Spring> : null}








                </div>






            </div >
        );
        return (
            <div>
                {loading ? <Loading message="TIN records will be inserted in few minutes" /> : tindata}
            </div>

        )
    }
}

export default TinForm;