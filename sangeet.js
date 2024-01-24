let homeWindow = document.querySelector("#home");

homeWindow.addEventListener("click", function () {
    window.location.href = "index.html";
});

// ------------------------------------------------------------------------------

let navbarEffect = document.querySelectorAll("nav ul li a");

navbarEffect.forEach((link) => {
    link.addEventListener("mouseenter", function () {
        link.style.padding = "8px"
        link.style.borderRadius = "15px"
        link.style.border = "0.5px solid cyan"
    });
    link.addEventListener("mouseleave", function () {
        link.style.border = "none"
    });
});

// ------------------------------------------------------------------------------

let posters = document.querySelectorAll('.poster');
let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let songs = document.querySelectorAll(".box audio");
let currentTrack = 0;
let currentSong = null;
let seekbar = document.getElementById("percentage");
let currentTimeDisplay = document.getElementById("currentTime");
let totalTimeDisplay = document.getElementById("totalTime");
let currentPlayDiv = document.querySelector(".currentPlay");

function updateSeekbar() {
    if (currentSong !== null) {
        let percentage = (currentSong.currentTime / currentSong.duration) * 100;
        seekbar.value = percentage;

        let currentTimeMinutes = Math.floor(currentSong.currentTime / 60);
        let currentTimeSeconds = Math.floor(currentSong.currentTime % 60);
        currentTimeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    }
}

function updatePlaybackTime() {
    if (currentSong !== null) {
        let percentage = seekbar.value;
        let currentTime = (percentage / 100) * currentSong.duration;
        currentSong.currentTime = currentTime;
    }
}

prev.addEventListener("click", playPrevSong);
function playPrevSong() {
    songs[currentTrack].pause();
    currentTrack = (currentTrack - 1 + songs.length) % songs.length;
    songs[currentTrack].play();
    currentSong = songs[currentTrack];
    play.style.display = "none";
    pause.style.display = "block";

    currentPlayDiv.innerHTML = "";
    let currentPoster = posters[currentTrack].cloneNode(true);
    currentPlayDiv.appendChild(currentPoster);
}

next.addEventListener("click", playNextSong);

function playNextSong() {
    songs[currentTrack].pause();
    currentTrack = (currentTrack + 1) % songs.length;
    songs[currentTrack].play();
    currentSong = songs[currentTrack];
    play.style.display = "none";
    pause.style.display = "block";

    currentPlayDiv.innerHTML = "";
    let currentPoster = posters[currentTrack].cloneNode(true);
    currentPlayDiv.appendChild(currentPoster);

    if (currentTrack === 0) {
        stopMusic();
    }
}

function stopMusic() {
    pause.style.display = "none";
    play.style.display = "block";
    if (currentSong !== null && !currentSong.paused) {
        currentSong.pause();
        currentSong = null;
    }
   

    currentPlayDiv.innerHTML = "";
    seekbar.value = 0;
    currentTimeDisplay.textContent = "0:00";
    totalTimeDisplay.textContent = "0:00";
}



posters.forEach((poster, index) => {
    let audio = poster.nextElementSibling;

    poster.addEventListener("click", function () {
        if (currentSong !== null && currentSong !== audio) {
            currentSong.pause();
        }

        if (audio.paused) {
            play.style.display = "none";
            pause.style.display = "block";
            audio.play();
            currentSong = audio;
            currentTrack = index;

            currentPlayDiv.innerHTML = "";
            let currentPoster = poster.cloneNode(true);
            currentPlayDiv.appendChild(currentPoster);
        } else {
            pause.style.display = "none";
            play.style.display = "block";
            audio.pause();
            currentSong = null;
        }
    });
});

play.addEventListener("click", function () {
    play.style.display = "none";
    pause.style.display = "block";
    if (currentSong !== null && currentSong.paused) {
        currentSong.play();
    } else if (currentSong === null && songs.length > 0) {
        songs[currentTrack].play();
        currentSong = songs[currentTrack];

        currentPlayDiv.innerHTML = "";
        let currentPoster = posters[currentTrack].cloneNode(true);
        currentPlayDiv.appendChild(currentPoster);
    }
});

pause.addEventListener("click", function () {
    pause.style.display = "none";
    play.style.display = "block";
    if (currentSong !== null && !currentSong.paused) {
        currentSong.pause();
    }
});

songs.forEach((song) => {
    song.addEventListener("timeupdate", function () {
        updateSeekbar();

        let totalTimeMinutes = Math.floor(currentSong.duration / 60);
        let totalTimeSeconds = Math.floor(currentSong.duration % 60);
        totalTimeDisplay.textContent = `${totalTimeMinutes}:${totalTimeSeconds < 10 ? '0' : ''}${totalTimeSeconds}`;
    });

    song.addEventListener("ended", function () {
        playNextSong();
    });
});

seekbar.addEventListener("input", updatePlaybackTime);

seekbar.addEventListener("click", function (event) {
    updatePlaybackTime();
    currentSong.play();
});

// ------------------------------------------------------------------------------

let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {

    let poster = box.querySelector(".poster");
    let span = box.querySelector("span");

    poster.addEventListener("mouseenter", function () {
        span.style.display = "block";
        poster.style.opacity = "1";
        poster.style.transform = "scale(1.3)";
    });

    poster.addEventListener("mouseleave", function () {
        span.style.display = "none";
        poster.style.opacity = "0.7";
        poster.style.transform = "scale(1)";

    });
});


// ------------------------------------------------------------------------------





