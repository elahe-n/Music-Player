//Import the palylist array(songs details and url) and utilities 
import { playlist } from './data.js'
import { $, $$, secsToMins } from './utils.js'

// Define Document Elements
const filterForm=document.querySelector(`#filterSongs`)
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const songsEle = $(`#songs`)
const trackVolume = $(`#trackVolume`)
const trackTime = $(`#trackTime`)
const trackDuration = $(`#trackDuration`)
const trackProgress = $(`#trackProgress`)

//Define variables
let playingIndex = 0
const music = new Audio()

const loadSongFromPlaylistByIndex = function(index = 0, start = false) {
  // Assign the incoming index to the playlistIndex
  playingIndex = index
  // Check if the song was already playing (ie, not paused), so we can keep it going after changing the src
  const keepPlaying = !music.paused
  // Change the song source
  music.src = playlist[playingIndex].url
  // Loading up the rest of the data for this song would go here
  // Add .loading to the playing song
  $$(`.playing`).forEach(li => li.classList.remove(`playing`))
  $(`[data-index="${playingIndex}"]`).classList.add(`playing`)
  // Play the new track, if we were already playing (you may not even want to bother checking and just play when a playlist song is clicked)
  if (keepPlaying || start) {
    music.play().then(() => {
      playOrPause.textContent = `⏸`
    })
  }
}

// Produce HTML code for one song 
// If given an Object representing the data for one song, connects the object data with an HTML "view" and appends to the #song element
const appendsong= function(item, index){
    document.querySelector("#songs").innerHTML +=
    `<li class="song" data-index="${index}" >
                    <img class="img" src="img/${item.pic} " alt="${item.title}">
                    <h3 class="track" ><b>${item.title}</b>- ${item.singer} </h3>
                    <h5 class="detail" >Released: ${item.year}&nbsp;&nbsp;&nbsp; Album: ${item.album} &nbsp;&nbsp;&nbsp; Genre: ${item.genre}</h5>
                    <img class="heart" src="${ (item.favorite) ? `./img/filledheart.svg` : `./img/heart.svg` }" alt="heart">
                    <data value="1" class="duration">${item.duration}</data>
                </li>`                         
}

//Submit the filter
filterForm.addEventListener(`submit`,function(event){
    //Stop form from redirectig or refreshing
    event.preventDefault()
    //Do the filtering 
    filterAndPrint()
})

// Filter and Print songs
const filterAndPrint=function(){ 
    //Get filter values 
    const albumSearch = filterForm.querySelector(`#searchAlbum`).value || ``
    const titleSearch = filterForm.querySelector(`#searchTitle`).value || ``
    //Clear out the existing result 
    document.querySelector(`#songs`).innerHTML=``
    //Filter song title and album name and print for each songs
   playlist
        .filter(item => item.album.toUpperCase().includes(albumSearch.toUpperCase()))
        .filter(item => item.title.toUpperCase().includes(titleSearch.toUpperCase()))
        .forEach(appendsong)
}

// Load up the playlist
const loadPlaylistFromArray = function(pl) {
  pl.innerHTML = ``
  filterAndPrint()
}

const playNextSong = function() {
  // If we're at the end of the playlist, loop to the beginning
  const nextIndex = ((playingIndex + 1) > (playlist.length - 1)) ? 0 : playingIndex + 1
   loadSongFromPlaylistByIndex(nextIndex, true)
}

const playPrevSong = function() {
  // If we're at the start of the playlist, play the beginning song again  
  const prevIndex = ((playingIndex - 1) < 0) ? 0 : playingIndex - 1
   loadSongFromPlaylistByIndex(prevIndex, true)
}

//When document has loaded
window.addEventListener(`load`, function() {
  playOrPause.addEventListener(`click`, function(event) {
    if (music.paused) {
        music.play()
        playOrPause.textContent = `⏸`
    } else {
        music.pause()
        playOrPause.textContent = `▶️`
    }
  })

 // Go to the next and pervious song by click
  playNext.addEventListener(`click`, playNextSong)
  playPrev.addEventListener(`click`, playPrevSong)

// Play the song that has been clicked
  songsEle.addEventListener(`click`, function(event) {
    const songToPlay = event.target
    if (songToPlay.matches(`li`)) {
      playingIndex = Number(songToPlay.dataset.index)
      loadSongFromPlaylistByIndex(playingIndex, true)
    }
})
music.addEventListener(`durationchange`, function(event) {
  trackDuration.textContent = secsToMins(music.duration)
})

//Going to the next song after finishing the playing song 
music.addEventListener(`ended`, playNextSong)

//Update the playing song time
music.addEventListener(`timeupdate`, function(event) {
  trackTime.textContent = secsToMins(music.currentTime)
// Don't update while you're dragging
  if (amDragProgress) return
  trackProgress.value = music.currentTime / music.duration
})

let amDragProgress = false
trackProgress.addEventListener(`input`, function(event) {
  amDragProgress = true
})
trackProgress.addEventListener(`change`, function(event) {
  amDragProgress = false
  music.currentTime = trackProgress.value * music.duration
})

// set song's Volume
const setVolumeTo = function(vol) {
  music.volume = vol
}
// Change the volume
trackVolume.addEventListener(`input`, function(event) {
  setVolumeTo(trackVolume.value)
})
// Set it once to start
setVolumeTo(trackVolume.value)

// Load up the playlist with songs
loadPlaylistFromArray(playlist)

// Setup the first song to play
loadSongFromPlaylistByIndex(playingIndex)

})

