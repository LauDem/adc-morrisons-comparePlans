const http = require ('axios');
const {Builder} = require("./config/builder");
const {flatten, toCsv} = require('./flattenToCsv');


const fs = require('fs')

let getPlans = async(tenant = "X7MD", env = "uat", filter = {FromDate : "2021-10-12", ToDate : "2021-10-21", Stores: [8], ProductionAreas: [390,392]}) => {

    let builder = new Builder("X7MD", {uat : true})

    let conf = builder.getHeaders("production");
    // console.log(conf)

    let url = builder.getUrl("GetFinalizedProductionPlanItems")

    let resp = []

    for(let store of filter.Stores){    

        for(let prodArea of filter.ProductionAreas){

            // console.log(prodArea)

            try {
                let apiPlans = await http.post(url, {FromDate : filter.FromDate, ToDate : filter.ToDate, Stores: [store], ProductionAreas: [prodArea]}, conf)
                var plans = await flatten(apiPlans.data, prodArea)
            } catch(error){
                console.log(error, Object.keys(error));
                fs.writeFileSync("./logs/getPlans."+prodArea+".errors.json", JSON.stringify(error, null, 4));
            }

            // for(let plan of plans) {
            //     plan['productionArea'] = prodArea;
            //     plan['scheduledDateTime'] = moment(plan.scheduledDateTime).format("YYYY-MM-DD")

            //     console.log(plan.productionArea)
            // }

            resp.push(...plans)

        }
    }    
// fs.writeFileSync("./output/2x.plans.untilToday.json", JSON.stringify(plans, null, 4));
    // fs.writeFileSync("./output/2x.plans.REMASTERED.json", JSON.stringify(resp, null, 4));


    // console.log(plans);

    // return plans;
    return resp;

}

module.exports = {getPlans}
