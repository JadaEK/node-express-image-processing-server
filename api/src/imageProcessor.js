const path = require('path');
const { Worker, isMainThread } = require('worker_threads');

const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js');
const pathToMonochromeWorker = path.resolve(__dirname, 'monochromeWorker.js')


const imageProcessor= (filename) => {
const resizeWorkerFinished = false
    return new Promise((resolve,reject) => {
        if (isMainThread) {
            try {
                const resizeWorker = Worker(pathToResizeWorker, {workerData : 
                    {source : sourcePath, destination : resizeDestination}})
            }
            catch {
                reject(error);
                resizeWorker.on('message', (message) => { 
                    resizeWorkerFinished = true;
                })
                
                .resolve('resizeWorker finished processing')
            };

        }else {
            reject(new Error('not on main thread'));
        }

    }) 
    const sourcePath = uploadPathResolver(filename);
    const resizeDestination = uploadPathResolver('resized-' + filename);
    const monochromeDestination = uploadPathResolver('monochrome-' + filename);
}

const uploadPathResolver = (filename) => {
    path.resolve(__dirname, '../uploads', filename );
}

module.exports = imageProcessor