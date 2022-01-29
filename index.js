let config = require("./config.json")
const checkServiceStatus = require("./util");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function Init() {
    console.log("user: " + config.Owner)
    const keys = Object.values(config.Siteids);
    let i = 0, length = keys.length;
    for (; i < length; i++) {
        console.log("Checking site ID: " + keys[i]);
        checkServiceStatus(keys[i], config.webhook)
        console.log("Site Checked: Waiting 30 seconds till next check");
        await delay(5000)
    }
}

Init().then(r => console.log);
