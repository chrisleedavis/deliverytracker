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
<<<<<<< HEAD
        auth: "YOUR AUTH TOKEN HERE"
        },
=======
        auth: "YOUR AUTH TOKEN HERE",
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
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

<<<<<<< HEAD
TODOS
1.  DONE  convert password confirmation format to hidden (input type='password')
2.  DONE    remove username, remove email confirmation (username IS email)
3.  code coverage for "new stuff" (signUp, etc.)
	a)  DONE   compareTo directive
	b) DONE    signUp controller - 
	c) DONE    emitLoginModel
	d) 
4.  DONE   styling issues on login - get rid of scroll.  modify signin-toolbar top position rule
5.  DONE    styling on register - too much padding on form.  see above for fix
6.  DONE   client side validation for password confirmation, email syntax

7. FUTURE - server side validation for sign up
8. 
9. 
=======
>>>>>>> 6e9e0b22bfc1503dbbb8653dc253a5ee0b5478ba
