# Browser Sync
Table of contents
- [Browser Sync](#browser-sync)
	- [Install and import](#install-and-import)
		- [BS as static file server](#bs-as-static-file-server)
		- [BS as a proxy](#bs-as-a-proxy)
	- [BS Streams and auto-reload](#bs-streams-and-auto-reload)
		- [Streams](#streams)
		- [Automatic browser reload](#automatic-browser-reload)
	- [BS options](#bs-options)
	- [Edit a live site locally](#edit-a-live-site-locally)
  
## Install and import
It is important to not just require in BS but also to `create()` an instance of it. You could create multiple instances.

NPM: `npm -i --save-dev browser-sync`
```javascript
const bs = require('browser-sync').create();
```
Browser-sync can be configured to run as a simple STATIC file server, or as a PROXY for your own backend server (ExpressJs) that may already be running on localhost or in a Virtual Box (Vagrant).
  
You configure the browser-sync server in the gulp WATCH task with the `init()` method that accepts an OBJECT with the config options.

### BS as static file server 
```javascript
function watchTask(){
	bs.init({
		server: { baseDir: './app' }
	})
}
```
### BS as a proxy
Proxy an EXISTING virtual host. Browsersync will wrap your vhost with a proxy URL to view your site.

The proxy is the URL of the Express localhost server or the remote server you are working with. In the example below the server runs on localhost port 4000. Use a different port to run the bs proxy through.

In the proxy config object you indicate what address to open in the browser. This can be the LOCAL for localhost, EXTERNAL, FALSE or TUNNEL.

If you set the option to TUNNEL: 'name' the app will be available on your local network at: `name.localtunnel.me`.

You can add a subfolder if you have multiple apps running on the same server.
```javascript
browser-sync.init({
	open: "local",			
	proxy: "http://localhost:4000/<subfolder>",	
	port: 3000,
	tunnel: '<name>'
});
```
## BS Streams and auto-reload
### Streams
The stream functionality allows for browser-sync to inject css/sass into the browsers without reloading. Once the stream has reached it's `dest()` you add another `pipe(bs.stream())` wherin you call the `stream()` method.

NOTE! There is an issue with injecting styles through GULP `.pipe(bs.stream())` when using a PROXY. Use the browser-sync native option FILES instead. In the `bs.init({})` add the files: `'<path>/*.css` option.

Sass will process your sass files into a `main.css`. When that changes browser-sync will be watching and inject the styles.
	
### Automatic browser reload
Add an event listener to the watch task and call the reload method.
```javascript
watch(htmlFiles).on('change', bsReload)
```	
The browser-sync method `reload()` is not an async function but GULP WATCH is async and needs to know when tasks have been completed. The result is that a task with a `bs.reload` method in it will run only ONCE. Because nothing is returned from a task, as in `bs.reload`, you must use the error-first callback to signal completion. To fix this behavior wrap the `bs.reload` in a seperate function using an error-first callback:
```javascript	
function bsReload(cb){
	bs.reload();
	cb(new Error('Error while reloading browsers'));
};
```
## BS options
What seems to work best is to have the files to watch indicated in the FILES options of browserSync config.
```javascript
browser-sync.init({
	open: "local",			
	proxy: "http://localhost:4000/<subfolder>",	
	port: 3000,
	tunnel: '<name>'
	files: ['cssPath','htmlPath','jsPath']
});
```

## Edit a live site locally
Without having to setup a dev environment with the full code you can proxy the live site through Browser-Sync and work on changes that later have to be entered into the real production code.

Further reading see [example](https://medium.com/@markbrouch/edit-live-sites-on-the-fly-with-browsersync-426690dac3f1).