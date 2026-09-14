const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const videoId = index + 1;

    const videoData = {
      id: videoId,
      title: card.querySelector("h3").textContent,
      channel: card.querySelector(".video-details p").textContent,
      views: card.querySelectorAll(".video-details p")[1].textContent,
      thumbnail: card.querySelector("img").src,
      duration: card.querySelector(".duration").textContent,
    };

    localStorage.setItem(`video-${videoId}`, JSON.stringify(videoData));

    window.location.href = `video.html?id=${videoId}`;
  });
});

const params = new URLSearchParams(window.location.search);
const videoId = params.get("id");

const videoTitle = document.querySelector("#video-title");
const videoDescription = document.querySelector("#video-description");
const videoChannel = document.querySelector("#video-channel");
const videoImage = document.querySelector("#video-image");
const videoViews = document.querySelector("#video-views");
const videoDuration = document.querySelector("#video-duration");

if (videoId && videoTitle) {
  const savedVideo = localStorage.getItem(`video-${videoId}`);

  if (savedVideo) {
    const video = JSON.parse(savedVideo);

    videoImage.src = video.thumbnail;

    videoTitle.textContent = video.title;

    videoChannel.textContent = video.channel;

    videoViews.textContent = video.views;

    videoDuration.textContent = video.duration;

    fetch(`https://jsonplaceholder.typicode.com/posts/${videoId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        return response.json();
      })

      .then((data) => {
        console.log("API response:", data);
        videoDescription.textContent =
          `${video.title} is a video from ${video.channel}. ` +
          `This video has ${video.views}. ` +
          `The video duration is ${video.duration}. ` +
          `This video was loaded using JSONPlaceholder API (Post ${data.id}).`;
      })

      .catch((error) => {
        console.error(error);
        videoDescription.textContent =
          `${video.title} is a video from ${video.channel}. ` +
          `This video has ${video.views} and runs for ${video.duration}.`;
      });
  } else {
    videoTitle.textContent = "Video not found";
    videoDescription.textContent = "Please go back and select a video.";
  }
}
