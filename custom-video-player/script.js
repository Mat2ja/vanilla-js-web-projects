const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const rewind = document.getElementById('rewind');
const forward = document.getElementById('forward');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="icon"><path d="M4.79 2.093A.5.5 0 004 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5z" fill="#2ed573"></path></svg>'
    } else {
        play.innerHTML = '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 12V3h1v9H5zm4 0V3h1v9H9z" fill="#ffa502"></path></svg>'
    }
}

// Update the progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = `0${mins}`
    }

    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = `0${secs}`
    }

    timestamp.innerText = `${mins}:${secs}`;
}


// Set video time to progress
function setVideoProgress({ time }) {
    if (time) {
        video.currentTime = (+progress.value * video.duration) / 100 + time;
    } else {
        video.currentTime = (+progress.value * video.duration) / 100;
    }
}

// Stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();

}

// Event Listeners
window.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        toggleVideoStatus();
    }
})


video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
forward.addEventListener('click', setVideoProgress.bind(this, { time: 5 }));
rewind.addEventListener('click', setVideoProgress.bind(this, { time: -5 }));
progress.addEventListener('change', setVideoProgress);
