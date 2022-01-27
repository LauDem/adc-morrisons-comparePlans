var moment = require('moment');

let flatten = async (plans, prodArea = null) => {

    let response = [];

    for(let plan of plans) {

        for(let item of plan.planItems) {

            let flatPlan = {
                storeNumber : plan.storeNumber,
                storeName : plan.storeName,
                planId : plan.planID,
                date : moment(plan.scheduledDateTime).format("YYYY-MM-DD"),
                schedule : plan.planDescription,
                itemNumber: item.itemNumber,
                itemDescription: item.itemDescription,
                forecastedQty: item.forecastedQty,
                modifiedQty: item.modifiedQty
            }

            if(prodArea) flatPlan.productionArea = prodArea;




            response.push(flatPlan)
        }
    }
    return response;
}

let toCsv = async (array) => {

    let str = "sep=;\r\n\r\n";


    for(let column of Object.keys(array[0])) {
        str += '"'+ column +'";'
        // str = str + ";"
    }

    str +=  "\r\n"

    for(let i=0; i < array.length ; i++) {

        for(let column of Object.keys(array[0])) {

            str += '"'+ array[i][column] +'";';
            // str += ";";

        }

        str += "\r\n"
    
    }

    return str;

}

module.exports = {flatten, toCsv}