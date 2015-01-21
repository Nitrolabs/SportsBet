SportsBet
==========
Meteor prototype of our sports betting app

Installation
--------------
```sh
# Install meteor
curl https://install.meteor.com | /bin/sh

# Clone the repo
git clone https://github.com/NitroLabs/SportsBet.git

# Run the app
cd sportsbet
meteor --settings config/development/settings.json

# The app might fail to build the first time
# Press ctrl+c to kill it and then run meteor again
```

Deployment
--------------
All deployment is handled by [mup](https://github.com/arunoda/meteor-up) for deployment
Deployment configuration is located in the .deploy folder
The .deploy folder also contains the ssh key file to access a ubuntu[small] webserver on AWS

1) install meteor-up
```sh
npm install -g mup
```
2) (optional) Edit deploy file at /.deploy/mup.json

3) Push code to AWS
```sh
mup deploy
```


Packages
--------
* Meteoric [github](https://github.com/meteoric/meteor-ionic) for the UI
* iron:router [github](https://github.com/EventedMind/iron-router) for navigation
* accounts-facebook [docs](http://docs.meteor.com/#/full/accounts_api) for social
* meteor-collection2 [github](https://github.com/aldeed/meteor-collection2) for models
* meteor-up [github](https://github.com/arunoda/meteor-up) for deployment

 
Privacy Policy
--------------
* Source code is private
* The prototype can be exposed at any public url?
