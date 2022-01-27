const {convertDate} = require('./sanitizeJson')
const {Plan} = require('./plan.class')


let normalize = async (plans, planIds) => {

    let resp = []
    let total = plans.length;
    let count =0;

    for(let plan of plans) {

        if(plan["Plan ID"] == 0) continue;
        count++;
        if(!planIds[parseInt(plan["Plan ID"])]) {
            console.log("couldnt find PlanId "+plan["Plan ID"]+" . Stopped at "+count+" out of "+total)
            continue;
        }

        let schedule = planIds[parseInt(plan["Plan ID"])].description;

        let date = planIds[parseInt(plan["Plan ID"])].date;

        // if(date != planIds[parseInt(plan["Plan ID"])].date) throw "different date"

        let itemNumber = parseInt(plan["SKU Number"])

        let forecastedQty = parseInt(plan["Forecast Qty"])

        let storeNumber = parseInt(plan["Store"])

        let productionArea = parseInt(plan["Production Area"])

        let normPlan = new Plan(storeNumber, null, null, date, schedule, itemNumber, null, forecastedQty,null,productionArea)

        resp.push(normPlan)


        
    }

    return resp;

}

module.exports = {normalize}