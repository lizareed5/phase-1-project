// add eventlistener for DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", () => {
    getAlbums()
    addReview()
    revealAlbumForm()
    addAlbum()
    addRating()
    handleLike()
    deleteAlbum()
    lightDarkMode()
})

// set our consts
const url = "http://localhost:3000/albums"
let albumList = document.querySelector("#album-list")
let albumHeaderLogo = document.querySelector(".album-covers")
let albumInfo = document.querySelector("#album-info")
let albumTitle = document.querySelector("#title")
let albumArtist = document.querySelector("#artist")
let liked = document.querySelector("#like-btn")
let albumMainImg = document.querySelector("#main-image")
let trackList = document.querySelector("#track-list")
let albumDesc = document.querySelector("#album-bio")
let artistName = document.querySelector("#artist-name")
let albumRev = document.querySelector("#review-list")
let editBtn = document.querySelector("#edit-review")
let newReviewForm = document.querySelector("#new-review")
let newReviewBtn = document.querySelector("#review-btn")
let newAlbumBtn = document.querySelector("#add-a-new-album")
let addAlbumForm = document.querySelector("#new-album")
let newRatingForm = document.querySelector("#new-rating")
let ratingAvrg = document.querySelector("#average-rating-amt")
let avrgRatingTitle = document.getElementById('average-rating-title')
ratingAvrg.setAttribute("id", "rating-avrg")
let toggleBtn = document.querySelector("#light-dark-mode-toggle")
let deleteBtn = document.querySelector("#delete")
let globalAlbum
let albumId
let currRating
let likedAlbum
let albumReviews = []
let albumsArray = []
let albumImg

// fetch request on url
const getAlbums = () => {
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        data.map(currentAlbum => renderAlbums(currentAlbum))
        mainAlbumInfo(data[0])
        globalAlbum = data[0]
        albumId = data[0].id
        albumsArray = data
    })
}

// create function to add images to "nav" element from html
// make an eventlistener to images shown to display details and make image larger on "body html" element
const renderAlbums = (currentAlbum) => {
    albumImg = document.createElement("img")
    albumImg.src = currentAlbum.image
    albumImg.alt = currentAlbum.albumTitle
    albumList.appendChild(albumImg)
    albumImg.addEventListener("click", () => {
        mainAlbumInfo(currentAlbum)
        albumId = currentAlbum.id
        imgList = currentAlbum.image
        globalAlbum = currentAlbum
        likedAlbum = currentAlbum.liked
        currRating = currentAlbum.rating
    })
}

// create function to pull up album info into the main album that's been clicked
const mainAlbumInfo = (album) => {
    albumMainImg.src = album.image
    albumMainImg.alt = album.name
    albumTitle.innerText = album.name
    albumArtist.innerText = album.artist
    ratingAvrg.innerText = album.rating + `/10`
    trackList.innerText = " "
    album.tracks.forEach(track => {
        let songLi = document.createElement('li')
        songLi.innerText = track
        trackList.append(songLi)
    })
    artistName.innerText = album.name
    albumDesc.innerText = album.description
    albumRev.innerText = " "
    album.reviews.forEach(review => {
        let reviewLi = document.createElement('li')
        reviewLi.setAttribute("id", "lists")
        reviewLi.innerText = review
        albumRev.append(reviewLi)
    })
    liked.textContent = album.liked? "liked":"unliked"
}

// create a submit button that allows user to add review
const addReview = () => {
    newReviewForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newReview = {reviews: [...globalAlbum.reviews, e.target.review.value]}
        // console.log(newReview)
        // albumReviews = globalAlbum.reviews
        // console.log(albumReviews)
        // albumReviews.push(newReview)
        // let newReview = document.createElement('li')
        // newReview.innerText = e.target.review.value
        // albumRev.append(newReview)
        keepReview(newReview)
    })
}

const keepReview = (newReview) => {
    fetch(`${url}/${albumId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newReview),
    })
    }

// add a new album, render new album, keep new album
const revealAlbumForm = () => {
    document.getElementById("new-album").style.display = "none"
    newAlbumBtn.addEventListener("click", () => {
        console.log("click")
        if (addAlbumForm.style.display === "none") {
            addAlbumForm.style.display = "block"
        } else {
            addAlbumForm.style.display = "none"
        }
        })
    }

const addAlbum = () => {
    addAlbumForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newTrackList = e.target.tracks.value.split(',')
        let newReviews = e.target.reviews.value.split(',')
        let albumObj = {
            name: e.target.name.value,
            artist: e.target.artist.value,
            tracks: newTrackList,
            image: e.target.image.value,
            description: e.target.description.value,
            rating: e.target.rating.value,
            reviews: newReviews,
            liked: false
        }
        keepNewAlbum(albumObj)
    })
}

const keepNewAlbum = (albumObj) => {
    fetch (url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(albumObj),
    })
    renderAlbums(albumObj)
}

// add a new rating
const addRating = () => {
    newRatingForm.addEventListener("submit", (e) => {
        e.preventDefault()
        currRating.push(e.target.rating.value)

        console.log(currRating)
        let ratingAvg = 0
        for(let i = 0; i < currRating.length; i++){
            ratingAvg += parseInt(currRating[i])
        }
        ratingAvg = (ratingAvg / currRating.length).toFixed(2)
        ratingAvrg.innerText = ratingAvg + `/10`
        })
}

// add delete button to delete their album
const keepDeleteAlbum = () => {
    fetch(`${url}/${albumId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => { 
        
        renderAlbums({ 
            name: '',
            artist: 0,
            tracks: '',
            image: '',
            reviews: ''
        })
    })
}

const deleteAlbum = () => {
    deleteBtn.addEventListener("click", (globalAlbum) => {
        albumsArray.splice(albumId-1, 1)
        console.log(albumImg)
        albumImg.remove()
        albumsArray.forEach(currentAlbum => mainAlbumInfo(currentAlbum))
        mainAlbumInfo(albumsArray[0])
        keepDeleteAlbum(globalAlbum)
    })
}

// like button should toggle liked/unliked
const handleLike = () => {
    liked.addEventListener('click', (albums) => {
        // console.log(likedAlbum)
        likedAlbum = !likedAlbum
        if(likedAlbum){
        liked.textContent = "unliked"
        }
        else{
        liked.textContent = "liked"
        
        }}
    )
}

// light and dark mode toggle button at the top of the page (header)
const toggleSwitch = document.getElementById('toggle-switch');
const body = document.body;
const submitButtons = document.querySelector('.button');

const lightDarkMode = () => {
    toggleSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        submitButtons.classList.toggle('dark-mode-submit');
    })
}