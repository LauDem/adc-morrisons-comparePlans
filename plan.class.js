class Plan {
    
    constructor(
        storeNumber, storeName = null, planId =null, date, schedule, itemNumber, itemDescription = null, forecastedQty, modifiedQty = null, productionArea
    ) {
        this.storeNumber    =  storeNumber
        this.storeName      = storeName
        this.planId         =planId
        this.date           =date
        this.schedule       =schedule
        this.itemNumber     =itemNumber
        this.itemDescription=itemDescription
        this.forecastedQty  =forecastedQty
        this.modifiedQty    =modifiedQty
        this.productionArea =productionArea
    }

    equals(other) {
        if(!other instanceof Plan) throw "cannot compare. Instance of plan required"

        return (
            this.storeNumber == other.storeNumber 
            // && this.itemNumber == other.itemNumber 
            && this.productionArea == other.productionArea
            && this.date == other.date
            && this.schedule == other.schedule

            )
    }

}

module.exports = {Plan};