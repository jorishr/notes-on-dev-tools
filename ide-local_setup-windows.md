# Local Development Environment in Windows 

## Dev tools
- GIT + Git Bash CLI
- Visual Studio Code -> linked up with GitBash

## LAMP Stack
Don't attempt to do a fully manual setup in Windows. You run into all sorts of issues that make you lose time. Use XAMPP or something similar.

NOTE: Apache does not run on startup, nor does MySql. You have run them manually
- in gitBash: `cd c:/apache/bin ; ./httpd.exe`
- Sql Workbench: start server.
- phpMyAdmin: `localhost/phpmyadmin/index.php`

### MYSQL
Use the windows installer for the community server editio. You can use the MySQL workbench or shell.

### PHP (language support)
- unzip to `c:\php`
- update Apache configuration:
add to `httpd.conf`

## MERN Stack
### NodeJs
You do a manual install of Nodejs or use a Node Version Manager that allows you to switch between versions.

References: 
- [Using NVM](https://zarkom.net/blogs/how-to-install-nodejs-via-nvm-on-windows-7934)
```
nvm install latest
nvm use x.x.x
nvm list
```
### MongoDB
To easily start our mongodb server and mongo terminal, we will create a Windows batch script file (.bat) which will serve as a shortcut for us.

Now you will be able to start your mongod database server and the mongo terminal by double-clicking the `StartMongo.bat` file on your Desktop.

### Express
Configure Gulp and Nodemon to run automatically in a NPM script for development/production.