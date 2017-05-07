# Hey-Joe
**Who loves, cares ... and keeps caring!**
<br>

<a href="https://github.com/lgapontes/hey-joe"><img src="http://linu.com.br/hey-joe/logo-readme-git.png"  align="left" hspace="11" vspace="8"></a>

<br>
Middleware for NodeJS monitoring.
<br>
With this component you will be able to monitor your <a href="https://nodejs.org/en/">NodeJS</a> application and the server where it is hosted. Hey-Joe is a module that should be integrated into <a href="https://www.npmjs.com/package/express">Express</a>, but with very little overhead on your system. It has easy installation, has very simple configuration and is open to the community to evolve. Hope you like!
<br><br><br>


### One Step Installation
Installation can be done via <a href="https://www.npmjs.com/"> npm </a> with the command below:

```
npm install hey-joe
```

### One Step Configuration
Add the code below in your application. This code is the call of Hey-Joe Middleware.

```
app.use('/hey-joe',require('hey-joe')({}));
```

### How to access
Hey-Joe publishes a single page in the URL "/hey-joe" from the root of the project. Upon accessing it, you will see something similar to the one below:

<img src="http://linu.com.br/hey-joe/screenshot.png" />


### Customizing the parameters
It is possible to customize the parameters used in the status of the monitoring variables. There are 5 possible statuses:

* Loading: displayed only during initial loading;
* Stable: indicates that the system is stable, according to the established values;
* Unstable: indicates that there is excessive use of the resource, but not yet urgent;
* Dangerous: the system is in a dangerous status, almost at the limit of use;
* Error: occurs when it is not possible to obtain data from the resource, either because of a general failure, or because the system has reached a critical use status.

Customization can be done in the "stable" and "unstable" parameters. Hey-Joe monitors the following monitoring variables:

* cpu: percentage of CPU usage;
* requests: number of concurrent requests on the server.

Here are some configuration examples:

```
app.use('/hey-joe',require('hey-joe')({
    cpu: {
        stable: 60,
        unstable: 80
    },
    requests: {
        stable: 1000,
        unstable: 2000
    }
}));
```

For example, setting the value 60 to the "stable" status of the CPU will report the status "stable" as long as it is less than or equal to 60% CPU usage. The same rule is valid for the other variables.

### Next features (coming soon, in version 0.0.2)

* Many other types of monitoring variables, such as server memory and NodeJS, network traffic, average time of requests, etc;
* Interface improvements to improve notification of potential issues;
* Hey-Joe API documentation;
* Improved parameter customization.

### Prerequisites
* [NodeJS](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [JQuery](https://jquery.com/)
* [lowdb](https://www.npmjs.com/package/lowdb)

### Cool Sites
* [Many icons for web](https://icomoon.io/)
* [Compress PNG](http://compresspng.com/)