import React from 'react';
import send from '../ProImage/send.png';
const Spinner = (props) => {

  return (
    <div>
      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="text-center">
        <p>{props.message}</p>
      </div> */}
      <br /> <br />
      <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
         Transaction has been submitted to E-Chain. You will be notified shortly.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <img src={send}
          style={{ maxWidth: "15%", cursor: "pointer" }}
          className=" img-fluid" id="spinnerpic" alt="spinnerpic" />

      </div>
    </div>

  );
};

export default Spinner;