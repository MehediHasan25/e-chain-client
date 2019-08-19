import React, { Component } from 'react';
//import Axios from 'axios';
import axios from 'axios';
import cookie from "./utils/cookie";
import { createAccount } from "./Url/User";
import { Redirect } from 'react-router-dom';

class Pin extends Component {
  state = {
    pin: '',
    pinValidation: false,
    objId: '',
    errors: {}
  }

  componentWillMount() {
    document.title = 'Pin';
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  onSubmit = async (e) => {
    e.preventDefault();

    const { pin } = this.state;

    if (pin === '') {
      this.getPinError = "**please enter the pin";
      this.setState({ pinValidation: true });
      return;
    } else if (pin.length < 4) {
      this.getPinError = "** pin must be 4 characters";
      this.setState({ pinValidation: true });
      return;
    } else if (pin.length > 4) {
      this.getPinError = "** pin must be 4 characters";
      this.setState({ pinValidation: true });
      return;
    }
    const objectId = this.getCookie('userId');
    //console.log(objectId);

    const newobj = {
      pin,
      userId: objectId
    }
    // console.log(newobj);
    //console.log(pin);
    // console.log(objectId);
    try {
      // let res = await axios.post(`http://localhost:4000/user/create-account`,newobj);
      //CreateAccount
      let res = await axios.post(createAccount, newobj);
     // console.log(res.data);
     // console.log(res.status);
      cookie.setCookie('userId', null, -1);
      // this.props.history.replace('/newlogin');
      this.props.history.replace('/newlogin');
    }
    catch (error) {
      // if(error.response){
      //   alert(error.response.data.message);
      // }
      // else {
      //   alert("Error connecting");
      // }
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
      else if (error.request){
        console.log(error.request);
        alert("Error Connecting");
      }
      else {
          console.log('Error', error.message);
          alert(error.message)
      }


    }

    

    ////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    // try {
    //     let r = await axios.post('/get-all', { id: 1 });
    //     console.log(r.data);
    //     console.log(r.status);
    //     alert(r.data.message);
    // }
    // catch (ex) {

    //     if (ex.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         if (ex.response.status === 400 || ex.response.status === 401) {
    //             console.log(ex.response.data);
    //             alert(ex.response.data.message)
    //         }
    //         else if (ex.response.status === 404) {
    //             alert("Not found");
    //         }
    //         else if (ex.response.status === 500) {
    //             alert(ex.response.data.message)
    //         }
    //     }
    //     else if (ex.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log(ex.request);
    //         alert("Error connecting");
    //     }
    //     else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', ex.message);
    //         alert(ex.message);

    //     }

    // }
    //////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////


    // let res = await axios.post(`http://localhost:4000/user/create-account`,newobj);
    // console.log(res.data);


    // fetch(`http://localhost:4000/user/create-account`, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(newobj), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(async response => {
    //     if (response.status === 400) {
    //       let error = await response.json();
    //       this.getPinError = "**" + error.message;
    //       // console.log(error.message);
    //       this.setState({ pinValidation: true });
    //     }
    //     else if (response.status === 401) {
    //       let error = await response.json();
    //       this.getPinError = "**" + error.message;
    //       //console.log(error.message);
    //       this.setState({ pinValidation: true });
    //     }
    //     else if (response.status === 500) {
    //       let error = await response.json();
    //       this.getPinError = "**" + error.message;
    //       //console.log(error.message);

    //     }
    //     else if(response.status === 200){
    //       cookie.setCookie('userId', null, -1);
    //       this.props.history.replace('/newlogin');
    //     }
    //     else {
    //         alert("Unknown error:", response.status);
    //     }

    //   })
    //   .catch(error => alert('Error:', error.response.data.message));



  }

  onChangePin = e => {
    this.setState({ pin: e.target.value, pinValidation: false });
  }

  // handlePin = e => {
  //   this.setState({ pinValidation: false })
  // }

  render() {
    const { pin, errors } = this.state;

    if (cookie.getCookie("x-auth-token") !== "" && cookie.getCookie("username") !== "") {
      return <Redirect to='/dashboard' />
  }else if (cookie.getCookie('userId') === "") {
      return <Redirect to='/' />


    }
    return (
      <div className="container">
        <div style={{ marginLeft: "auto", marginRight: "auto" }} className="col-sm-6 border border-light p-5">

          <form onSubmit={this.onSubmit}>
            <br /> <br />

            <p className="h4 mb-4 text-center" style={{ color: "#00cccc" }}>Pin</p>

            <i style={{ color: 'red', textAlign: "right" }}>{this.state.pinValidation === true ? this.getPinError : ""}</i>
            <input label="Pin" name="pin" type="text" placeholder="Pin Number" value={pin} onChange={this.onChangePin} error={errors.pin} id="defaultLoginFormpin" className="form-control mb-4 border border-primary" style={{ height: "50px" }} onClick={this.handlePin}></input>

            <button className="btn btn-info btn-block my-4" type="submit" style={{ backgroundColor: "#00cccc" }}>Submit</button>

            <p style={{ textAlign: "center", color: "#00cccc" }}> <i className="fas fa-mobile-alt">  Please Check your phone for pin </i>  </p>

          </form>
        </div>
      </div>
    );
  }
}

export default Pin;