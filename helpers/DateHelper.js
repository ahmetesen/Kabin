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

const getNextMonth = ()=>{
    var nextMonth = 0;
    if(month == 12){
        var nextMonth = 0;
        var nextYear = year + 1;
        var returnstring = day +"/"+nextMonth+"/"+nextYear;
    }
    else{
        var nextMonth = month +1;
        var returnstring = day +"/"+nextMonth+"/"+year;
    }
    return returnstring;
}

const tickToDate = (str)=>{
    return Date.parse(str);
}

export {getCurrentDay, getNextYear, getNextMonth, tickToDate};
