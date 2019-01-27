const date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();

const getCurrentDay = () => {

    var returnstring = day +"/"+month+"/"+year;
    return returnstring;
}
const getNextYear = ()=>{
    var nextYear = year + 1;
    var returnstring = day +"/"+month+"/"+nextYear;
    return returnstring;
}

const tickToDate = (str)=>{
    return Date.parse(str);
}

export {getCurrentDay, getNextYear, tickToDate};
