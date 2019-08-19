import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import './App.css';
import PrivateRoute from "./Component/ProtectedRoute/PrivateRoute";
import ProtectRoute from "./Component/ProtectedRoute/ProtectRoute";
import Signup from './Component/Signup';
import Pin from './Component/Pin';
import Login from './Component/Login';
//import Landingpage from './Component/Landingpage';
// import Nidform from './Component/Nidform';
// import TinForm from './Component/TinForm';
import Newlogin from './Component/Newlogin';
import Greetings from './Component/Greetings';
import Allinfo from './Component/Allinfo';
import Dashboard from './Component/Dashboard';
import Profile from "./Component/Profile";
import ChangePassword from './Component/Password/ChangePassword';
// import UpdateNid from './Component/Update/UpdateNid';
import UpdateTin from './Component/Update/UpdateTin';
import UpdateNid1 from './Component/Update/UpdateNid1';
import UpdatePage from './Component/Update/UpdatePage';
import QRpage from './Component/QRCode/QRpage';
import logPage from './Component/Logfile/logPage';
import notFound from "./Component/Notfound/notFound";






class App extends Component {
  state = {  }
  render() { 
    return ( 
      // <div className="App">
      // <Signup/>
      // </div>
      <Router>
      <div className="App"
      style={{backgroundColor:"#fcfcfc", marginBottom:"30px"}}>
      
      <div className= "container">
      <Switch>
           <Route exact path="/" component={Signup}/>
           
           <PrivateRoute exact path="/pin" component={Pin}/>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/newlogin" component={Newlogin}/>
           {/* <Route exact path="/landingpage" component={Landingpage}/> */}
           {/* <Route exact path="/nidform" component={Nidform}/>
           <Route exact path="/tinform" component={TinForm}/> */}
           <ProtectRoute exact path="/greetings" component={Greetings}/>
           <ProtectRoute exact path="/allinfo" component={Allinfo}/>
           <ProtectRoute exact path="/dashboard" component={Dashboard}/>
           <ProtectRoute exact path="/profile" component={Profile}/>
           <ProtectRoute exact path="/changepass" component={ChangePassword}/>
           {/* <Route exact path="/updatenid" component={UpdateNid}/> */}
           <ProtectRoute exact path="/updatenid1" component={UpdateNid1}/>
           <ProtectRoute exact path="/updatetin" component={UpdateTin}/>
           <ProtectRoute exact path="/updatepage" component={UpdatePage}/>
           <ProtectRoute exact path="/qrpage" component={QRpage}/>
           <ProtectRoute exact path="/logpage" component={logPage}/>
           <Route exact path="/notfound" component={notFound}/>
           <Redirect to="notfound"/>
           </Switch>
        </div>
      </div>
      </Router>
     );
  }
}
 
export default App;

