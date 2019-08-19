const joi = require("@hapi/joi");


const setNidJoiSchema = {
    name: joi.string().min(3).max(50).required(),
    fatherName: joi.string().min(3).max(50).required(),
    motherName: joi.string().min(3).max(50).required(),
    pob: joi.string().min(3).max(20).required(),
    dob: joi.date().required(),
   // nidNo: joi.string().min(10).max(20).regex(/^[0-9]{10,13,17}$/).required(),
     nidNo: joi.string().min(10).max(20).regex(/^[0-9]*$/).required(),
   // nidNo: joi.string().min(10).max(17).regex(/^(\d{10}|\d{13}|\d{17})$/).required(),
     // nidNo: joi.string().min(10).max(20).regex(/^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/).required(),
    bloodGroup: joi.string().min(2).max(3).allow([null, '']),
    issueDate: joi.date().required(),
    address: joi.string().min(10).max(250).required()
}







module.exports ={
    setNidJoiSchema: setNidJoiSchema
}
