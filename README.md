# aframesandbox
This project is a personal sandbox for experimenting with A-Frame.

I am currently experimenting with hot swapping entities in a networked aframe environment.

## Installation
> npm install

## Run
> npm start

Load two browser windows at localhost:8080. Modify the templates/subscene.html file and see the scene change on both your clients, without the page reloading!

## Updates
### August 1st, 2017
Since getting the basic hotswapping, I created a prototype webpack plugin that lets you manually trigger the changes webpack sees. This lets you modify templates without triggering unwanted changes. My next goal is to make the scene something worth spending time in. I'm thinking some simple persistent sandbox environment. With that in place, I will focus on the hot swapping again. I need to setup hotswapping with component callbacks and parts of networked entities/templates. Once all that is in place, I want to make the hotswapping setup as simple as possible, hopefully as simple as running the build system with a regular aframe setup on glitch.
