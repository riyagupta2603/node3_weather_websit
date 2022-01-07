const request=require('request')
const forecast=(latitude,longitude,callback)=> {
    const url= 'http://api.weatherstack.com/current?access_key=44a81e63a5a19646416d1158fa86a84a&query=' +latitude+ ',' + longitude+'&units=f'
    request({url, json:true}, (error,{body})=> {
        if(error){
            callback('unable to connect to weather services', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '.current temperature is '+body.current.temperature + ' and current humidity is ' + body.current.humidity)
        }
    })
}
module.exports= forecast