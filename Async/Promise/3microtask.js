

console.log('Script end')
setTimeout(() => {
  console.log('setTimeout 1');
}, 0);
setImmediate(() => {
  console.log('setImmediate 1');
});
process.nextTick(() => {
  console.log('Running at next tick 1');
});
Promise.resolve().then(() => {
  console.log('Promise 1');
});

queueMicrotask(() => {
  console.log('queueMicrotask 1');
});  //  follows a FIFO (first-in-first-out) order.
setTimeout(() => {
  console.log('setTimeout 2');
}, 0);
setImmediate(() => {
  console.log('setImmediate 2');
});
process.nextTick(() => {
  console.log('Running at next tick 2');
});
Promise.resolve().then(() => {
  console.log('Promise 2');
});

queueMicrotask(() => {
  console.log('queueMicrotask 2');
});  //  follows a FIFO (first-in-first-out) order.

console.log('Script start');


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
