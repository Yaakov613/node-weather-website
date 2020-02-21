
request = require('request')


const forecast = ((latitude, longitude
    , callback) => {

    const url = `https://api.darksky.net/forecast/024dfb1d2b9ed8fc8ef4210bb8bd3c1c/`
    const urlToCall = `${url}${latitude},${longitude}`

    request({
        url: urlToCall,
        json: true
    }, (error, {body}) => {
        if (error) { callback('you are unable to connect to the internet') }
        else if (body.error) { callback('you have not entered a valid coordinate position'), undefined }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                currentTemp: body.currently.temperature,

            })
        }
    })
})
module.exports = forecast