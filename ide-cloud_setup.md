# Cloud-based development
Cloud-based IDE with goormIDE and MongoDB Atlas.

## goormIDE
Create a new container, select Node stack.
- create package.json: npm init
- install Express: npm i express (can be found node_modules)
- run the server: node app.js
- check Project tab and Running URL for link to running app

## MongoDB Atlas
With MongoDB Atlas you don't have to build and manage your database. It is done in the cloud.
- create a cluster
- connect the cluster to the cloud IDE in goorm:
	- whitelist IP of goorm ide(if unknow try 0.0.0.0/0)
	- login mongoDB
	- connect your application with a connection string

- `npm i mongoose`
- in app.js add:
```javascript
const mongoose = require("mongoose");
mongoose.connect('connection string').then().catch();
```
Use the dotenv package for hiding the password in an environment variable 

- run the Node Monitor: `npm i -g nodemon`
Run the app: `nodemon`

If things are working you can check in MongoDB Atlas console for the collections that hold our database objects.