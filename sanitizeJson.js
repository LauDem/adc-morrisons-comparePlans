// var moment = require('moment')

let sanitize = async (array) => {

    for(let elem of array) {

        for(let key in elem) {

            let test = elem[key]
            // console.log(test)

            while(test.includes('"') || test.includes('=')) {
                // console.log("looping")
                test = test.replace('"','')
                test = test.replace('=','')
        
            }

            elem[key] = test;

            // console.log(test)
        
        }
        
        // console.log(array[0])
        
    }

    return array;


}

let convertDate = (string) => {
    let arr = string.split(" ");
    // return moment(arr[0])
    arr = arr[0].split("/");
    return arr[2]+"-"+arr[0]+"-"+arr[1]
}


let recompile = async (array) => {

    let resp = {};


    for(let elem of array) {
        resp[parseInt(elem["Plan ID"])] = {
            date : convertDate(elem["Date/Time"]),
            description: elem["Description"]
        }
    }

    // console.log(resp)
    return resp;
}

module.exports = {sanitize, recompile, convertDate}