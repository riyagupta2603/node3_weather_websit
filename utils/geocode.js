const request = require('request')

const geocode=(address,callback)=> {
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoicml5YWd1cHRhMjYyNyIsImEiOiJja3hyNWdhcm4zMGo2MnB1YmZqZHJwaGM1In0.hGP82kF4YGVmQVvl6Ol-tw'

request({url, json:true}, (error,{body})=> 
{
    if(error){
        callback('unable to connect to location services', undefined)
    } else if(body.features.lenght=== 0){// this line of code does't run or give output
      callback('unable to find the loaction. try another search', undefined)
    }
    else{
        console.log(body.features[0].place_name)
        callback(undefined, {
            latitude:body.features[0].center[1],
            location:body.features[0].place_name,
            longitude:body.features[0].center[0],
        })
    }
})
}
module.exports= geocode