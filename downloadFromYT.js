const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");
const uploadToFB = require("./uploadToFB");

const downloadFromYoutube = async (videoUrl) => {
  if (!videoUrl) return;
  const filterFormat = (formats, check) =>
    formats.filter(
      (format) => format.qualityLabel === check && format.hasAudio
    );

  let format2check = "1080p";
  const videoInfo = await ytdl.getInfo(videoUrl);

  let filteredFormats = filterFormat(videoInfo.formats, format2check);

  if (!filteredFormats.length) {
    console.error(format2check + " format not available for this video");
    format2check = "720p";
    filteredFormats = filterFormat(videoInfo.formats, format2check);
  }

  if (!filteredFormats.length) {
    console.error(format2check + " format not available for this video");
    format2check = "480p";
    filteredFormats = filterFormat(videoInfo.formats, format2check);
  }

  if (!filteredFormats.length) {
    console.error(format2check + " format not available for this video");
    format2check = "360p";
    filteredFormats = filterFormat(videoInfo.formats, format2check);
  }

  let downloadUrl = filteredFormats[0].url;
  let type = videoUrl.includes("shorts") ? "shorts" : "video";

  if (type == "video") {
    // uploadToFB(downloadUrl);
  } else {
    console.log("it's a reel");
  }
  // const file = fs.createWriteStream(
  //   `${type} ${videoInfo.videoDetails.title}.mp4`
  // );
  // request(downloadUrl).pipe(file);

  // file.on("finish", () => {
  //   console.log(
  //     "Video downloaded successfully! in " + format2check + " format"
  //   );
  // });
  console.log(videoInfo.videoDetails.videoId);
  console.log(videoInfo.videoDetails.title);
  console.log(downloadUrl);
};

module.exports = downloadFromYoutube;
