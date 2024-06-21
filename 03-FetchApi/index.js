async function getData(){
    console.log("Hello world in Async")
    const response = await fetch('https://fakerapi.it/api/v1/persons')
    const data = await response.json()
    console.log(data)
    console.log(data.data[0].website)
}

// Another way to do same 

function getData2(){
    console.log("Hello world in .then()")
    fetch('https://fakerapi.it/api/v1/persons')
    .then((res)=>{
        res.json()
        .then((data)=>{
            console.log(data.total)
        })
    })
}