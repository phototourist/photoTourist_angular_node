# PHOTOTOURIST: Project using angular and nodeJS
We are going to implement **PHOTOTOURIST**. 

The idea of this project is to locate some photographic points called *"CamTourist"* in one of the available cities.

LIVE DEMO:**[PhotoTourist](https://josando.tk:3000/)**.
##Introduction
##Technical notes
The whole project has been structured based on **John Papa's style guide**. This project is created with differents types of code languages and frameworks. 
###John Papa's Style Guide
For the first time we have structured our project with the [John Papa's Style Guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1). It's an interesting way of working in AngularJs. We recommend you to learn more about *John Papa*.

[![Foo](https://www.gravatar.com/avatar/0d3794fe37746ea54926ca6878712721?s=250&d=mm&r=x)](https://johnpapa.net/)
###Server
We used in the Server the framework **[node.js](https://nodejs.org/)**. Is a server-side, event-based Javascript environment. Actually it's a programming language very fashionable for its speed. 

![Foo](https://jeanlescure.io/img/logo-node.png)

###Client
In the client part, we have decided to use **[AngularJs](https://angularjs.org/)**. This languague is a good framework Because it performs different tasks simply. It can generate views, use of data binding, routes, organization of components in modules, communication with the server ...

![Foo](http://stridecoder.com/wp-content/uploads/2016/04/angular.png)

The project has also used **html**, **css** and **sass-css**.

###Deploy project automatically
Everytime we do a push to master branch on github DEMO: gets updated with latest changes. We have created an app on heroku and We've linked to our gitthub repository.

##Implement Free Certificate with Let's Encrypt
We have implemented the free security certificate for our project. The Let's Encrypt service offers the possibility to do it simply. 

![Foo](https://deductivelabs.com/wp-content/uploads/2016/02/Let%E2%80%99s-Encrypt-250x250.jpg)

###What is Let's Encrypt?
**[Let's Encrypt](https://letsencrypt.org/)** is a free, automated and open certification authority (CA), which is run for the benefit of the public by the Internet Security Research Group (ISRG). This makes it possible to obtain browser trust certificates for your free domains that are renewed automatically every 90 days.
####Installing Let's Encrypt
There are different ways to install free certification. We choose to do it with the terminal. The official web Let's Encrypt helps to install through **[Certbot](https://certbot.eff.org/)**. 

##Prerequisites

1.Install Node.js

* on OSX use [homebrew](https://brew.sh/) 'brew install node'
* on Windows use [chocolatey](https://chocolatey.org/) 'choco install nodejs'

2.Install Yeoman 'npm install -g yo'

3.Install these NPM packages globally
> 'npm install -g bower gulp nodemon'
 **Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)**
 
## Running PhotoTourist. HotTowel

### Linting
 - Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev`

 - opens it in a browser and updates the browser with any files changes.

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

## Any Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

 
