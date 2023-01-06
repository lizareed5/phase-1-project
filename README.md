# Record Rater
Phase 1 Project: JavaScript, HTML, CSS, JSON

<!-- ## Table of Contents
- [Introduction] (#introduction)
- [Functions] (#functions) -->

## INTRODUCTION
The Record Rater app allows users to view and interact with different music albums.  

## REPO
* GitHub Repository: https://github.com/lizareed5/phase-1-project

## API
* [JSON Server](https://github.com/learn-co-curriculum/json-server-template)

## TECHNOLOGIES
* JavaScript
* HTML
* CSS
* JSON  

## FEATURES
### Backend API Points
METHOD | ENDPOINT | DESCRIPTION
------ | ---------| -----------
GET | /albums | fetches a list of albums and its data from the database
POST | /albums/id | keep a new review and a new album
DELETE | /albums/id | deletes an album from the database

## FUNCTIONALITY
The Record Rater app allows users to view albums and songs on the homepage, like/unlike the album, add a rating, add a review, add a new album, and delete an album.
* User can view the songs/albums of artist
* User can add a new review
* User can add a new rating and the website will take an average of all ratings
* User can add a new album
* User can like/unlike an album
* User can delete an album
* User can toggle between light and dark mode

## A FEW FUNCTIONS...
*  `getAlbums()` sends a GET fetch request to the server and gathers the albums data. It then calls `renderAlbums()`.
* `renderAlbums()` creates an image, sets it to the album's image from the database, and renders all album images to the top nav bar on the DOM. Next, it creates an click `eventListener` on each image that populates all of the album's information using `mainAlbumInfo`.
* `mainALbumInfo()` sets the HTML attributes to the album's information from the database
* `addAlbum()` allows the user to submit a form and calls in `keepNewAlbum()` which makes a POST request and calls in `renderAlbums()` which adds it to the DOM and the server permanently.

## PROJECT STATUS
* Our project is in *development*. We are currently adding more functionality and fixing bugs.

## ROOM FOR IMPROVEMENT
* Improve functionality with the POST and DELETE requests with ratings, reviews, and albums
* Improve overall design and layout of the page so it flows more nicely
* Create edit button for reviews

## SERVER SETUP
1. Clone [repository] (https://github.com/lizareed5/phase-1-project)
2. Run `npm run dev`
