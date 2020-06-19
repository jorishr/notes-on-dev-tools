# Git logs and reverting to earlier versions
Table of contents
- [Git logs and reverting to earlier versions](#git-logs-and-reverting-to-earlier-versions)
	- [Git log](#git-log)
	- [Checkout earlier versions](#checkout-earlier-versions)
	- [Revert to earlier version](#revert-to-earlier-version)
## Git log
Om de laatste wijzigingen in de repository te bekijken kan je best extra flags gebruiken die het geheel overzichtelijker maken: `git log --pretty=oneline`

Wil je ook de code zien die gewijzigd is gebruik dan de -p flag. Om het aantal commits te beperken kan je `-<getal>` gebruiken of `--since=2.weeks`
```
git -p -2	
// laatste twee commits in detail

git log --since=2.weeks
```
Voor korte statistieken over aantal commits: hoeveel bestanden gewijzigd
hoeveel lijnen code, etc.: `git log --stat`	

## Checkout earlier versions
This moves the HEAD to the earlier version, which means that you get to see and work with the files as the were at that exact moment in time: `git checkout <checksum>`. 
```
The head moved back here:
	 |	
0 -> 0 -> 0 -> 0
			   | master is here
```
To move the HEAD back to master: `git checkout master`.

## Revert to earlier version
This does not happen often in a professional context. Look it up on stack overflow when you need it. There are many different options. This shortest one is:
`git revert --no-commit <checksum>..HEAD`