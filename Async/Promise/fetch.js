// not working for now
let fetch0 = (url) => new Promise((resolve, reject) => {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.respone)
        resolve(xmlHttp.response)
    }
    catch (err) {
        reject(err)
    }
})

fetch0('https://api.quotable.io/quotes/random')
    .then(res => console.log(res))
    .then(console.log)