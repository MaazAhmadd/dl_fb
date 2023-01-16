const fs = require("fs");

function logMessage(message) {
  // Read the log file
  fs.readFile("log.json", "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading log file: ${err}`);
      return;
    }

    // Parse the log file data as JSON
    let log = [];
    if (data) {
      log = JSON.parse(data);
    }

    // Append the new log message to the log array
    log.push(message);

    // Write the log array to the file
    fs.writeFile("log.json", JSON.stringify(log), (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
        return;
      }
    });
  });
}

module.exports = {
  logMessage,
};
