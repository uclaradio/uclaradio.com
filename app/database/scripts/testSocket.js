const socket = require('socket.io-client');

const ev = process.argv[2]; // The event to emit
const data = process.argv[3]; // Any data to be passed with the event
const url = process.argv[4]; // (Optional) the url to connect to
//  (defaults to localhost:3000)

var io;
if (url) io = socket(url);
else io = socket('http://localhost:3000');

const timeout = 100;

// Connect to the server
io.on('connect', _ => {
  console.log('Connected...');
  if (ev && process.argv[3]) {
    console.log('Sending ' + ev + ': ' + data);
    io.emit(ev, JSON.parse(data));

    // Timeout after 100 ms
    setTimeout(() => {
      process.exit(0);
    }, timeout);
  } else {
    console.log("Usage: ./client.js <event> <data> [<url> = 'localhost:3000']");
    console.log("       (if no data, type '{}')");
    process.exit(1);
  }
});
