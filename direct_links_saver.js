const fs = require("fs");

function link_saver(link_obj) {
  // Read the log file
  fs.readFile("direct_dl_links.json", "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading log file: ${err}`);
      return;
    }

    // Parse the log file data as JSON
    let links = [];
    if (data) {
      links = JSON.parse(data);
    }

    // Append the new log message to the log array
    links.push(link_obj);

    // Write the log array to the file
    fs.writeFile("direct_dl_links.json", JSON.stringify(links), (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
        return;
      }
    });
  });
}

module.exports = {
  link_saver,
};
