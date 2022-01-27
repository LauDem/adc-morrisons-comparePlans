const {getPlans} = require("./getApiPlans");
const {flatten, toCsv} = require('./flattenToCsv');
const {writeFile} = require("./writeFile");
const {sanitize, convertDate, recompile} = require('./sanitizeJson')
const { normalize } = require("./normalize");
const {missingPlans, missingItems, differentForecast, differenceSummary} = require("./compare")

var moment = require('moment');
const csv=require('csvtojson')
const fs = require('fs');


(async () => {

    /*

    LOAD V1

    */


    let v1Plans = await csv().fromFile("./input/1x.plans.csv")
    // let v1Plans = await csv().fromFile("./input/1x.from1210to1910.completed.plans.csv")

    writeFile("./output2/v1.plans.json", v1Plans)

    let v1PlanIds = await csv().fromFile("./input/1x.plan.ids.csv");
    v1PlanIds = await sanitize(v1PlanIds)
    v1PlanIds = await recompile(v1PlanIds)

    v1Plans = await normalize(v1Plans, v1PlanIds)


    writeFile("./output2/v1.plans.json", v1Plans)
    let str = await toCsv(v1Plans)
    fs.writeFile("./output2/1x.plans.csv", str, null, ()=>{console.log("--------------")})

    console.log(v1Plans.length , " planItems found in v1")


    
    /*

    LOAD V2

    */    
    
    
    let v2Plans = await getPlans("X7MD","uat", {FromDate : "2021-10-17", ToDate : "2021-10-20", Stores: [171], ProductionAreas: [265,273,390,392]});

    fs.writeFileSync("./output2/v2.plans.json", JSON.stringify(v2Plans, null, 4));
    str = await toCsv(v2Plans)
    fs.writeFile("./output2/2x.plans.csv", str, null, ()=>{console.log("--------------")})

    console.log(v2Plans.length, " planItems found in v2")


    /*
    
    COMPARE BOTH
    
    */


    let summary = await differenceSummary(v1Plans, v2Plans)

    // for(let elem of summary)

    let stamp = Date.now();

    let filename ="./output2/comparison."+stamp;

    let csvSummary = await toCsv(summary);

    writeFile(filename+".json", summary)

    fs.writeFile(filename+".csv", csvSummary, null, ()=>{console.log("--------------")})

    return;

    missingPlansInV2 = await missingPlans(v2Plans, v1Plans)
    missingPlansInV1 = await missingPlans(v1Plans, v2Plans)

    writeFile("./output2/missingPlansInV1.json",missingPlansInV1)

    // console.log("missing plans v2 : ",missingPlansInV2.length, "missing plans v1 : ", missingPlansInV1.length)

    missingItemsInV2 = await missingItems(v2Plans, v1Plans)

    missingItemsInV1 = await missingItems(v1Plans, v2Plans)

    

    str = await toCsv(missingItemsInV1)
    fs.writeFile("./output2/2x.missing.plans.csv", str, null, ()=>{console.log("--------------")})
    

    console.log("PlanItems present v1 but not in v2: ", missingItemsInV1.length, "PlanItems present v2 but not in v1 : ",missingItemsInV2.length)

    let forecastDif = await differentForecast(v2Plans, v1Plans)

    str = await toCsv(forecastDif)
    fs.writeFile("./output2/2x.differentCast.plans.csv", str, null, ()=>{console.log("--------------")})

    // missingItemsInV1 = await diffe(v1Plans, v2Plans)
    console.log("PlanItems present in both v1 and v2, but with different forecast : ", forecastDif.length)
    // console.log(forecastDif)

    let deltas = []
    let items = {};

    for(let diff of forecastDif) {

        let v1 = diff["v1_forecast"]
        let v2 = diff["v2_forecast"]

        let delta = v1 - v2;

        deltas.push(delta);

        items[String(delta)] = diff

    }

    deltas.sort()
    // console.log(deltas)




    return;


    let csvPlans = await toCsv(flatPlans)

    writeFile("./output/2x.flatPlans.json", flatPlans)

    // writeFile("./output/2x.plans.untilToday.csv", csvPlans)

    fs.writeFile("./output/2x.plans.untilToday.csv", csvPlans, null, ()=>{console.log("--------------")})

    let test = v1PlanIds[0]["Plan ID"]


    console.log(test)

    

})()