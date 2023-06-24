// 
const wait = (ms) => new Promise((resolve) => resolve());

wait(0).then(() => console.log(1)).then(() => console.log(8)).then(() => console.log(9));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));
console.log(4);