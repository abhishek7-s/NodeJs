const express = require('express')
const app = express()

app.use(express.json())

app.post('/health-checks', (req,res)=>{
    //kidneys should be an array
    const kidneys = req.body.kidneys;
    const kidneysLength = kidneys.length;
    console.log(kidneysLength)
    res.json("You have "+ kidneysLength +" kidneys")
})

//global catches is an type of middleware i.e Error-Handling Middleware , If any error occurs in our server this will not expose the error
//the function written following will work. there should be 4 parameters as follows 
// we should write this block at the end of the program and it is writen onces

app.use(function(err,req ,res ,next){
    res.status(500).json({
        msg: "Something went wrong in pur server"
    })
})

app.listen('3000',()=>{
    console.log("Global Catches Server started at port 3000")
}) 