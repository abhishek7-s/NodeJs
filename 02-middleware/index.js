const express = require('express')
const app = express()



const userMiddleware = (req ,res , next) =>{
    // this are middleware which can perform any checks require before 
    // next() is used to point to next process if we not call this function then we thread will never reach 
    // the actual process
    console.log("at userMiddleware")
    next()
}

const kidneyMiddleware = (req ,res , next) =>{
    // this are middleware which can perform any checks require before 
    console.log("at kidneyMiddleware")
    next()
}


//to count the number of request receiving
let count = 0;
const countReq = (req , res , next) =>{
    count++;
    console.log(count)
    next()
}

app.use(express.json())  
// this is also an middleware where i.e express.json() used in app.use() that means the express.json() will we perform on every methods 
//In following method for eg. the userMiddleware is used for an specific routes
//If we have to use this middleware in all routes then we can simply user app.use()
// for eg. 
// app.use(userMiddleware)
//after this we dont have to specify that where to use it will used for all routes

app.get('/health-checks', userMiddleware , kidneyMiddleware ,countReq, (req ,res)=>{
    res.send("Your Health is good")
})

app.get('/kidney-checks' , userMiddleware , kidneyMiddleware , countReq, (req ,res)=>{
    res.send("Your kidneys are good")
})
app.get('/heart-checks' ,userMiddleware , countReq,(req ,res)=>{
    res.send("Your heart is good")
})

app.listen('3000' , ()=>{
    console.log(`Server Started at port 3000`)
})