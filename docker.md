# Docker
Table of contents
- [Docker](#docker)
	- [About Docker](#about-docker)
	- [Docker File](#docker-file)
		- [Build Docker File](#build-docker-file)
	- [Docker Networks](#docker-networks)
	- [Docker Compose](#docker-compose)
		- [Scaling](#scaling)
	- [Docker for web dev](#docker-for-web-dev)

Reference: [Docker Dev Ops Course](https://www.freecodecamp.org/news/docker-devops-course/)

## About Docker
Docker uses images that are designed to run or do one specific thing in a container. What is inside the image can be customized: Python environment, MySql, NodeJs, ...

The basics of an image are: OS, software and app code that will run a container.

Dockers differs from VIRTUAL MACHINES in couple of ways:
- start and stop very fast, less memory use because it's images are containers that are stripped down version of 	Linux. Plus each container image holds only one thing: MySQL or PYTHON, for example.
- a container is designed to run a command and then shutdown the container when the operation is done.
- the docker container does not have direct access to the files on the host machine. You can however mount a directory into the src folder of the container

IMPORTANT:
When you install docker in windows you can no longer use Virtual Machines because they are incompatible. Thus you can no longer use Vagrant. 

## Docker File
A docker file describes how an image is built and what is in it. You can find preconfigured ones online or build your own. To see the one you have installed:
`docker image ls`

### Build Docker File
See dockerhub for detailled instructions.
Build: `docker build -t <name> .`. The `.` is in the current folder or path for docker file.
 
Example:
```
docker run \
	--rm \	
	-v $(pwd):/src \ 	
	python:3 \
	python /src/hello.py
	/bin/bash
//-> removes machine once done
//-> volume: mount current host folder
//-> indicate which image to use
//-> file to run
//-> shell inside the container
```
Example: Run an Nginx server in a docker container:
```
docker run
	--rm
	-v $(pwd):/usr/share/nginx/html
	-p 8080:80		
	-d
	nginx:latest
	bin/bash 		
//-> take localhost:8080 and forward to port 80 on the docker container
//-> run as daemon in background
//-> run latest version
//-> shell to run server commands
```
```
docker container ls 
docker stop <container-name>
//-> to see what is running or stop container
top	
//-> to see	system processes running in the container (if command is supported by the container built you are using)
docker exec -it <container-name> /bin/bash
//-> it=interactive to log back into a running container
```
## Docker Networks
Since each container only runs one thing you may need to connect various container into a network. For example: Nginx, NodeJs, MySQL.
```
docker create network <name>
docker network ls	//-> check network
docker run 
	--rm
	-d
	--net <network-name>	
	--name <network-name>_mysql
	-e MYSQL ROOT_PASSWORD='root'
	mysql:5.6

//-> connect to the network
//-> MYSQL command
//-> version

	docker run 
	--rm
	-it		//interactive				
	--net <network-name>
	--name <network-name>_node	//-> instead of hash
	node:8	//-> nodejs version	
	/bin/bash
```
From the node terminal container you can now ping the mysql databse: `ping <network-name>_mysql`

## Docker Compose
All the above becomes much easier with Docker Compose. You put the configuration inside a .yaml or .json file and all the services you require will automatically be running in a network together.
```
docker-compose up		//-> start up
docker-compose up -d	//-> in background
docker-compose down		//-> stop
```
### Scaling
Another advantage is you can scale the services you run on the server. If a server has 8 cores you can run 8 instances of the server app with 8 entry points.

See reference [video](https://www.youtube.com/watch?v=2qKlZQX1Ums), min 8.
	
The command `docker-compose up --scale app=8` will run 8 instances of the server app defined in the .yaml config file. 

## Docker for web dev
Architecture of the site should be: basic website that uses services that each perform a specific task such as login service, a product service, a basket service, a search service. Each of these components can run in it's own docker container. The website uses API to calls require the services it's need.