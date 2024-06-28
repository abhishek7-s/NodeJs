const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
    "mongodb+srv://admin:mVyoNeQeKZq04yFl@cluster0.2t9nwpo.mongodb.net/User_App",
);

const User = mongoose.model("User", {
  name: String,
  username: String,
  pasword: String,
});
const admin = mongoose.model("Admin", {
  name: String,
  username: String,
  pasword: String,
});

const app = express()
app.use(express.json())


app.post('/signup', async (req,res)=>{
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password
  
  const userExist = await User.findOne({username : email})
  if (userExist) {
    res.status(400).json("User already exits")
    return
  }

  let user = new User({
    name: name,
    username: email,
    pasword: password
  })
  user.save()
  res.status(200).json("Done")
})

app.post('/admin/signup', async (req,res)=>{
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password

  const userExist = await admin.findOne({username : email})
  if (userExist) {
    res.status(400).json("User already exits")
    return
  }

  let user = new admin({
    name: name,
    username: email,
    pasword: password
  })
  user.save()
  res.status(200).json("Done")
})

app.delete('/deleteUser', async (req, res)=>{
    const email = req.body.email

    const user = await User.findOne({username: email})
    if (user) {
      await User.deleteOne({username : email})
      res.status(202).json("Deleted that user")
    }
    else{
      res.status(400).json("User Not exist")
    }
})

app.get('/user', async(req,res)=>{
  const users = await User.find()
  res.json(users)
})


app.listen(3000, ()=>{
  console.log("Server Started at 3000")
});