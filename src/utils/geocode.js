const request = require('request')
const geocode = ((address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoieWFha292ZCIsImEiOiJjazZtMXJkbnQwamQzM21wYWRiNmtneTQyIn0.lOn0NqTQS_ufmScu6dea1g&limit=1'
    request({
        url,
        json: true
    },
        (error, {body}) => {
          const  {features} = body
            
            if (error) { callback('unable to connect to location services', undefined) }
            else if (features.length === 0) { callback('please make sure that you have searched the correct location', undefined) }
            else {
               
                callback(undefined,
                    {
                        location: features[0].place_name,
                        longitude: features[0].center[0],
                        latitude: features[0].center[1]
                    })
            }
        })
})

module.exports = geocode