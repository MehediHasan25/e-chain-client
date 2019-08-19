function fileValidate(id, fileSizeInBytes, fileFormats) {
    let file = document.getElementById(id);
    if(file.files[0]) {
        if(file.files[0].size < fileSizeInBytes) {
            if(fileFormats.indexOf(file.files[0].type) !== -1) {
                console.log("file validated");
                return true;
            }
            else {
                throw Error("File format unsupported");
            }
        }
        else {
            throw Error("File size exceeded");
        }
    }
    else {
        throw Error("No file Selected");
    }
}

module.exports={
    fileValidate: fileValidate
}