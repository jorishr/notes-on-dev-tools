# About Git and version control
Table of contents
- [About Git and version control](#about-git-and-version-control)
  - [About version control systems and Git](#about-version-control-systems-and-git)
  - [How it works](#how-it-works)
    - [Integrity](#integrity)
  - [File status](#file-status)
  - [Git Flow](#git-flow)

## About version control systems and Git
Git is the open source tech for making collaborating en managing different versions of code more efficient. GIT version control tracks changes and creates a file history. You can merge changes made by multiple people that work simultaneously.

You have a series of "commits", checkpoints, with versions or 
snapshots of code/files. So later you can always go back to specific versions before/after determined changes have been made.

Thing started with local centralized version control with version history on a central server and all individual computers would checkout that server to download the files. The obvious problem: the server is a single point of failure. Server down means no work can be done during downtime. 

Next came distributed version control systems, DVCS, such as Git, Mercurial, Bazaar or Darcs. The repository (opslagplaats van de versie historiek) wordt gekloned en kan vanop eender welk toestel dat de historiek bevat worden hersteld naar de server.

Git is snel en heeft ondersteuning voor niet-lineaire ontwikkeling, dus met duizenden parallelle takken (branches).

## How it works
Elke keer dat je commit (de status van je project in Git opslaat) wordt er als het ware foto van de toestand van al je bestanden op dat moment genomen en wordt er een verwijzing naar die foto opgeslagen. Uit oogpunt van efficientie slaat Git ongewijzigde bestanden niet elke keer opnieuw op, alleen een verwijzing naar het eerdere identieke bestand dat het eerder al opgeslagen had. 

Git beschouwt gegevens als een reeks van snapshots.

### Integrity
Elk bestand in Git krijgt een controlegetal (checksum) voordat het wordt opgeslagen en er wordt later met dat controlegetal naar gerefereerd. Dat betekent dat het onmogelijk is om de inhoud van een bestand of directory te veranderen zonder dat Git er weet van heeft en ook dat je elke handeling eenvoudig ongedaan kan maken.

Het controlegetal wordt gegenereerd met een hash, dat is een tekenreeks van 40 karakters door een algoritme gegenereerd.

## File status
Drie toestanden voor bestanden: COMMITED, MODIFIED, STAGED.
- COMMITED: alle data is veilig opgeslagen in de repository.
- MODIFIED: bestand is gewijzigd maar nog niet is opgeslagen in de repository of lokale database.
- STAGED: je hebt aangegeven dat je gewijzigde bestand moet worden meegegenomen in de volgende commit.

Wat heb je veranderd maar nog niet gestaged? En wat heb je gestaged en sta je op het punt te committen? Waar `git status` deze vragen heel algemeen beantwoordt door de bestandsnamen te tonen, laat `git diff` je de exacte toegevoegde en verwijderde regels zien, de patch, als het ware.

## Git Flow
With Git Flow there are two main branches: MASTER and DEVELOPMENT. Master contains the production ready code as in a normal git setup. In parallel there is a development branch that contains new features and future release versions. 

A new feature can be moved from the dev branch to the master branch if approved while the development process for a new redesign continues on the dev branch. 

Similarly, a hot fix branch can be opened on the master branch and upon completion it can be added to the dev branch to include this fix in the future versions of the app.