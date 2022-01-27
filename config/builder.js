const {api, uat} = require('./config');

class Builder {

    constructor(tenant = "X7MD", options) {
        this.tenant = tenant;
        this.uat = options["uat"]
    }

    getHeaders(module)  {

        this.module = module;

        // console.log(this)

        let headers = {
            'X-Tenant': this.tenant,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': this.uat ? uat[module].keys : api[module].keys
        }    

        return {headers : headers}
    }

    getUrl(endpoint) {

        // console.log(this)
    
        return this.uat ? uat[this.module].endpoint[endpoint] : api[this.module].endpoint[endpoint]
    }
    


}

let buildHeaders = (tenant = 'X7MD', module, test=false) => {

    return {
        'X-Tenant': tenant,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': test ? uat[module].keys : api[module].keys
    }

}

let buildUrl = (tenant = 'X7MD', module, key, test=false) => {
    
    return test ? uat[module].endpoint[key] : api[module].endpoint[key]
}

module.exports = {Builder}