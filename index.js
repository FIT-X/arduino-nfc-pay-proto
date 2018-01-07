// const SERVICE_HOST = 'http://localhost/cardscan:8080';
const SERVICE_HOST = 'localhost';
const PORT = 80;

const SerialPort = require('serialport');
const http = require('http');
const Readline = SerialPort.parsers.Readline;
// const serial = new SerialPort('/dev/ttyACM0', {

const serial = new SerialPort('/dev/tty.usbmodem1441', {
    baudRate: 115200
});

const parser = serial.pipe(new Readline({ delimiter: '\n' }));
parser.on('data', function (data) {
    if (data.toString().includes('card')) {
        console.log('card scanned!');
        sendRequest();
    }
})

serial.on('open', () => {
    console.log('serial port opened');
});

function sendRequest() {
    var options = {
        host: SERVICE_HOST,
        port: PORT,
        path: '/api/cardscan',
        method: 'PUT'
    };

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    // req.write('data\n');
    // req.write('data\n');
    req.end();
}