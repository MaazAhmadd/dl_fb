const getdllinksfromFB = require("./getLinksFromFB");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your Link: ', async (link) => {
    let {
        hd_video,
        non_hd_video,
        thumbnail,
        title,  
        type,
      } = await getdllinksfromFB(link);
  
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

  rl.close();
});