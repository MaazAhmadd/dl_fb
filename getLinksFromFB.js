const puppeteer = require("puppeteer");
// const request = require("request");
// const fs = require("fs");
// const uploadToFB = require("./uploadToFB");
// const logger = require("./logger");
// const flatten = require("flat");
const { link_saver } = require("./direct_links_saver");

let data = {
  hd_video: {
    start: `playable_url_quality_hd":"`,
    end: `","spherical_video_fallback_urls`,
  },
  non_hd_video: {
    start: `playable_url":"`,
    end: `","playable_url_quality_hd`,
  },
  thumbnail: {
    start: `"preferred_thumbnail":{"image":{"uri":"`,
    end: `"},"image_preview_payload"`,
  },
  title: {
    start: `"message":{"text":"`,
    end: `","ranges"`,
  },
  type: {
    start: `"permalink_url":"`,
    end: `","captions_url"`,
  },
};

function cleanLink(L, M) {
  if (!L) return;

  let link = L.replace(/\\\//g, "/");
  link = link.replace(/\\u[\dA-F]{4}/g, function (escapeSequence) {
    return String.fromCharCode(parseInt(escapeSequence.substring(2), 16));
  });
  // console.log(M, " : ", link);
  return link;
}

function convertLink(script, type) {
  // console.log("entered convertLink");
  let start = "";
  let end = "";
  if (type) {
    start = data[type].start;
    end = data[type].end;
  } else {
    console.log("provide type");
    return;
  }

  let startIndex = script.indexOf(start);
  let endIndex = script.indexOf(end);
  let link = script.substring(startIndex, endIndex);
  link = link.slice(start.length);
  link = cleanLink(link, type);

  if (!link) {
    link = "not found";
    return link;
  }
  if (type == "type") {
    link = link.includes("facebook.com/reel")
      ? (link = "reel")
      : (link = "video");
  }

  return link;
}

function convertJson(script) {
  let start = `{"define":[["VideoPlayerShakaPerformanceLoggerConfig"`;
  let end = `"VideoPlayerShakaPerformanceLoggerBuilder"],"css"]]]}`;

  let startIndex = script.indexOf(start);
  let endIndex = script.indexOf(end);

  let link = script.substring(startIndex, endIndex);
  link = link + end;

  // link = link.replace(/\\\//g, "/");
  // link = link.replace(/\\u[\dA-F]{4}/g, function (escapeSequence) {
  //   return String.fromCharCode(parseInt(escapeSequence.substring(2), 16));
  // });
  return JSON.parse(link);
}

function removeInvalidCharacters(string) {
  const invalidCharacters = /[\\/:*?"<>|]/g;
  return string.replace(invalidCharacters, "");
}

const downloadFromFB = async (mainLink, path, i) => {
  if (!mainLink) return;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(mainLink, { waitUntil: "networkidle0" });
  // console.log("page loaded, about to evaluate");
  const { scriptTag, videoTitle } = await page.evaluate(() => {
    const scriptElements = document.querySelectorAll("script");

    let script_rt = "";
    let type = "";
    for (const scriptElement of scriptElements) {
      if (scriptElement.innerHTML.includes("playable_url_quality_hd")) {
        script_rt = scriptElement.innerHTML;
        break;
      }
    }

    // function getReelTitle(strr) {
    //   if (!strr) return;
    //   let strt = [];
    //   let strrSplit = strr.split(`<a`);
    //   // let strrSplit = strr.split(" ");
    //   // for (let i = 0; i < strrSplit.length; i++) {
    //   //   const txt = strrSplit[i];
    //   //   if (txt == `<a`) {
    //   //     break;
    //   //   } else {
    //   //     strt.push(txt);
    //   //   }
    //   // }
    //   return strrSplit[0];
    //   // return strt.join(" ");
    // }
    // let tags = [];
    // let caption = "";

    let title =
      document.querySelectorAll(`.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6`)[10]
        ?.innerHTML || undefined;
    // type = "video";
    // caption = title;

    // if (!title) {
    //   title =
    //     document.querySelectorAll(
    //       `.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x10flsy6.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x41vudc.x6prxxf.xvq8zen.xo1l8bm.x17z8epw`
    //     )[0] || undefined;

    //   caption = title.innerHTML.split(/<[a-z][\s\S]*>/i)[0];

    //   title.childNodes.forEach((n) => {
    //     if (n.childNodes[0]) {
    //       let tag = n.childNodes[0].childNodes[0]?.innerHTML;
    //       if (tag) {
    //         tags.push(tag);
    //       }
    //     }
    //   });
    //   // title = title?.substring(0, 1000);
    //   // title = getReelTitle(title);
    //   type = "reel";
    // }

    return {
      scriptTag: script_rt,
      videoTitle: title,
      // videoType: type,
      // tags: tags,
    };
  });
  // console.log("evaluated script tag and title: ", videoTitle);

  let { hd_video, non_hd_video, thumbnail, title, type } = (() => {
    return {
      hd_video: convertLink(scriptTag, "hd_video"),
      non_hd_video: convertLink(scriptTag, "non_hd_video"),
      thumbnail: convertLink(scriptTag, "thumbnail"),
      type: convertLink(scriptTag, "type"),
      title: !videoTitle ? convertLink(scriptTag, "title") : videoTitle,
    };
  })();

  // let preferred_thumbnail = cleanLink(
  //   link.require[5][3][1].__bbox.result.data.video.story.attachments[0]
  //     .media.preferred_thumbnail.image.uri,
  //   "thumbnail"
  // );
  // let playable_url_quality_hd = cleanLink(
  //   link.require[5][3][1].__bbox.result.data.video.story.attachments[0]
  //     .media.playable_url_quality_hd,
  //   "HD Quality"
  // );

  // let name = `${videoTitle || link.substring(link.length - 15)}_${i}.mp4`;
  // name = name.replaceAll(" ", "_");
  // name = removeInvalidCharacters(name);

  // let name = `${link.substring(link.length - 15)}.mp4`;
  // await browser.close();
  // return;

  // return new Promise((resolve, reject) => {
  //   const file = fs.createWriteStream(path + name);
  //   request(link).pipe(file);

  //   file.on("finish", () => {
  //     console.log(`Video downloaded successfully!, ${name}`);

  //     // uploadToFB(name);
  //   });

  //   file.on("close", () => {
  //     resolve();
  //   });
  // });

  await browser.close();

  let obj_to_return = {
    hd_video,
    non_hd_video,
    thumbnail,
    // videoTitle,
    // videoType,
    title,
    type,
    // tags,
  };
  link_saver(obj_to_return);
  return obj_to_return;
};

module.exports = downloadFromFB;

// const scripts = document.querySelectorAll("script");
// for (let script of scripts) {
//   if (script.innerHTML.includes("playable_url_quality_hd")) {
//     let inScript = JSON.parse(script.innerHTML);
//     let link =
// inScript.require[0][3][0].__bbox.require[5][3][1].__bbox.result.data.video
//   .story.attachments[0].media.playable_url_quality_hd;
//     console.log(link);
//   }
// }
