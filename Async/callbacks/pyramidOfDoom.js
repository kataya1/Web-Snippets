function firstTask(callback) {
    console.log("Running first task...");
    setTimeout(() => {
        callback('first task', null);
    }, 2000);
}

function secondTask(result, callback) {
    console.log("Running second task...");
    setTimeout(() => {
        callback(result + ' second task', null);
    }, 1000);
}

function thirdTask(result, callback) {
    console.log("Running  third task...");
    setTimeout(() => {
        callback(result + ' third task', null);
    }, 1500);
}

function fourthTask(result, callback) {
    console.log("Running fourth task...");
    setTimeout(() => {
        callback(result + ' fourth task', null);
    }, 2000);
}

firstTask(function (result, err) {
    // Passed from first to second  
    secondTask(result, function (result, err) {
        // Passed from second to third
        thirdTask(result, function (result, err) {
            // Passed  from third to fourth
            fourthTask(result, function (result, err) {
                console.log(result);
            })
        })
    })
})