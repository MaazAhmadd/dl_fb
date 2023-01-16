const request = require("request");
const getdllinksfromFB = require("./getLinksFromFB");
const dlfromYT = require("./downloadFromYT");
const allLinks = require("./fb_pages/KingJudahOfficial/links.json");

const fs = require("fs");
// if (process.argv.length < 3) {
//   throw new Error("type the link");
// }
// const allLinks = [
//   "https://www.facebook.com/KingJudahOfficial/videos/funny-omegle-moments-fake-egirl-goes-on-omegle-voice-trolling/438782744296673/",
// "https://www.facebook.com/KingJudahOfficial/videos/catching-predators-on-omegle/901835571138147/",
// "https://www.facebook.com/KingJudahOfficial/videos/omegle-e-girl-voice-trolling-prank-bonking-thirsty-people/999024667641182/",
// ];

let link_fb =
  "https://www.facebook.com/KingJudahOfficial/videos/my-reflection-is-moving-by-self-omegle-prank-2/482637367274705/";
let link_fb_reel = `https://www.facebook.com/reel/849919742729850`;
let link_yt = `https://www.youtube.com/watch?v=z49CI2T4zt4`;

// let pageID = `1893884300956392`; //appID
let pageID = `109779100765966`; //pageID
// let pageID = `1187573305488399`; //userID

// dlfromYT(link_yt);
const getLinks = async (L) => {
  let {
    hd_video,
    non_hd_video,
    thumbnail,
    // videoTitle,
    // videoType,
    // tags,
    title,
    type,
  } = await getdllinksfromFB(L);
  // await dlfromFB(allLinks.links[317]);
  console.log(" ");
  console.log("hd_video : ", hd_video);
  console.log(" ");
  console.log("non_hd_video : ", non_hd_video);
  console.log(" ");
  console.log("thumbnail : ", thumbnail);
  console.log(" ");
  console.log("title : ", title);
  console.log(" ");
  console.log("type : ", type);
};
// getLinks(`https://web.facebook.com/reel/8914760211882470`);
// getLinks(`https://web.facebook.com/watch/?v=831076207983315`);
// getLinks(process.argv[2]);

function getData(L, P, i) {
  return new Promise((resolve) => resolve(getLinks(L, P, i)));
}
const downloadAll = async (links) => {
  console.log("in download all");
  for (let i = 0; i < links.length; i++) {
    console.log("in for loop");
    const link = links[i];
    // if (i <= 324) {
    //   console.log("skipping : ", i);
    //   continue;
    // }
    console.log(link);
    await getData(
      link,
      "/media/maaz/SP256/fb_pages/KingJudahOfficial/videos/",
      i
    );
  }
};
downloadAll(allLinks.links);

// for (let i = 0; i < ar.length; i++) {
//   const element = ar[i];
// }
// uploadToFB(nonExpiringPageToken, link, urlLink);

// const fs = require("fs");
// const request = require("request");

// const accessToken = "your-access-token";
// const pageId = "your-page-id";
// const videoPath = "path/to/video.mp4";

// const options = {
//   url: `https://graph.facebook.com/${pageId}/videos`,
//   method: "POST",
//   headers: {
//     "Content-Type": "video/mp4",
//     Authorization: `Bearer ${accessToken}`,
//   },
//   formData: {
//     source: fs.createReadStream(videoPath),
//   },
// };

// request(options, (error, response, body) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(response.statusCode, body);
//   }
// });

//zampmobile page ID: 109779100765966
//token EAAa6ek0BEugBAEoS6A7ea7emiUfXlVZBubeCYipY3BoWvRuXvYViEZC5puW5jQIIpfLyVKUPDL70HTBXze3gvGyHCk3VryFrZA43ZCwA9m6nyWcRirxzNgyX4XFpCyKFaPzLPBKRR9iZBwY8Byj4xZBxzOtSsICcZB6ZBOi4EVZCvv1vxrT1XMTt6IPEptUJk7RutITcmmHLLhQZDZD

// document.querySelectorAll(
//   `.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x78zum5.x1r8uery.x1iyjqo2.xs83m0k.xl56j7k.x1pshirs.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha`
// );

// // Get a reference to our file input
// const fileInput = document.querySelector('input[type="file"]');

// // Create a new File object
// const myFile = new File(
//   ["Hello World!"],
//   `/home/maaz/Projects/Social-Media-Downloader/327674107242893.mp4`
// );

// // Now let's create a DataTransfer to get a FileList
// const dataTransfer = new DataTransfer();
// dataTransfer.items.add(myFile);
// fileInput.files = dataTransfer.files;

// let path = `/home/maaz/Projects/Social-Media-Downloader/327674107242893.mp4`;
// const fileInput = document.querySelector('input[type="file"]');

// let linksStr = [];
// document
//   .querySelectorAll(
//     ".x78zum5.x1q0g3np.x1a02dak > .x9f619.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6"
//   )
//   .forEach((el) => {
//     linksStr.push(
//       el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].getAttribute(
//         "href"
//       )
//     );
//   });

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// let doScroll = async () => {
//   for (let i = 0; i < 10; i++) {
//     await sleep(1000);
//     window.scrollBy(0, document.body.scrollHeight);
//   }
// };

// doScroll();

// let linksArr = [];
// let allLinks = document.querySelectorAll(
//   ".x78zum5.x1q0g3np.x1a02dak > .x9f619.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6"
// );
// for (let i = 0; i < allLinks.length; i++) {
//   const el = allLinks[i];
//   let link =
//     el?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.getAttribute(
//       "href"
//     );
//   linksArr.push(link);
// }
// return linksArr;
