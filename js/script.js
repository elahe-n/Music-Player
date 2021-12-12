//The palylist array: songs details and url have been stored in this array 

const playlist = [
    {
    title:'Bohemian Rhapsody',
    singer:'Freddie Mercury',
    year:'1975',
    duration:'05:59',
    album:'A Night at the Opera',
    genre:'Hard rock',
    lyrics:``,
    pic:`1.jfif`,
    url:'https://cdns-preview-5.dzcdn.net/stream/c-5867c698eeaf9fdde5db302de72e9f36-8.mp3',
    favorite:true
},
{
    title:'We Will Rock You',
    singer:'Freddie Mercury',
    year:'1977',
    duration:'02:02',
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
    duration:'02:59',
    album:'Live Killers',
    genre:'Arena rock',
    lyrics:'',
    pic:`3.jfif`,
    url:'https://qoret.com/dl/uploads/2019/03/Queen_-_We_Are_The_Champions_Qoret.com.mp3?_=1',
    favorite:false
},
{
    title:'Crazy Little Thing Called Love',
    singer:'Freddie Mercury',
    year:'1979',
    duration:'02:43',
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
    duration:'03:29',
    album:'Jazz',
    genre:'Pop rock',
    lyrics:'',
    pic:`5.jfif`,
    url:'https://cdns-preview-c.dzcdn.net/stream/c-c62114bb9ed46619356f9aee5a8d4102-6.mp3',
    favorite:true
},
{
    title:'Somebody To Love',
    singer:'Freddie Mercury',
    year:'1976',
    duration:'04:56',
    album:'A Day at the Races',
    genre:'Rock',
    lyrics:'',
    pic:`6.jfif`,
    url:'https://cdns-preview-9.dzcdn.net/stream/c-9e208326d4114be07cbadc20ee8394c8-8.mp3',
    favorite:false
},
{
    ttitle:'Youre My Best Friend',
    singer:'Freddie Mercury',
    year:'1975',
    duration:'02:50',
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
    duration:'05:48',
    album:'The Works',
    genre:'POP Rock',
    lyrics:'',
    pic:`8.jfif`,
    url:'https://www.naijagreen.com/wp-content/uploads/music/2021/08/Queen_-_Radio_Ga_Ga_[NaijaGreen.Com]_.mp3',
    favorite:true
},
{
    title:'Too Much Love Will Kill You',
    singer:'Freddie Mercury',
    year:'1992',
    duration:'04:18',
    album:'Back to the Light',
    genre:'Rock',
    lyrics:'',
    pic:`9.jfif`,
    url:'https://cdns-preview-2.dzcdn.net/stream/c-23cadb95a9707bb26c7c69b6297c180d-6.mp3',
    favorite:true
},
{
    title:`Dont try so hard`,
    singer:'Freddie Mercury',
    year:'1991',
    duration:'03:44',
    album:'Innuendo',
    genre:'Rock',
    lyrics:'',
    pic:`10.jfif`,
    url:'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/9a/cb/e4/9acbe4b9-1f0e-903e-89f7-2d6ba91be31b/mzaf_7265951792807668176.plus.aac.p.m4a',
    favorite:false
}
]

// Produce HTML code for one song 
// If given an Object representing the data for one song, connects the object data with an HTML "view" and appends to the #song element

const appendsong= function(item){
    document.querySelector(".palylist").innerHTML +=
    `<li class="song">
                    <img class="img" src="img/${item.pic}" alt="${item.title}">
                    <h3 class="track"><b>${item.title}</b> - ${item.singer} </h3>
                    <h5 class="detail">Released: ${item.year}&nbsp;&nbsp;&nbsp; Album: ${item.album} &nbsp;&nbsp;&nbsp; Genre: ${item.genre}</h5>
                    <img class="heart" src="${ (item.favorite) ? `./img/filledheart.svg` : `./img/heart.svg` }" alt="heart">
                    <data value="1" class="duration">${item.duration}</data>
                    <button class="play">▶️</button>
                </li>`

}

// Produce HTML code for each songs
playlist.forEach(appendsong)