const logUpdate = require('log-update');
const delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
});

const tasks = [
    delay(1),
    delay(8),
    delay(3),
    delay(4),
    delay(6),
    delay(2),
    delay(8),
    delay(10),
    delay(3),
    delay(2),
    delay(8),
    delay(9),
    delay(1),
    delay(2)
];

const toX = () => 'X';

class PromiseQueue {
    constructor(promises = [], concurrentCount = 1) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    get runAnother() {
        return (this.running.length < this.concurrent) && this.todo.length;
    }

    graphTasks() {
        const { todo, running, complete } = this;
        logUpdate(`
            todo     : [${todo.map(toX)}]
            running  : [${running.map(toX)}]
            complete : [${complete.map(toX)}]        
        `);
    }

    run() {
        while (this.runAnother) {
            const promise = this.todo.shift();
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.run();                
            });
            this.running.push(promise);            
        }
        this.graphTasks();
    }
}

// const promiseQueue = new PromiseQueue(tasks, 4);
// // promiseQueue.run();


process.stdout.write("Hello, World");
process.stdout.clearLine();
process.stdout.cursorTo(0);
process.stdout.write("\n");