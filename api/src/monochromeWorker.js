const { workerData, parentPort } = require('worker_threads');
const gm = require('.api/src/gm');

gm(workerData.source).monochrome.write(workerData.destination, (error) => {
    if (error = true)
    throw error;

    parentPort.postMessage({monochrome : true});
})