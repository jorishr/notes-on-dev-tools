# Git Branches
Table of contents
- [Git Branches](#git-branches)
	- [About branches](#about-branches)
		- [Branches in VSCode](#branches-in-vscode)
	- [Show and create branches](#show-and-create-branches)
	- [Merge branches](#merge-branches)
		- [No Fast Forward](#no-fast-forward)
	- [Merge on Github.com](#merge-on-githubcom)
	- [Delete branches](#delete-branches)

## About branches
The branch system allows you to work on seperate features of a site that will be implemented or go live on different occasions. First you branch out and once completed you merge the branch into the maim tree. 

The master branch can be considered the live or production version of our project. Thus this is NOT SUITED FOR EXPERIMENTATION. For work in progress you create a new branch, for each new feature or experiment we want to work on.

### Branches in VSCode
This has consequences for the files you are working with in VS CODE. The `index.html`, for example, will be the version on the BRANCH, not the main index.html. 

If during BRANCH work you want to look into or modify the MASTER index.html, you have to switch to the master branch first. VS Code will update the files.

## Show and create branches
The `git branch` command shows the list of branches, the `*` on the output indicates the branch we are currently working on.
```
git branch <name>	
git checkout <branch-name>	
// creat new branch, switch to a branch

git checkout -b <new-branch-name>
//create + switch to 	
```
## Merge branches
Once work on a branch is finished you can merge it into the master branch. Return to the master branch first!
```
git checkout master 	
git merge <name-of-the-branch>
```
### No Fast Forward
This way a seperate consolidated commit is created that shows all the changes that have been made. Now, other team members don't have to dig through multiple commits to find out what happened: `git merge <name-of-the-branche> --no-ff`

## Merge on Github.com
First complete the work on the branch and push it to github: 
```
git commit -m 'feature completed'
git push origin <branch-name>
```
On GitHub: "open pull request" and add a message for the team. Assign others that have to review your work before completing the merge.

NOTE: if you merge on GitHub, make sure to pull the latest version of the repo to your workstation!

## Delete branches
To delete old branches a on local machine: `git branch -d <branch-name>`.