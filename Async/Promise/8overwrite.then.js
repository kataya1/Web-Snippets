
// i dont't know 
Promise.prototype.then = (onFulfilled, onRejected) => {
    // Create a new promise 
    //    how to get access to the value passed to resolve() of the former promise. is it just like events? you assume it passes

    // when does the onFullfilled run, you define it in the .then, but when does it actually run.
    // because if onFulfilled = (data) => {}. if i run `onFulfilled()` i pass it nothing? where do i get the data
    // Promise.results? Promise.reason?, give it to ∏promise and let it handle it call it itself
    this.fullf
    const newPromise = new Promise((resolve, reject) => {
        // resolve(onFulfilled) ?????? is that the solution
        //  but how to know when to reolve or reject?
        // how to pass it to the catch if onRejected don't exist

    });

    return newPromise;
}

    // promise.then((data) => {
    //     console.log(data);
    //     return 'hello'
    // })