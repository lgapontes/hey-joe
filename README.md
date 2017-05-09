# Hey-Joe
**Who loves, cares ... and keeps caring!**
<br>

<a href="https://github.com/lgapontes/hey-joe"><img src="http://linu.com.br/hey-joe/logo-readme-git.png"  align="left" hspace="11" vspace="8"></a>

<br>
Middleware for NodeJS monitoring (under construction).
<br>
With this component you will be able to monitor your <a href="https://nodejs.org/en/">NodeJS</a> application and the server where it is hosted. Hey-Joe is a module that should be integrated into <a href="https://www.npmjs.com/package/express">Express</a>, but with very little overhead on your system. It has easy installation, has very simple configuration and is open to the community to evolve. Hope you like!
<br><br><br>


### One Step Installation
Installation can be done via <a href="https://www.npmjs.com/"> npm </a> with the command below:

```
npm install hey-joe
```

Caution: If an error occurs while installing the project packages related to node-gyp, execute the following commands:

```
sudo apt-get install node-gyp
```

### One Step Configuration
Add the code below in your application. This code is the call of Hey-Joe Middleware.

```
app.use('/hey-joe',require('hey-joe')({}));
```

### How to access
Hey-Joe publishes a single page in the URL "/hey-joe" from the root of the project. Upon accessing it, you will see something similar to the one below:

<img src="http://linu.com.br/hey-joe/screenshot-0.0.6.png" />


### Customizing the parameters
It is possible to customize the parameters used in the status of the monitoring variables. There are 5 possible statuses:

* Loading: displayed only during initial loading;
* Stable: indicates that the system is stable, according to the established values;
* Unstable: indicates that there is excessive use of the resource, but not yet urgent;
* Dangerous: the system is in a dangerous status, almost at the limit of use;
* Error: occurs when it is not possible to obtain data from the resource, either because of a general failure, or because the system has reached a critical use status.

Customization can be done in the "stable" and "unstable" parameters. Hey-Joe monitors the following monitoring variables:

* cpu: percentage of CPU usage;
* requests: number of concurrent requests on the server;
* disk: percentage of disk usage.

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
    },
    disk: {
        stable: 50,
        unstable: 70
    }
}));
```

For example, setting the value 60 to the "stable" status of the CPU will report the status "stable" as long as it is less than or equal to 60% CPU usage. The same rule is valid for the other variables.

### Next features (coming soon, in version 0.1.0)

* Many other types of monitoring variables, such as server memory and NodeJS, network traffic, average time of requests, etc;
* Interface improvements to improve notification of potential issues;
* Hey-Joe API documentation;
* Improved parameter customization.

### Prerequisites
* [NodeJS](https://nodejs.org/en/): Obviously, to run everything, including this middleware.
* [Express](https://www.npmjs.com/package/express): The best NodeJS framework.
* [JQuery](https://jquery.com/): no comments...
* [lowdb](https://www.npmjs.com/package/lowdb): A NoSQL database that stores JSON's in a local file.
* [cors](https://www.npmjs.com/package/cors): Enable CORS on Express.
* [diskusage](https://www.npmjs.com/package/diskusage) and [node-gyp](https://www.npmjs.com/package/node-gyp): Library to check total hard drive usage. I explicitly mentioned "node-gyp" because it is a dependency on "diskusage" and sometimes it has errors in the installation. If this happens, run the "sudo apt-get install node-gyp" command and try again.
* [os-utils](https://www.npmjs.com/package/os-utils): Library for operating system data.

### Cool Sites
* [Many icons for web](https://icomoon.io/): Site where I got some of the icons used in this middleware.
* [Compress PNG](http://compresspng.com/): Site to compress PNG images.