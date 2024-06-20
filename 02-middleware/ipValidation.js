const express = require('express')
const zod = require('zod')
const app = express()

const schema = zod.array(zod.number());
//zod allows us to define schemas for your data, validate it against these schemas, and ensure type safety in our code

// Consider if we have to take input from user as follows
//{
//  email : string -> email,
//  password : string -> atleast 8 letters
//  country : "IN" , "US"       
//}

const newschema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(8).trim(),
    country : zod.literal("IN").or(zod.literal("US"))
})



app.use(express.json())

app.post('/zod-checks', (req,res)=>{
    //kidneys should be an array
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)

    if (response.success) {
        const kidneysLength = kidneys.length;
        res.json("You have "+ kidneysLength +" kidneys")
    } else {
        res.json({
            msg : "Invalid Input"
        })
    }
    
})

app.listen('3000',()=>{
    console.log("Zod Learing Server started at port 3000")
}) 