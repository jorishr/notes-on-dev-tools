# Git Operations
Table of contents
- [Git Operations](#git-operations)
	- [Clone existing repo](#clone-existing-repo)
	- [Create a new rep](#create-a-new-rep)
	- [New local repo](#new-local-repo)
	- [Pull/fetch](#pullfetch)
	- [Remote repo setup](#remote-repo-setup)
		- [New remote repo from CLI](#new-remote-repo-from-cli)
	- [Stage and commit](#stage-and-commit)
		- [Amend](#amend)
		- [Push](#push)
		- [Tags](#tags)
	- [Gitignore](#gitignore)
## Clone existing repo
Als je een kloon download van een bestaand project dan download je eigenlijk de repository in een git directory. Van daaruit heb je een CHECKOUT van bestanden naar je working tree. In die werkmap maak je de veranderingen en in de index of staging area geef je aan welke gewijzigde bestanden opnieuw gecommit moeten worden naar de gecomprimeerde opslagplaats.
```
git clone <url>		// clone	
git checkout		// checkout

git checkout -- 	// restore files to last commit
```
## Create a new rep
## New local repo
Maak een nieuwe projectmap en typ: `git init`. 

## Pull/fetch
When you use `git fetch`, you're adding changes from the remote repository to your local working branch without committing them. Unlike `git pull`, fetching allows you to review changes before committing them to your local branch.

## Remote repo setup
### New remote repo from CLI
```
//create an empty shell on github.com 
curl -u '<username>' https://api.github.com/user/repos -d '{"name":"<REPONAME>"}'

//add URL to local Git repo
git remote add origin https://github.com/<username>/<repo-name>.git

//if remote repo is pre-configured, e.g. with a readme and gitignore, sync the branches and pull (you need to have commit in the local repo as well)
git branch --set-upstream-to=origin/master master

git pull --allow-unrelated
``` 

## Stage and commit
Telkens dat het project een status bereikt die je wilt vastleggen maak je snapshot met een commit. Elke commit is het opslaan van wijzigingen in de versiehistoriek. 
```
git add <bestandsnaam>	
git add -A
//-> alle bestanden stagen

git reset <bestand>		// UNSTAGE FILE
git reset				// clear STAGE 

git commit -m 'message'	// met bericht over wijzigingen

git commit -a -m 'message' OR
git commit -am 'message'
```
Hiermee commit je automatisch alle gewijzigde bestanden die worden getracked zonder te passeren via de de staged toestand (git add).  

Het -m commando is de message die je toevoegd aan de snapshot.
### Amend
Bestand vergeten in the commit?
```
git add <vergeten_bestand>
git commit --amend		// added to last commit
```
### Push
Push to github.com: 
```
git push
//push to master branch specifically
git push origin master`
```
### Tags
Tags kan je gebruiken voor specifieke landmark snapshots, bijv. v1, v2.2.1, etc.
```
git tag -a v1.2 -m 'this is version v1.2'

git tag -a v1.2 -m "message" 9fceb02 
//-> met checksum

git tag -d <tagnaam>	//	delete tag

$ git tag -l 			//	lijst in alfabetische volgorde
$ git tag -l "v1.8.5*" 	//	om een specifieke tag te bekijken

$ git show v1.4			//  detailweergave 
```
## Gitignore
Alle bestanden in de werkmap die niet zijn toegevoegd blijven "untracked", dus onzichtbaar voor Git. Een `.gitignore` bestand aanmaken voordat je gaat beginnen is over het algemeen een goed idee, zodat je niet per ongeluk bestanden commit die je echt niet in je Git repository wilt hebben. 

Het gaat om bijv. tijdelijke of logbestanden die zullen opduiken in de lijst van "untracked" bestanden. Met ignore gaan die er helemaal uit.

The global gitignore file is located in root `~/` of the system.

When setting up a remote github shell you can autoconfigure it to include certain templated gitignore files.