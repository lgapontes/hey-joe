# Hey-Joe (beta)
**Who loves, cares ... and keeps caring!**
<br>
**Pay attention**: we are in beta version. Soon (a few days) we will have added other monitoring variables (the black boxes of the screenshot below). I promise to put at least another 3 per week.
<br>

<a href="https://github.com/lgapontes/hey-joe"><img src="http://linu.com.br/hey-joe/logo-readme-git.png"  align="left" hspace="11" vspace="8"></a>

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

Caution: If an error occurs while installing the project packages related to node-gyp, execute the following commands:

```
sudo apt-get install node-gyp
```

### One Step Configuration
Add the code below in your application. This code is the call of Hey-Joe Middleware with the "use" method of Express.

```
app.use(require('hey-joe'));
```

### How to access
Hey-Joe publishes a single page in the URL "/hey-joe" from the root of the project. Upon accessing it, you will see something similar to the one below:

<img src="http://linu.com.br/hey-joe/screenshot-0.0.11.png" />


### Customizing the parameters
It is possible to customize the parameters used in the status of the monitoring variables. There are 5 possible statuses:

* loading: displayed only during initial loading;
* stable: indicates that the system is stable, according to the established values;
* unstable: indicates that there is excessive use of the resource, but not yet urgent;
* dangerous: the system is in a dangerous status, almost at the limit of use;
* error: occurs when it is not possible to obtain data from the resource, either because of a general failure, or because the system has reached a critical use status.

The customization of the rules for obtaining the status of the monitoring variables can be accomplished by changing the "custom-rules.js" file located in the Hey-Joe middleware root (node_modules/hey-joe). When you open this file, you will see the following code:

```
var customRules = {
    monitoringVariables: {
        cpu: {
            status: function(value) {
                if (value < 70) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        /* other configuration... */
    }
};
```

By the "status" functions available within each monitoring variable you can change the variable status calculation rule. Currently Hey-Joe works with the following monitoring variables:

* cpu: percentage of CPU usage;
* requestsMeanTime: calculates the average time of requests http. The graph displays the values in milliseconds, indicating the best time, the mean time, and the worst time;
* requests: number of concurrent requests on the server. In this case, the Hey-Joe middleware requisitions are counted;
* requestsPerHour: Indicates the total number of requests per hour. In this case, Hey-Joe middleware requests are NOT counted;
* kbytesPerMinute: Total KBytes downloaded by users per minute. This variable also considers the data (REST api and static content) used by Hey-Joe;
* disk: percentage of disk usage.

See below for an example configuration where the "status" function of the cpu variable will always return "stable" if it has less than 30% processing. Otherwise, it returns "dangerous".

```
var customRules = {
    monitoringVariables = {
        cpu: {
            status: function(value) {
                if (value < 30) return "stable";
                else return "dangerous";
            }
        },
        /* other configuration... */
    }
};
```

Note that the returned status must be written in the lower case. Rules like this can be adjusted for any other variables. Adjust them according to the reality of your server and be happy!

### Colors and flavors

As you will see, Hey-Joe background changes color according to the behavior of his monitoring variables. The color will always indicate the worst status among the variables. The colors used are:

* Gray: only during the first reading of the variables;
* Blue: indicates that all variables are stable, according to the rules defined in the "custom-rules.js" file;
* Light brown: indicates that one or more variables are unstable. Not so bad, but stay tuned;
* Orange: indicates a dangerous status to the system (according to its rules). If it continues to get worse, it could lead to a denial of service;
* Red: call the administrators! Your server is off or extremely compromised. Caution: If there is a code error in the "custom-rules.js" file, this color will also be displayed.

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
* [Chartist.js](https://gionkunz.github.io/chartist-js/): Very light graphics library.
* [moment.js](https://momentjs.com/): Date manipulation library.
* [is-buffer](https://www.npmjs.com/package/is-buffer): Determine if an object is a Buffer.
* [utf8](https://www.npmjs.com/package/utf8): utf8.js is a well-tested UTF-8 encoder/decoder written in JavaScript.

### Cool Sites
* [Many icons for web](https://icomoon.io/): Site where I got some of the icons used in this middleware.
* [Compress PNG](http://compresspng.com/): Site to compress PNG images.