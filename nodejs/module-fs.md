# FS Module for NodeJs
Table of contents
- [FS Module for NodeJs](#fs-module-for-nodejs)
	- [Files](#files)
		- [Create new file](#create-new-file)
		- [Download a file](#download-a-file)
	- [Folders](#folders)

FS is a NodeJs package with tools and methods to read and write files to the filesytem.

Consult the offical documentation for detailled examples.
## Files
```javascript
const fs = require('fs');

fs.readFile(); 
fs.writeFile(); 
fs.appendFile();

//synchronous versions	
fs.readFileSync(); 
fs.writeFileSync(); 
fs.appendFileSync();
```
### Create new file
To create a file in the filesystem three arguments represent:
- file-path (a); 
- data inside the file (b); 
- callback function to display error or success (c).
```javascript
const fs = require('fs');
//fs.writeFile(a, b,c)
fs.writeFile(
	__dirname + "/index.html", 
	"<h1>Hello World</h1>", 
	function(error)
	{
    	if(error){return console.log("Error!");} 
		else{return console.log("Success!");}
	}
)
```
### Download a file
For example, SAVE a picture from the internet in the local fs. You require a protocol handler to deal with PROTOCOL you are going to use: https, http, file, ftp, etc. Use the `.get` method on that protocol variable.
```javascript
const fs = require("fs");
const linkProtocol = require("https");
/* 
linkProtocol.get(a, b)
a: URL or var that contains the URL
b: function to determine what to do with the downloaded data file
*/
const fileLocation = "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg";

linkProtocol.get(fileLocation, writeToFs);

function writeToFs(dataDownload){
	dataDownload.pipe(fs.createWriteStream(__dirname + "/new-picture.jpg"));
};
```
The dataDownload is a random name for the data downloaded through the protocol. That data is read from the download stream as it becomes available AND written to a destination writable stream with the `fs.createWriteStream` function.

## Folders
```javascript
fs.mkdir() 
fs.mkdirSync()

fs.readdir() 
fs.readdirSync()

fs.rename()
fs.renameSync()

fs.rmdir() 
fs.rmdirSync()
```