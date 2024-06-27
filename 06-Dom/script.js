let ans = document.querySelector("#ans")
let timeout;
function debouncing(){
  clearInterval(timeout)
  timeout = setTimeout(()=>{
    adding()
  },1000)
}


async function adding(){
    let a = Number(document.querySelector("#ip1").value)
    let b =  Number(document.querySelector("#ip2").value)
    let res = await fetch(`https://sum-server.100xdevs.com/sum?a=${a}&b=${b}`)
    let sum = await res.text()
    ans.innerHTML = "Sum is " + sum
}

function interestd(){
  clearInterval(timeout)
  timeout = setTimeout(()=>{
    interest()
  },500)
}
async function interest(){
    let p = Number(document.querySelector("#principle").value)
    let r = Number(document.querySelector("#rate").value)
    let t = Number(document.querySelector("#time").value)
    
    let res = await fetch(`https://sum-server.100xdevs.com/interest?principal=${p}&rate=${r}&time=${t}`)
    let data = await res.json()
    console.log(data.total) 
    console.log(data.interest) 
    ans.innerHTML = `Total = ${data.total} & Interest = ${data.interest}`
}
