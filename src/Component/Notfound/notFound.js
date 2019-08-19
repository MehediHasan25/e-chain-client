import React from 'react';


const notFound = () => {
    return ( 
        // <div>
        //     <h1 style={{color: "red"}}> This  link is not found </h1>
        // </div>

        <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <br/> <br/> <br/> <br/> <br/>
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
            </div>
        </div>
    </div>
</div>
     );
}
 
export default notFound;