//The palylist array: songs details and url have been stored in this array 
const playlist = [
  {
  title:'Bohemian Rhapsody',
  singer:'Freddie Mercury',
  year:'1975',
  duration:'',
  album:'A Night at the Opera',
  genre:'Hard rock',
  lyrics:``,
  pic:`1.jfif`,
  url:'https://cdns-preview-1.dzcdn.net/stream/c-17597947a0fdd6e8ea971f146755cd34-13.mp3',
  favorite:false
},
{
  title:'We Will Rock You',
  singer:'Freddie Mercury',
  year:'1977',
  duration:'',
  album:'Live Killers',
  genre:'Hard rock',
  lyrics:'',
  pic:`2.jfif`,
  url:'https://www.naijagreen.com/wp-content/uploads/music/2021/09/Queen_-_We_Will_Rock_You_[NaijaGreen.Com]_.mp3',
  favorite:false
},
{
  title:'We Are The Champions',
  singer:'Freddie Mercury',
  year:'1979',
  duration:'',
  album:'Live Killers',
  genre:'Arena rock',
  lyrics:'',
  pic:`3.jfif`,
  url:'https://cdns-preview-7.dzcdn.net/stream/c-7db6af13d4ef830810c43bc28bf6f779-13.mp3',
  favorite:false
},
{
  title:'Crazy Little Thing Called Love',
  singer:'Freddie Mercury',
  year:'1979',
  duration:'',
  album:'The Game',
  genre:'Rockabilly',
  lyrics:'',
  pic:`4.jfif`,
  url:'https://cdns-preview-c.dzcdn.net/stream/c-ce852e942a9d52502ddc0f2922bdc97c-8.mp3',
  favorite:false
},
{
  title:'Dont Stop Me Now',
  singer:'Freddie Mercury',
  year:'1979',
  duration:'',
  album:'Jazz',
  genre:'Pop rock',
  lyrics:'',
  pic:`5.jfif`,
  url:'https://cdns-preview-c.dzcdn.net/stream/c-c62114bb9ed46619356f9aee5a8d4102-6.mp3',
  favorite:false
},
{
  title:'Somebody To Love',
  singer:'Freddie Mercury',
  year:'1976',
  duration:'',
  album:'A Day at the Races',
  genre:'Rock',
  lyrics:'',
  pic:`6.jfif`,
  url:'https://cdns-preview-9.dzcdn.net/stream/c-9e208326d4114be07cbadc20ee8394c8-8.mp3',
  favorite:false
},
{
  title:'Youre My Best Friend',
  singer:'Freddie Mercury',
  year:'1975',
  duration:'',
  album:'A Night at the Opera',
  genre:'Rock',
  lyrics:'',
  pic:`7.jfif`,
  url:'https://cdns-preview-d.dzcdn.net/stream/c-dec1e38df08f51a46f67e49b0dbcc29a-6.mp3',
  favorite:false
},
{
  title:'Radio Ga Ga',
  singer:'Freddie Mercury',
  year:'1984',
  duration:'',
  album:'The Works',
  genre:'POP Rock',
  lyrics:'',
  pic:`8.jfif`,
  url:'https://www.naijagreen.com/wp-content/uploads/music/2021/08/Queen_-_Radio_Ga_Ga_[NaijaGreen.Com]_.mp3',
  favorite:false
},
{
  title:'Too Much Love Will Kill You',
  singer:'Freddie Mercury',
  year:'1992',
  duration:'',
  album:'Back to the Light',
  genre:'Rock',
  lyrics:'',
  pic:`9.jfif`,
  url:'https://cdns-preview-2.dzcdn.net/stream/c-23cadb95a9707bb26c7c69b6297c180d-6.mp3',
  favorite:false
},
{
  title:`Dont try so hard`,
  singer:'Freddie Mercury',
  year:'1991',
  duration:'',
  album:'Innuendo',
  genre:'Rock',
  lyrics:'',
  pic:`10.jfif`,
  url:'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/9a/cb/e4/9acbe4b9-1f0e-903e-89f7-2d6ba91be31b/mzaf_7265951792807668176.plus.aac.p.m4a',
  favorite:false
}
]

//Define Shortcuts
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const secsToMins = (secs) => `${Math.floor(secs / 60)}:${Math.round(secs % 60).toString().padStart(2, `0`)}`

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


// Load up the playlist with songs
loadPlaylistFromArray(playlist)

// Setup the first song to play
loadSongFromPlaylistByIndex(playingIndex)

})

