const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json())

const ALL_USERS = [
  {
    username: "abhishek@gmail.com",
    password: "123",
    name: "Abhishek S",
  },
  {
    username: "avenue@gmail.com",
    password: "123321",
    name: "avenue S",
  },
  {
    username: "unkown@gmail.com",
    password: "123321",
    name: "flopper",
  },
];

function userExists(username, password) {
  let isUser=false
  ALL_USERS.forEach(element => {
    if(element.username == username && element.password == password){
      isUser = true;
      return isUser
    }
  });
  return isUser;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username)
  console.log(password)
  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    res.status(200).json({username})
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, ()=>{
    console.log("Started at 3000")
})