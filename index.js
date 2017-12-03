const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const serial = new SerialPort('/dev/ttyACM0', {
    baudRate: 115200
});

const parser = serial.pipe(new Readline({ delimiter: '\n' }));
parser.on('data', function (data) {
    if (data.toString().includes('card')) {
        console.log('card scanned!');
    }
})

serial.on('open', () => {
    console.log('serial port opened');
});
