

var fullMonthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var shortMonthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getTinFormat(yyyy_mm_dd) {
    let date = yyyy_mm_dd.split('-');
    let year = date[0], month = date[1], day = date[2];
    let monthStr = fullMonthsName[parseInt(month - 1)];
    let formattedDate = monthStr + " " + day.toString() + ", " + year.toString();
    return formattedDate;
}

function getNidFormat(yyyy_mm_dd) {
    let date = yyyy_mm_dd.split('-');
    let year = date[0], month = date[1], day = date[2];
    let monthStr = shortMonthsName[parseInt(month - 1)];
    let formattedDate = day.toString() + " " + monthStr + " " + year.toString();
    return formattedDate;
}

function getNidIssueDateFormat(yyyy_mm_dd){
    let date = yyyy_mm_dd.split('-');
    let year = date[0] , month = date[1], day = date[2];
    let monthStr = shortMonthsName[parseInt(month -1)];
    let formattedDate = day.toString() + " " + monthStr + ", " + year.toString();
    return formattedDate;
}


// console.log(getTinFormat("1996-03-10"));
// console.log(getNidFormat("1996-04-10"));

module.exports = {
    getNidFormat: getNidFormat,
    getTinFormat: getTinFormat,
    getNidIssueDateFormat: getNidIssueDateFormat
}