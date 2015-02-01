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
sudo npm install -g mup
```
2) (optional) Edit deploy file at /.deploy/mup.json

3) Push code to AWS
```sh
# Move to the deploy folder
# To deploy to other machines we can copy and rename this folder
cd .deploy 
mup deploy
```

Accessing Production Server
---------------------------
This app is running on a medium ubuntu AWS instance. This instance can be
accessed via ssh:
```sh
sudo ssh -i .deploy/Sportsbet.pem ubuntu@ec2-54-191-204-54.us-west-2.compute.amazonaws.com
# ./deploy/Sportsbet is the location of the private key
# ubuntu is the username

# Occassionally AWS will be upset with the private key permissions
# Changing these permissions will fix the problem
sudo chmod 700 .deploy/Sportsbet.pem

# To erase the database run the following commands on the server
for more info
mongo meteor # Accesses the meteor apps database
db.dropDatabase()
```
See [stackoverflow](http://stackoverflow.com/questions/24372992/how-to-reset-a-meteor-project-thats-been-deployed-with-meteor-up)
for more info about resetting a production database


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
