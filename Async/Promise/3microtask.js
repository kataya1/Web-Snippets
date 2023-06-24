

setTimeout(() => {
    console.log('setTimeout');
}, 0);

queueMicrotask(() => {
    console.log('queueMicrotask');
}); //  follows a FIFO (first-in-first-out) order. 


Promise.resolve().then(() => {
    console.log('Promise');
}); // promises are part of the microtask queue, 
console.log('Script start');
console.log('Script end')


// // 1. Main script executes 
// 2. `queueMicrotask` callback pushed to microtask queue 
// 3. `Promise` callback pushed to microtask queue 
// 4. Microtask queue runs, with `queueMicrotask` executing first 
// 5. ` setTimeout` callback pushed to macrotask queue 
// 6. Macrotask queue runs `setTimeout`

// Script start
// Script end
// queueMicrotask
// Promise
// setTimeout


/// main thread -> Microtask Queue -> Task Queue/eventQueue%  

