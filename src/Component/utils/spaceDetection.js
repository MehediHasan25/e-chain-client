export function spaceUsername(username) {
    const inValid = /\s/;
   // const inValid= new RegExp(/^[a-z0-9_$#@-]{3,30}$/);
    const output = inValid.test(username);
    return output;
}

// export function spacePassword(fieldname) {
//     //const inValid = /\s/;
//     const inValid= /^[a-z0-9_$#@-]{8,100}$/;
//     const output = inValid.test(fieldname);
//     return output;
// }

// export function spaceConfirmPassword(fieldname) {
//     //const inValid = /\s/;
//     const inValid= /^[a-z0-9_$#@-]{8,100}$/;
//     const output = inValid.test(fieldname);
//     return output;
// }

// export function spaceMobile(fieldname) {
//     //const inValid = /\s/;
//     const inValid= /^[(01)]\d{10}$/;
//     const output = inValid.test(fieldname);
//     return output;
// }




// module.exports={
//     spaceDetect:spaceDetect
// }