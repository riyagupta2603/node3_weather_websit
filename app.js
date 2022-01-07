const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const app= express()
// define paths for express config
const publicdirectorypath=path.join(__dirname, 'views')
const viewpath=path.join(__dirname,'templates/views')
const partialspath=path.join(__dirname,'templates/partials')
//console.log(publicdirectorypath)

//setup handlerbars engine and views location
app.use(express.static(path.join(__dirname, 'public')));// get external file like css etc.
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//setup static directorl to server
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=> {
    res.render('index', {
        title:'weather app',
        name:'riya gupta'
    })
})
// app.get('',(req,res)=> {
//     res.send('<h1>hello express</h1>')
// })

//app.get('/help',(req,res)=>{
//     res.send([{
//         name:'riya',
//         age: 27
//     },{
//         name:'ritu'
//     }])
// })
// const publicdirectorypath=path.join(__dirname,'../public')
// app.use(express.static(publicdirectorypath))

// app.get('/about',(req,res)=>{
//     res.send('<h1>it is about page</h1>')
// })
app.get('/about',(req,res)=> {
    res.render('about', {
        title:'about IOT',
        name:'riya '
    })

})
app.get('/help',(req,res)=> {
    res.render('help', {
       helptext:'this is a help from riya',  
        title:'help me',
        name:'Riya gupta '
    })
})   
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{ latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            console.log(latitude,longitude,location)
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })

        })
    })
    // res.send({
    //    forecast:'this is snowing',
    //    location:'patna',
    //    address:'patna'
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'riya gupta',
        errormessage:'help not found'
    })
})
app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'riya gupta',
        errormessage:'page not found'

    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})