import React, { Component } from 'react';
import dateFormatConverter from '../utils/dateFormatConverter';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import cookie from "../utils/cookie";
import ImageConversion from '../utils/ImageConversion';
import axios from 'axios';

class UpdateNid extends Component {
    state = {
        name:'',
        fatherName:'',
        motherName:'',
        pob: '',
        dop:'',
        nidNo:'',
        bloodGroup:'',
        issueDate: '',
        address: '',
        nidImage:''
    }

    componentDidMount(){
       
        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        axios.get(`http://localhost:4000/nid/get-nid`,config)
        .then(res =>{
           // console.log(res);
            let base64Flag = 'data:image/jpeg;base64,';
            let imageBuffer = res.data.nidImage.data.data;
            let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
            let convertImageFlag = base64Flag + imageString;
            //console.log(convertImageFlag.data);
           // console.log(typeof(imageString));
            this.setState({
                name: res.data.nidData.name,
                 fatherName: res.data.nidData.fatherName,
                 motherName:res.data.nidData.motherName,
                 pob:res.data.nidData.pob,
                 dob: res.data.nidData.dob,
                 nidNo: res.data.nidData.nidNo,
                 bloodGroup: res.data.nidData.bloodGroup,
                 issueDate:res.data.nidData.issueDate,
                 address:res.data.nidData.address,
                nidImage: convertImageFlag
            });
        
        })
        .catch(err => console.log(err.response.data.message));

    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

//     componentWillUpdate(){
//         this._isMounted = true;

//             console.log(true);

//             const config = {
//                 headers: {
//                     "x-auth-token": cookie.getCookie("x-auth-token")
//                 }
//             }
    
    
//             axios.get(`http://localhost:4000/nid/get-nid`,config)
//             .then(res =>{
//                 if (this._isMounted) {
//                console.log(res);
//                 let base64Flag = 'data:image/jpeg;base64,';
//                 let imageBuffer = res.data.nidImage.data.data;
//                 let imageString = ImageConversion.arrayBufferToBase64(imageBuffer);
//                 let convertImageFlag = base64Flag + imageString;
//                 //console.log(convertImageFlag.data);
//                // console.log(typeof(imageString));
//                 this.setState({
//                     name: res.data.nidData.name,
//                      fatherName: res.data.nidData.fatherName,
//                      motherName:res.data.nidData.motherName,
//                      pob:res.data.nidData.pob,
//                      dob: res.data.nidData.dob,
//                      nidNo: res.data.nidData.nidNo,
//                      bloodGroup: res.data.nidData.bloodGroup,
//                      issueDate:res.data.nidData.issueDate,
//                      address:res.data.nidData.address,
//                     nidImage: convertImageFlag
//                 });
//             }
//             })
//             .catch(err => console.log(err.response.data.message));
    
        
        
// }

    onSubmit = e => {
        e.preventDefault();
        const { name, fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address, nidImage } = this.state;
        
        
        const formData = new FormData();
            formData.append('name', name);
            formData.append('fatherName', fatherName);
            formData.append('motherName', motherName);
            formData.append('pob', pob);
            formData.append('dob', dob);
            formData.append('nidNo', nidNo);
            formData.append('bloodGroup', bloodGroup);
            formData.append('issueDate', issueDate);
            formData.append('address', address);
            formData.append('nidImage', nidImage);
       

        const config = {
            headers: {
                "x-auth-token": cookie.getCookie("x-auth-token")
            }
        }

        axios.post(`http://localhost:4000/nid/set-nid`, formData, config)
        .then( res =>{
           // console.log(res);
            alert("Succesfully update");
            this.props.history.push("/profile");
        })
        .catch(error => alert(error.response.data.message));



    }

    onChangeName = e => this.setState({name: e.target.value});
    onChangeFatherName = e => this.setState({fatherName: e.target.value}); 
    onChangeNidNo = e => this.setState({nidNo: e.target.value});
    onChangeMotherName = e => this.setState({motherName: e.target.value});
    onChangePob = e => this.setState({pob: e.target.value});
    handleBloodChange = e => {
        this.setState({ bloodGroup: e.target.value });
    }
    onChangeIssueDate = e => this.setState({issueDate: e.target.value});
    onChangeAddress = e => this.setState({address: e.target.value});

    fileSelectedHandler = event => {
        this.setState({
            nidImage: event.target.files[0]
            //nidImage: URL.createObjectURL(event.target.files[0])
        })
    }


    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        //  console.log(input.value);
        try {
            const niddateConvert = dateFormatConverter.getNidFormat(input.value);
            this.setState({ dob: niddateConvert });
        }
        catch (ex) {
            console.log(ex);
        }

        //console.log(niddateConvert);
        // console.log(selectedDay);

    }


    render() {
        const { name, fatherName, motherName, pob, dob, nidNo, bloodGroup, issueDate, address } = this.state;
        return (
            <div className="container">
                <div>
                    <h3 style={{ textAlign: "center", color: "#33bfaa"}}> Update Nid Information</h3>
                    </div>
                    <form onSubmit={this.onSubmit}>

                    <div className="row justify-content-between">
                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_name">Name:</label>
                        <input  type="text" placeholder="Name" onChange={this.onChangeName} value={name}  className="form-control" id="nidname" ></input>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group">
                                            <div>
                                                <p>Date of Birth</p>&nbsp;&nbsp;
                                        
                                                <DayPickerInput  value={dob} onDayChange={this.handleDayChange} />
                                            </div>
                                            
                                        </div>



                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_fathername">Father Name:</label>
                        <input  type="text" placeholder="Father Name" name={fatherName} value={fatherName} onChange={this.onChangeFatherName} className="form-control" id="nidfathername" ></input>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_no">NID No:</label>
                        <input  type="text" placeholder="NID No" name={nidNo} value={nidNo}onChange={this.onChangeNidNo} className="form-control" id="nidno" ></input>
                        </div>
                        </div>
                        
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_name">Mother Name:</label>
                        <input  type="text" placeholder="Mother Name" name={motherName} value={motherName} onChange={this.onChangeMotherName} className="form-control" id="nidmothername" ></input>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group">

                                            <label htmlFor="blood">Blood Group:</label>&nbsp;&nbsp;
                                            <select id="nidblood" className="custom-select"  value={bloodGroup} name={this.props.name} onChange={this.handleBloodChange.bind(this)} >
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
                        </div>
                        
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_pob">Place of Birth:</label>
                        <input  type="text" placeholder="Place of Birth" name={pob} value={pob} onChange={this.onChangePob} className="form-control" id="nidplaceofbirth" ></input>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group ">
                        <label htmlFor="nid_issuedate">Issue Date:</label>
                        <input  type="text" placeholder="NID Issue Date" name={issueDate} value={issueDate} onChange={this.onChangeIssueDate} className="form-control" id="nidissuedate"></input>
                        </div>
                        </div>
                        
                    </div>

                    <div className="row">
                    <div className="col-md-12">
                        <div className="form-group ">
                        <label htmlFor="nid_address">Address:</label>
                        <input  type="text" placeholder="Address" name={address} value={address} onChange={this.onChangeAddress} className="form-control" id="nidaddress" ></input>
                        </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Update NID Image</label>&nbsp;&nbsp;
                                            <input type="file"  onChange={this.fileSelectedHandler} className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" ></input>
                                            <br />

                                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="form-group ">
                        <img src={this.state.nidImage} className="rounded" alt="NID" id="nidImage" height="200px" width="250px" />
                        </div>
                        </div>
                        
                    </div>
                        

                    <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#00cccc" }}>Update</button>
                    </form>

            </div>
        );
    }
}

export default UpdateNid;