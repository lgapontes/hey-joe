# Hey-Joe [![Build Status](https://travis-ci.org/lgapontes/hey-joe.svg?branch=master)](https://travis-ci.org/lgapontes/hey-joe)
**Who loves, cares ... and keeps caring!**
<br>
**Pay attention**: we are in beta version. At this time (versions 0.1.x) we are checking the consistency of the monitoring variables (the black boxes of the image below) in different operating systems and the portability of the monitoring page between browsers.
<br>

<a href="https://github.com/lgapontes/hey-joe"><img src="https://raw.githubusercontent.com/lgapontes/hey-joe/master/public/img/logo-readme-git.png"  align="left" hspace="11" vspace="8"></a>

<br>
Middleware for NodeJS monitoring.
<br>
With this component you will be able to monitor your <a href="https://nodejs.org/en/">NodeJS</a> application and the server where it is hosted. Hey-Joe is a module that should be integrated into <a href="https://www.npmjs.com/package/express">Express</a>, but with very little overhead on your system. It has easy installation, has very simple configuration and is open to the community to evolve.
<br>
Hope you like!
<br><br><br>


### One Step Installation
Installation can be done via <a href="https://www.npmjs.com/"> npm </a> with the command below:

```
npm install hey-joe
```

### One Step Configuration
Add the code below in your application. This code is the call of Hey-Joe Middleware with the _use_ method of Express.

```javascript
app.use(require('hey-joe'));
```

### How to access
Hey-Joe publishes a single page in the URL _/hey-joe_ from the root of the project. Upon accessing it, you will see something similar to the one below:

<img src="https://raw.githubusercontent.com/lgapontes/hey-joe/master/docs/screenshot.png" />


### Customizing the parameters
It is possible to customize the parameters used in the status of the monitoring variables. There are 5 possible statuses:

* loading: displayed only during initial loading;
* stable: indicates that the system is stable, according to the established values;
* unstable: indicates that there is excessive use of the resource, but not yet urgent;
* dangerous: the system is in a dangerous status, almost at the limit of use;
* error: occurs when it is not possible to obtain data from the resource, either because of a general failure, or because the system has reached a critical use status.

The customization of the rules for obtaining the status of the monitoring variables can be accomplished by changing the _custom-rules.js_ file located in the Hey-Joe middleware root (node_modules/hey-joe). When you open this file, you will see the following code:

```javascript
var customRules = {
    monitoringVariables: {
        cpuOS: {
            status: function(value) {
                if (value < 70) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        /* others configurations... */
    }
};
```

By the _status_ functions available within each monitoring variable you can change the variable status calculation rule. Currently Hey-Joe works with the following monitoring variables:

| Variable | Description |
| --- | --- |
| **cpuOS** | Percentage of CPU usage by Operating System. The calculation of the percentage of use is obtained with the aid of the library [os-utils](https://www.npmjs.com/package/os-utils), comparing use and free values of the CPU.<br>**URL:** /hey-joe/api/0/cpu/os |
| **cpuProcess** | Percentage of CPU usage by NodeJS Process. We use the [pidusage](https://www.npmjs.com/package/pidusage) library to obtain the CPU % used by the current NodeJS process. This library is Cross-Platform and gets this process data through operating system commands.<br>**URL:** /hey-joe/api/0/cpu/process |
| **requestsMeanTime** | Calculates the average time of requests http. The graph displays the values in milliseconds, indicating the best time, the mean time, and the worst time. The request value is obtained through the difference between a timestamp marked on the request entry (as soon as the Hey-Joe Middleware is added) and a timestamp marked on the final response command (Hey-Joe has a filter for this). The sum of all these values divided by the total of requisitions gives us the average value. Among all, the fastest is indicated in the _min_ and the worst in the _top_.<br>**URL:** /hey-joe/api/0/requests/mean-time |
| **requests** | Number of concurrent requests on the server. In this case, the Hey-Joe middleware requisitions are counted. This value is obtained through an internal NodeJS command (socket.server.getConnections).<br>**URL:** /hey-joe/api/0/requests |
| **requestsPerHour** | Indicates the total number of requests per hour. In this case, Hey-Joe middleware requests are NOT counted. This value is obtained through a counter that records all requisitions. Every hour this value is reset.<br>**URL:** /hey-joe/api/0/requests/hour |
| **kbytesPerMinute** | Total KBytes downloaded by users per minute. This variable also considers the data (REST api and static content) used by Hey-Joe. Hey-Joe has a filter that runs on all end events of the Express _response_ object. At this time, all return byte types are calculated. The bytes of the returns are summed and stored in a counter that is cleaned every minute.<br>**URL:** /hey-joe/api/0/kbytes/minute |
| **disk** | Percentage of disk usage. This variable is obtained through the [diskspace](https://www.npmjs.com/package/diskspace) and [windows-cpu](https://www.npmjs.com/package/windows-cpu) libraries. Attention: Hey-Joe will only consider the use of the main disk of the operating system. That is, **/** on Linux and macOS systems and **C:** on Windows systems. If you need to point to another disk, change the value of the _mainDisk_ variable in the _infrastructure/disk.js_ file. See an example: _let mainDisk = '/boot';_<br>**URL:** /hey-joe/api/0/disk |
| **uptimeOS** | The operating system uptime is obtained through the os.uptime() command from the NodeJS internal library.<br>**URL:** /hey-joe/api/0/uptime/os |
| **uptimeProcess** | The uptime of the process by which the NodeJS is executed is obtained through the process.uptime() command from the NodeJS internal library.<br>**URL:** /hey-joe/api/0/uptime/process |
| **residentSetSize** | A running program is always represented through some space allocated in memory. This space is called Resident Set. This variable displays the size (in megabytes) of the Resident Set of the NodeJS over time.<br>**URL:** /hey-joe/api/0/memory/rss |
| **heap** | Heap is a memory segment dedicated to storing reference types like objects, strings and closures. The chart will show current and recent used and total values in megabytes.<br>**URL:** /hey-joe/api/0/memory/heap |
| **processMemory** | Displays the memory used by the NodeJS process (in megabytes) and the total available memory on the server. We use the [pidusage](https://www.npmjs.com/package/pidusage) library to obtain the NodeJS memory and [OS](https://nodejs.org/api/os.html) library to obtain total memory of the server.<br>**URL:** /hey-joe/api/0/memory/process |

**Comments:**
1. The value 0 is the version number of the API, which for the moment is zero.
2. Before the first **/** in URL you should put the address of your website and the appropriate protocol (http or https).

See below for an example configuration where the _status_ function of the cpuOS variable will always return _stable_ if it has less than 30% processing. Otherwise, it returns _dangerous_.

```javascript
var customRules = {
    monitoringVariables = {
        cpuOS: {
            status: function(value) {
                if (value < 30) return "stable";
                else return "dangerous";
            }
        },
        /* others configurations... */
    }
};
```

Note that the returned status must be written in the lower case. Rules like this can be adjusted for any other variables. Adjust them according to the reality of your server and be happy!

### Colors and flavors

As you will see, Hey-Joe background changes color according to the behavior of his monitoring variables. The color will always indicate the worst status among the variables. The colors used are:

* Gray: only during the first reading of the variables;
* Blue: indicates that all variables are stable, according to the rules defined in the _custom-rules.js_ file;
* Light brown: indicates that one or more variables are unstable. Not so bad, but stay tuned;
* Orange: indicates a dangerous status to the system (according to its rules). If it continues to get worse, it could lead to a denial of service;
* Red: call the administrators! Your server is off or extremely compromised. **Caution**: If there is a code error in the _custom-rules.js_ file, this color will also be displayed.

### Prerequisites
* [NodeJS](https://nodejs.org/en/): Obviously, to run everything, including this middleware.
* [Express](https://www.npmjs.com/package/express): The best NodeJS framework.
* [JQuery](https://jquery.com/): no comments...
* [lowdb](https://www.npmjs.com/package/lowdb): A NoSQL database that stores JSON's in a local file.
* [cors](https://www.npmjs.com/package/cors): Enable CORS on Express.
* [diskspace](https://www.npmjs.com/package/diskspace): This is a simple module for Node.js to check disk space usage in bytes on both *nix and Windows systems. Note: In the old versions (0.0.x) we used [diskusage](https://www.npmjs.com/package/diskusage), which is also an excellent library. However, we were having problems installing [node-gyp](https://www.npmjs.com/package/node-gyp), which is one of its dependencies. Installing [node-gyp](https://www.npmjs.com/package/node-gyp) depends on administrator access on the computer and python configuration, a reality that is not always possible on NodeJS servers. If you have problems with [diskspace](https://www.npmjs.com/package/diskspace), please open a Github issue that we will resolve.
* [os-utils](https://www.npmjs.com/package/os-utils): Library for operating system data.
* [Chartist.js](https://gionkunz.github.io/chartist-js/): Very light graphics library.
* [moment.js](https://momentjs.com/): Date manipulation library.
* [express-end](https://www.npmjs.com/package/express-end): Express middleware to emit end event on _res.end()_.
* [pidusage](https://www.npmjs.com/package/pidusage): Cross-platform process cpu % and memory usage of a PID.
* [windows-cpu](https://www.npmjs.com/package/windows-cpu): CPU monitoring utilities for Node.js apps on Windows. It was used to work around an error reading the CPU used in the Windows operating system (fix issue [#25](https://github.com/lgapontes/hey-joe/issues/25)).

### Cool Sites
* [Many icons for web](https://icomoon.io/): Site where I got some of the icons used in this middleware.
* [Compress PNG](http://compresspng.com/): Site to compress PNG images.