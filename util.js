const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require = require('esm')(module)

function sendToWebhook(id, json, webhookreturn) {
    const embed = {
        "username": "UDW",
        "avatar_url": "https://discordbots.org/images/dblnew.png",
        "embeds": [
            {
                "author": {
                    "name": "User-defined Webhook",
                    "icon_url": "https://discordbots.org/images/dblnew.png"
                },
                "title": `${json.name}`,
                "color": 15258703,
                "fields": [
                    {
                        "name": "Last Site Check",
                        "value": `${json.updated_at}`,
                        "inline": true
                    },
                    {
                        "name": "Amount of time online over 24 hours",
                        "value": `${json.online_24_hours}%`,
                        "inline": false
                    },
                    {
                        "name": "Online",
                        "value": `${json.online}`,
                    },
                    {
                        "name": "All time Incidents",
                        "value": `${Object.keys(json.incidents).length}`
                    },
                ],
                "footer": {
                    "text": `Last Check: ${json.updated_at}`,
                    "icon_url": "https://discordbots.org/images/dblnew.png"
                }
            }
        ]
    }


    fetch(`${webhookreturn}`, {
        method: "POST",
        body: JSON.stringify(embed),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(function (json) {
            return console.log(json);
        })
        .catch(err => console.log(err));
}

module.exports = (id, webhookreturn) => {
    fetch(`https://status.sionteam.com/api/services/${id}/`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(function (json) {
            sendToWebhook(id, json, webhookreturn)
            return console.log(json);
        })
        .catch(err => console.log(err));
    return true;
};