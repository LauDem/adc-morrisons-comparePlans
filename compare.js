const {Plan} = require('./plan.class')

let find = (item, plans) => {

    let needle = String([item.storeNumber,item.productionArea,item.date,item.schedule, item.itemNumber])

    for(let elem of plans) {

        let haystack = String([elem.storeNumber,elem.productionArea,elem.date,elem.schedule, elem.itemNumber])

        if(needle == haystack) {
            return elem;
            break;
        }

    }
}

let plan = (plan1, plan2) => {

    if(plan2.storeNumber == plan1.storeNumber 
        && plan2.productionArea == plan1.productionArea
        && plan2.date == plan1.date
        && plan2.schedule == plan1.schedule) {
            return true;
            
        }

}

let items = (plan1, plan2) => {

    if(plan2.itemNumber == plan1.itemNumber 
        && plan(plan1, plan2)) {
            return true;
            
        }

}

let forecast = (p1, p2) => {
    if(items(p1,p2) && p1.forecastedQty == p2.forecastedQty) return true;
    // throw(p2.forecastedQty)
}


let compare = async (plans1, plans2, callback, withItems = false, withForecast = false) => {

    var resp = [], current = "";

    for(let plan1 of plans1) {

        let found = false

        if(String([plan1.storeNumber,plan1.productionArea,plan1.date,plan1.schedule]) == current) continue;
        

        for(let plan2 of plans2) {

            try{
                if(callback(plan1,plan2)) {
                    found =true;
                    break;
                }
    
            } catch(e) { var qty = e}
        }

        if(!found) {
            let notFound = {
                storeNumber: plan1.storeNumber,
                productionArea:plan1.productionArea,
                date:plan1.date,
                schedule:plan1.schedule
            }
            if(withItems) {
                notFound.itemNumber = plan1.itemNumber
                notFound['v1_forecast'] = plan1.forecastedQty
            }
            if(withForecast) {
                notFound['v1_forecast']=plan1.forecastedQty
                let other = find(plan1,plans2)
                notFound['v2_forecast'] = other.forecastedQty
            }
            resp.push(notFound)
            current = String(notFound)
            // continue;
        }
    }

    return resp;


}

let missingPlans = (plans1, plans2) => {
    return compare(plans1, plans2, plan)
}

let missingItems = async (plans1, plans2) => {

    return compare(plans1, plans2, items, true)

}

let differentForecast = async (plans1, plans2) => {
    return compare(plans1, plans2, forecast, true, true)
}

let differenceSummary = async (plans1, plans2) => {

    result = {}
    let i =0;

    for(let item of plans1) {
        let key = String([item.storeNumber,item.productionArea,item.date,item.schedule, item.itemNumber])

        item.v1_forecast = item.forecastedQty;
        item.v2_forecast = "n/a"
        delete item.forecastedQty

        result[key] = item;
    }

    console.log(Object.keys(result).length, "inserted to result after v1 loop")

    for(let item of plans2) {

        let key = String([item.storeNumber,item.productionArea,item.date,item.schedule, item.itemNumber])

       

        if(!result[key]) {

            item.v2_forecast = item.forecastedQty;
            item.v1_forecast = "n/a"
            delete item.forecastedQty
    
            result[key] = item;

            continue;
    
        }
        i++

        try{
            result[key].v2_forecast = item.forecastedQty;
        } catch(e) {
            console.log("plan no tin v1",key)
        }
        
        // result[key].v1_forecast = "n/a"
        // delete result[key].forecastedQty

    }

    console.log(Object.keys(result).length, "in result after v2 loop")

    console.log(i, "common results")

    for(let key in result) {

        if(!response) var response = [];
        response.push(result[key])

    }

    return response;
}

module.exports = {differenceSummary,missingPlans, missingItems, differentForecast}