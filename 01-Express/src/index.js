const express = require('express')

const app = express();

const users = [{
    name:'Sam',
    kidneys:[{
        isHealthy : false
    }]
}]

app.use(express.json())

app.get('/' , (req ,res)=>{
    const usersKidney = users[0].kidneys
    const totalKidneys = usersKidney.length
    const unhealthyOnes = usersKidney.filter((kd)=>(kd.isHealthy == false))
    const healthyOnes = totalKidneys - unhealthyOnes.length;

    res.json({
        TotalKidneys : totalKidneys,
        HealthyOnes : healthyOnes,
        Unhealthykidneys : unhealthyOnes.length,
    })
})


//add kidneys to users
app.post('/' , (req ,res)=>{
    const health = req.body.ishealthy;

    users[0].kidneys.push({
        isHealthy : health
    })
    res.send('Done')
})

//updates users kidneys healths to true
app.put('/' , (req ,res)=>{
    if (anyUnhealthyKidneys()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].isHealthy = true
        }
        res.send('Done replaced')

    } else {
        res.status(411).send('Not having any Unhealthy Kidneys to change')
    }
    
})

//delete users unhealthy kidneys
app.delete('/' , (req ,res)=>{
    if (anyUnhealthyKidneys()) {
        let newKidneys = []
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].isHealthy == true) {
                newKidneys.push({
                isHealthy : true
            })
            }
        }
        users[0].kidneys = newKidneys
        res.send('Done deleted')
    } else {
        res.status(411).send('Not having any Unhealthy Kidneys to remove')
    }
    
})

function anyUnhealthyKidneys() {
    let isthere = false
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].isHealthy) {
            isthere = true;
            break;
        }      
    }
    return isthere;
}

app.listen(3000, ()=>{
    console.log(`Started at Port 3000`)
})