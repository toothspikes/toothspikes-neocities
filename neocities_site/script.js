const songs = [
    'https://file.garden/Z2OAQ7JkJHUBdL39/ytmp3free.cc_i-wear-your-ring-youtubemp3free.org.mp3',
    'https://file.garden/Z2OAQ7JkJHUBdL39/ytmp3free.cc_joy-division-twenty-four-hours-official-lyric-video-youtubemp3free.org.mp3',
    'https://file.garden/Z2OAQ7JkJHUBdL39/ytmp3free.cc_sisters-of-mercy-alice-youtubemp3free.org.mp3'
    
];

const musicScreens = [

    'https://toothspikes.neocities.org/images/musicplayerscreen1.gif',
    'https://toothspikes.neocities.org/images/musicplayerscreen2.gif',
    'https://toothspikes.neocities.org/images/musicplayerscreen3.gif'
    
];

const trackInfo = [

{ title: 'I Wear Your Ring', artist: 'Cocteau Twins' },
{ title: 'Twenty Four Hours', artist: 'Joy Division' },
{ title: 'Alice', artist: 'Sisters of Mercy' }

];

const audio = new Audio();
let currentSong = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2,'0')}`;
}

function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.current-time');
    const totalTime = document.querySelector('.total-time');
    
    if (progressBar && currentTime && totalTime) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        
        currentTime.textContent = formatTime(audio.currentTime);
        totalTime.textContent = formatTime(audio.duration);
   }
}

function updateMusicScreen() {
    const currentScreen = document.querySelector('.musicscreen');
    if(currentScreen) {
        currentScreen.style.backgroundImage = `url(${musicScreens[currentSong]})`;
    }
    
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    
    if(trackTitle && trackArtist) {
        trackTitle.textContent = trackInfo[currentSong].title;
        trackArtist.textContent = trackInfo[currentSong].artist;
    }
}

function loadSong() {
    audio.src = songs[currentSong];
    audio.load();
    updateMusicScreen();

    audio.addEventListener('loadmetadata', function() {
        updateProgress();
    });

    audio.play();
}

audio.src = songs[currentSong];
updateMusicScreen();

document.querySelector('.progress-bar').addEventListener('input', function() {
    const time = (this.value / 100) * audio.duration;
    audio.currentTime = time;
});

document.querySelector('.volume-control').addEventListener('input', function() {
    audio.volume = this.value / 100;
});

audio.addEventListener('timeupdate', updateProgress);

 document.getElementById('playbutton').addEventListener('click', function() {
if (audio.paused) {
    audio.play();
}
else {
    audio.pause();
}
});

document.getElementById('pausebutton').addEventListener('click', function() {
    audio.pause();
});

document.getElementById('forwardbutton').addEventListener('click', function() {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    loadSong();
});

document.getElementById('backbutton').addEventListener('click', function() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    audio.src = songs[currentSong];
    loadSong();
});

audio.addEventListener('ended', function() {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    updateMusicScreen();
    audio.play();
});
