// add eventlistener for DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", () => {
    getAlbums()
    addReview()
    addAlbum()
    addRating()
    handleLike()
    // deleteAlbum()
})

// set our consts e.g. (const url = "http://localhost:3000", const album = ... , const artist = ...)

const url = "http://localhost:3000/albums"
let albumList = document.querySelector("#album-list")
// let albumImg = document.querySelector("#nav-img")
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
let addAlbumForm = document.querySelector("#new-album")
let newRatingForm = document.querySelector("#new-rating")
let ratingAvrg = document.querySelector("#average-rating-amt")
let toggleBtn = document.querySelector("#light-dark-mode-toggle")
let deleteBtn = document.querySelector("#delete")
let globalAlbum

// fetch request on url
const getAlbums = () => {
    fetch(url)
    .then(response => response.json())
    // use .map to itirate over data
    .then((data) => {
        data.map(currentAlbum => renderAlbums(currentAlbum))
        mainAlbumInfo(data[0])
        globalAlbum = data[0].id
    })
}

// create function to add images to "nav" element from html
// make an eventlistener to images shown to display details and make image larger on "body html" element
const renderAlbums = (currentAlbum) => {
    let albumImg = document.createElement("img")
    albumImg.src = currentAlbum.image
    albumImg.alt = currentAlbum.albumTitle
    albumList.appendChild(albumImg)
    albumImg.addEventListener("click", () => {
        mainAlbumInfo(currentAlbum)
        globalAlbum = currentAlbum.id
        // console.log(globalAlbum)
    })
}

// create function to pull up album info into the main album that's been clicked
const mainAlbumInfo = (album) => {
    albumMainImg.src = album.image
    albumMainImg.alt = album.name
    albumTitle.innerText = album.name
    albumArtist.innerText = album.artist
    ratingAvrg.innerText = album.rating + `/10`
    album.tracks.forEach(track => {
        let songLi = document.createElement('li')
        songLi.innerText = track
        trackList.append(songLi)
    })
    artistName.innerText = album.artist
    albumDesc.innerText = album.description
    album.reviews.forEach(review => {
        let reviewLi = document.createElement('li')
        reviewLi.innerText = review
        albumRev.append(reviewLi)
    })
    liked.textContent = album.liked? "liked":"not liked"
}

// create a submit button that allows user to add review
const addReview = () => {
    newReviewForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newReview = document.createElement('li')
        newReview = e.target.review.value
        albumRev.append(newReview)
        keepReview(newReview)
    })
}

const keepReview = (globalAlbum) => {
    fetch(`${url}/${globalAlbum}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newReview),
    }
    )}

// add edit button to change their review: PATRICK

// add a new album, render new album, keep new album
const addAlbum = () => {
    addAlbumForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let albumObj = {
            name: e.target.name.value,
            artist: e.target.artist.value,
            tracks: e.target.tracks.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            description: e.target.description.value,
            reviews: e.target.reviews.value
            //tracklist and rating aren't working rn
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
            ratingAvrg.innerText = e.target.rating.value
        })
}


// add delete button to delete their album: PATRICK
// const deleteAlbum = (albumObj) => {
    // fetch (`${url}/${globalAlbum}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(albumObj),
//     })
//     deleteBtn.addEventListener("click",() => {
//         deleteAlbum(albumObj) 
//      })
// }

// like button should toggle liked/unliked
const handleLike = () => {
    liked.addEventListener('click', (albums) => {
        console.log(globalAlbum)
        albums.liked = !albums.liked
        liked.textContent = albums.liked? "liked":"not liked"
    })
}

// light and dark mode toggle button at the top of the page (header): PATRICK

const toggle = document.getElementById('light-dark-mode-toggle');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    
})