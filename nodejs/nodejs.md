# NodeJs
Table of contents
- [NodeJs](#nodejs)
	- [About NodeJs](#about-nodejs)
		- [When to use NodeJs](#when-to-use-nodejs)
	- [NodeJs Console](#nodejs-console)
	- [Event Loop](#event-loop)

## About NodeJs
Javascript was originally used as a browser language only, in contrast to back-end languages that could talk to servers and do database operations.

NodeJs brings a runtime system or environment that adds extra use cases for JS:
- communicate with servers and store or return data from databses
- use JS as a dev tool on a pc to write scripts and automate tasks

In the NodeJs environment JS files can be interpreted and evaluated for us and it comes with built-in methods and packages. Through NodeJs you can, for example, access the local file system and the Internet to grab and modify files.

Some differences with the browser: you control the environment (instead of unknown client browser type), no DOM, CommonJS modules (thus require() vs ES6 import).

The V8 JS engine is written in C++, and it's continuously improved. It is portable and runs on Mac, Windows,
Linux and several other systems. It compiles and executes the JS. JavScript is internally compiled by V8 with just-in-time (JIT) compilation to speed up the execution.

### When to use NodeJs
NodeJs is single-threated, thus at any given point in time the code execution is done by one single processing thread. The processing thread runs through a QUEUE of EVENTS one by one. The event queue implementation is done through the EVENT LOOP.

The potential problem with this single-threated approach is that a processor intensive task may block the application execution. But, since JS and NodeJS are ASYNCHRONOUS the most common time-consuming tasks, such as network requests, are treated as asynchronous events. This means that the code execution will continue while the time consuming task is being executed. Once that task is completed, a CALLBACK is function is added to the QUEUE of events to be executed.

Other platforms that are multi-threaded work with a thread pool. As long as there are IDLE threads, new instructions can be added while the BUSY threads are waiting for a task to be completed before they can resume execution because these threads are SYNCHRONOUS.

Because there is no thread pool NodeJs is very efficient in dealing with I/O or database intensive apps. Idle threads don't exist and the thread pool cannot be full. Thus examples of where Nodejs shines are webserversa and realtime servers (websocket)

For an application that needs intensive internal computation, nodejs is not very efficient because the work needs to be done on the one and only available thread. When the app does not depend on an external API to do the heavy lifiting, the single thread may get blocked.

## NodeJs Console
In this REPL environment you can write valid js directly. NodeJs will:
- read your command line instructions, 
- evaluate the related code, 
- print the result, 
- loop back to the command line to wait further instructions

By typing `node` you can perform JS in the CLI just as in the browser console. Obviously there is no browser in the CLI thus no Document Object Model to manipulate with selectors. To execute a JS file in the CLI: `node file.js`.


## Event Loop
The event loop in Nodejs is SINGLE-THREADED or SYNCHRONOUS, thus no two lines of JS can be running at the same time and everything is executed in order. This contrast with MULTI-THREADED programs that can have multiple JS executions running at the same time or in parallel.

The event loop however does let NodeJs achieve CONCURRENCY (but not parallelism). This makes NodeJs ASYNCHRONOUS. Actions like reading from the filesystem, waiting for server responses etc. that happen outside the program itself, do not have to block the progress of our program execution. These actions are performed concurrently.

For example, a setTimeout function at 0 ms will be added to the callback queue and executed at the end of the Event loop of the program. Nothing is happening in parallel outside the program. The asynchronous setTimeout function returns immediately and allows the event loop to advance but the execution of the callback inside the setTimeout is delayed to a further point in the event loop. 

Another example would be the fs.readFile module which puts the callback function on the callback queue and returns immediately. This allows the program to advance while the reading of that file is in progress. 

The callback queue is first in first out, thus if you read from multiple files it's impossible to predict which one finishes first.
```javascript
for(let i = 1; i <=5; i++){
	fs.readFile('file-' + i +'.txt', (err, data) => console.log(data))
};
//each run of this program may harvest different results depending how fast a file has been read:
//-> content of file1, file3, file2, file5, file4
//-> content of file3, file1, file2, file4, file5
```