const express = require('express')

const app = express()
const port = 3000


let users = []
let nos = 1

app.use(express.json())

app.post('/user' , (req , res)=>{
    const {name , mail} = req.body
    const newUser = {"nos": nos++ , "name": name , "mail": mail}
    users.push(newUser)
    res.status(201).send(newUser)
})

app.get('/user' , (req , res)=>{
    res.status(201).send(users)
})

app.get('/' , (req , res)=>{
    res.status(201).json("Change routes for further work")
})

app.get('/user/:nos', (req,res)=>{
    console.log(req.params);
    const user = users.find(t => t.nos === parseInt(req.params.nos))
    res.status(200).send(user)
})

app.delete('/user/:nos', (req,res)=>{
    console.log(users.length)
    const rmNum = parseInt(req.params.nos)
    console.log(rmNum)
    if (users.length < rmNum) {
        res.status(404).send("User not found")
        return
    }
    else{
        users.splice(rmNum-1 , rmNum-1)s)
        console.log(users)
        res.status(200).send("done")
    }
})

app.listen(port,()=>{
    console.log(`User Server started at Port: ${port}`)
})