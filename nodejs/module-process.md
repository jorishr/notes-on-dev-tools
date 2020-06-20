# Process module in NodeJs
Table of contents
- [Process module in NodeJs](#process-module-in-nodejs)
	- [Exit a node program](#exit-a-node-program)
	- [Arguments](#arguments)
	- [Process output and errors](#process-output-and-errors)
		- [STDOUT](#stdout)
## Exit a node program
In the app.js code you can you use the PROCESS core module which has methods like `process.exit()`. When NodeJs executes this line, the process is immediately forced to terminate. This means that any callbacks that are pending, any network request still being sent, any filesystem access, or processes writing to stdout or stderr - all is going to be ungracefully terminated right away.

NodeJs will normally exit with a 0 status code when no more async operations are pending. For more status codes, see docs.

SIGTERM is the signals that tells a process to gracefully terminate. A server app.js program, for example, is never going to end. If you call `process.exit()`, any currently pending or running request is going to be aborted. With SIGTERM a notification is sent to a process in order to notify it of an event that occurred (POSIX, intercommunication system).
```javascript	
const server = app.listen(3000, () => console.log('Server 	ready'))
	
process.on('SIGTERM', () => {
	server.close(() => {
		console.log('Process terminated')
	})
})
```
## Arguments
The PROCESS object has an ARGV property, which is an array that contains all the command line invocation arguments. The first argument is the full path of the node command. The second element is the full path of the file being executed.

All the additional arguments are present from the third position going forward.

## Process output and errors
### STDOUT
A `console.log` statement prints to the standard output, which in NodeJs is console terminal.

The `console.error` prints to the standard error stream and will not show up in the console: It will appear in the error log.