// add eventlistener for DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", () => {
    getAlbums()
})

// set our consts e.g. (const url = "http://localhost:3000", const album = ... , const artist = ...)

const url = "http://localhost:3000/albums"
let albumList = document.querySelector("#album-list")
let albumImg = document.querySelector("#nav-img")
let albumHeaderLogo = document.querySelector(".album-covers")
let albumInfo = document.querySelector("#album-info")
let albumTitle = document.querySelector("#title")
let albumArtist = document.querySelector("#artist")
let likeBtn = document.querySelector("#like")
let albumMainImg = document.querySelector("#main-image")
let trackList = document.querySelector("#track-list")
let albumDesc = document.querySelector("#album-bio")
let artistName = document.querySelector("#artist-name")
let albumRev = document.querySelector("#review-list")
let editBtn = document.querySelector("#edit-review")
let newReviewForm = document.querySelector("#new-review")
let newReviewBtn = document.querySelector("#review-btn")
let addAlbumForm = document.querySelector("#new-album")
let newRatingForm = document.querySelector("#new-rating")
let ratingAvrg = document.querySelector("#average-rating-amt")
let toggleBtn = document.querySelector("#light-dark-mode-toggle")
let currentAlbum




// fetch request on url

const getAlbums = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}

// use .map to itirate over data



// create function to add images to "nav" element from html



// make an eventlistener to images shown to display detals and make image larger on "body html" element



// create a submit button that allows user to add review



// add edit button to change their review



// add delete button to delete their review



// light and dark mode toggle button at the top of the page (header)