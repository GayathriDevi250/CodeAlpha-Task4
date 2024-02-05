const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
  {
    id: 1,
    title: "Ammaadi",
    file: "holo.mp3",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Nani_at_an_interview_for_film_companion_%28cropped%29.png",
  },
  {
    id: 2,
    title: "Ney Veyrey",
    file: "MonkeyDance.mp3",
    image:
    "https://in.bmscdn.com/iedb/artist/images/website/poster/large/ranbir-kapoor-2817-1691565170.jpg"
  },
  {
    id: 3,
    title: "Sooreede",
    file: "home.mp3",
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202305/salaar_prabhas_release_date_september-three_four.jpg?VersionId=KycPWPoiN.KVEC.TQp4XrCfwSgeE7R6a"
  },
  {
    id: 4,
    title: "Meenakshi",
    file: "RAINY.mp3",
    image:
      "https://assetscdn1.paytm.com/images/cinema/han-min-96a2d590-e72a-11ed-82e8-cf24b6293ec4.jpg",
  },
  {
    id: 5,
    title: "Dum Masala",
    file: "Obito.mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpy_6Sguq2DXdBFViPvsTVFeOOCnLgVrrBlIqHYtSTfQ&s",
  },
  {
    id: 6,
    title: "Nuvvu Navvukuntu",
    file: "JS.mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzi_CCDbSwUkawymgf5mf0CKsyDc1ZDfxQ3su0R39Lg&s",
  },
  {
    id: 7,
    title: "Flexin Trên CircleK",
    file: "LowG.mp3",
    image:
    "https://profiledata.net/file/img/media/14f2771bdd71dc20041a10c648d6fcc0.jpeg",
  },
  {
    id: 8,
    title: "DON'T BREAK MY HEART",
    file: "Binz.mp3",
    image:
    "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
  },
  {
    id: 9,
    title: "DON'T BREAK MY HEART",
    file: "Binz.mp3",
    image:
    "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
  },
  {
    id: 10,
    title: "TAM GIÁC",
    file: "Kink.mp3",
    image:
    "https://i.scdn.co/image/ab6761610000e5eb00ece52e50b41c7d6192cc26",
  },
  {
    id: 11,
    title: "THÁNG TƯ LÀ LỜI NÓI DỐI CỦA EM",
    file: "T4.mp3",
    image:
    "https://static.yeah1.com/uploads/editors/12/2021/10/31/RE76gmq8jy94yrSDZJszWeKmicrpiew1sG8iqwnb.jpg",
  },





];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./Music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./Music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);