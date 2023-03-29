# Vakary-Web

## Table of Contents
- [Vakary-Web](#vakary-web)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Structure](#structure)
    - [utils/](#utils)
    - [Store/](#store)
    - [Router/](#router)
    - [Plugins/](#plugins)
    - [Locales/](#locales)
    - [components/Page/](#componentspage)
    - [components/UI/](#componentsui)
    - [components/Style/](#componentsstyle)
  - [Tests](#tests)
  - [Credits](#credits)

## Description

This the web part of the Vakary project.

Vakary is an application made for tourist, the goal is to be able to generate a intinerary for wherever you want and which is based on what you like.

The Web part of this project is made using Vuejs 3, also there is two mobile version one for Android and one for IOS.


## Installation

Recommended IDE Setup
```
VSCode.
```

Project Setup
```
npm install
```

Compile and Hot-Reload for Development
```
npm run serve
```

Then the project should be available on
```
[http](http://localhost:8080/):
```

## Structure

At the root we have all configuration file

The test folder contain all test currently available on the web

inside src/ folder you have multiple important part

### utils/

Contains utility file, it is very usefull because it impact all the project. For example if you change the address of the api you just have to change serverAdress variable and it will affect all the project

### Store/

Here are were all global variable and global function are accessible.

If you are looking for specific data about the user then it will be stored inside the userStore.js file

If you are looking for request made to the API then it is stored inside the apiStore.js file

### Router/

Here is were all our route are stored, currently there is a basic guarding to prevent user that are not logged in to connect to the important part of the project

### Plugins/

Here are stored plugins used mainly for design purposes

### Locales/

Here are stored file of different languages, for now only the english and french language are available.
We plan to add more language in the future.

Currently we use i18n to change and store language

### components/Page/

This folder contains all of our pages.

ForgetPassword -> Page for password reset

Inscription page -> Page to create an account

LandingPage -> first page a first time user see, it contains the presentation of the project

LoginPage -> Page to connect a user

MapPage -> Most important page containing the map and display of all itinerary

MobilePage -> Presentation of the Mobile

ProfilePage -> user have access to their profile here

VakaryWeb -> Presentation of the web part

### components/UI/

Contain all the UI element of the project. For example an element that is multiple time on the same page or an element present on differents pages

CardsReview -> User review

CreateGroup -> Form to create a new group

itineraryExplanation -> card that display information about your itinerary

mapCards -> Cards that display information about the current point of interest

ShowMembers -> Display one member of a group and some information available on its profile

topBar -> Top bar on the first page before user connection

### components/Style/

Here are all .scss file and design that can be shared between components

Button -> contain all button design

Image -> contain image scale

Main -> contain the font used on all the website and animation

Position -> Contain different position for different elements

Text -> Contain design and size of text

## Tests

To launch test you simply have to run this command:
```
npm run test:unit
```
It will run all the test available on the project

If you want to only run test on one file run this:
```
npm run test:unit "tests/unit/XXX"
```


## Credits

Vakary as been created by a team of 10 peoples and the web as been made mostly by two peoples:
- Tom Wederich (TheGorb):
  - Worked on the web scraping of datatourisme
  - Creation of the first DB containing datatourisme data
  - Creation of the first algorithm to generate itinerary
  - Worked on the Web design
  - Created the page of the map on the web side
  - Linking the web front and backend

- Pierre Fricker (Exy-tek)
  - Creation of the group feature on the web
  - Creation of the profile feature on the web
  - Worked on the web design
  - Responsive specialist
  - Mobile & Web presentation page
  - Itinerary creation Page