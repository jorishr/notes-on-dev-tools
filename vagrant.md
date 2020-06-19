# Vagrant + Virtual Box
Table of contents
- [Vagrant + Virtual Box](#vagrant--virtual-box)
	- [About Vagrant](#about-vagrant)
	- [Global Install on Windows](#global-install-on-windows)
	- [Configuring Vagrant](#configuring-vagrant)
		- [Puphet Configuration](#puphet-configuration)
	- [Vagrant Commands](#vagrant-commands)
	- [Vagrant and Wordpress](#vagrant-and-wordpress)

## About Vagrant
Run various Linux machines at the same time on the same computer.

Include the vagrant config files in the git repo of the project.

## Global Install on Windows
- install virtual box
- install vagrant
 
Don't install the hostupgrade package, this is optional and runs into issues with permissions. 

## Configuring Vagrant
For configuring Vagrant there are many options available:
- scotchbox
- vccw
- puphpet

References for further reading:
- [Vagrant for multiple projects](https://blog.moove-it.com/vagrant-multiple-projects/)
- [Vagrant Tutorial Video](https://www.youtube.com/watch?v=PmOMc4zfCSw)

### Puphet Configuration
Example, installed on the server: nodejs, mysql(MariaDB)

NOTE: update the packages upon install `apt-get update && apt-get upgrade`

Puphpet: configure online once. 
- add virtual hosts for each project in the config.yml
- update the windows host file with the chosen `<site>.local`

CURRENT PUPHPET SETUP:
- goudster.local
- travel.local

NOTE: the ip address in the config.yaml should be linked to the domain in the systems hosts file:
`192.168.56.101	goudster.local`


## Vagrant Commands
```
vagrant up
vagrant halt
vagrant reload

vagrant provision 	
//-> after updating config.yml, faster than full reload

vagrant destroy	//-> destroys machine configuration, not Puphpet

vagrant ssh		//-> ssh into the server 
```

## Vagrant and Wordpress
- Use [Varying Vagrant Vagants]( 
https://varyingvagrantvagrants.org/)
- [Video tutorial](https://www.youtube.com/watch?v=w4yQ_4Btu_g)

Put wordpress files in project folder and ssh into VM.
```
vagrant ssh
mysql -u root -p 
//-> root usr, password: see puphpet 123
show databases;
create database <name>;

wp-config.php
//-> update: database-name, dbuser, 123
```