# Delivery Tracker 
[![Build Status][travis-ci-image]][travis-ci-url] [![Code Climate][code-climate-image]][code-climate-url] [![Coverage Status][coveralls-image]][coveralls-url]

[travis-ci-url]: https://travis-ci.org/chrisleedavis/deliverytracker
[travis-ci-image]: https://api.travis-ci.org/chrisleedavis/deliverytracker.svg

[code-climate-url]: https://codeclimate.com/github/chrisleedavis/deliverytracker
[code-climate-image]: https://codeclimate.com/github/chrisleedavis/deliverytracker/badges/gpa.svg

[coveralls-url]: https://coveralls.io/github/chrisleedavis/deliverytracker?branch=master
[coveralls-image]: https://coveralls.io/repos/chrisleedavis/deliverytracker/badge.svg?branch=master&service=github

## Description
Delivery Tracker is a system designed to provide consumers with the ability to view the person delivering their good or service

### Dependencies
| Area              | Technology                                                    |
|-------------------|---------------------------------------------------------------|
| Responsive Design | [angular material](https://material.angularjs.org/latest/)    |
| SPA               | [angular 1.4.7](https://angularjs.org/)                       |
| Server            | [node 4.2.1](https://nodejs.org/en/)                          |
| Database          | [mongo](https://www.mongodb.org/)                             |

### Environment Configuration
./src/server/config/config.js should be used to configure environment

#### sample config.js
```
module.exports = {

    secureTransporter: {
        auth: "YOUR AUTH TOKEN HERE",
        sender: "YOUR SENDER HERE"
    },

    databaseUrl: "YOUR DB URL HERE",
    databaseStartCommand: "YOUR START COMMAND HERE",
    secret: "YOUR JWT SECRET HERE"

};
```

#### theme support
- add your custom them within the theme dir, THEN

```
npm start --theme=[YOUR THEME HERE]
```


OPEN ISSUES:

1.  disable login if errors occur
2.  log creation requires token
3.  DONE     login screen extra button
4.  DONE     username in user model needs to be fixed/changed to email
5.  DONE   center body elements on login and register