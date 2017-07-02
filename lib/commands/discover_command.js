const miio = require('miio');
const Response = require('../response');
const colors = require('colors');

/**
 * Process Air Purifier command.
 *
 * @constructor
 */
function DiscoverCommand() {

    this.response = new Response();

    console.log('Starting device discovery...'.green + ' ' + 'Press CTRL + C after you take note of your devices'.grey);

    this.discover();
}

/**
 * Start discovery.
 */
DiscoverCommand.prototype.discover = function () {

    const browser = miio.browse({
        cacheTime: 300 // 5 minutes. Default is 1800 seconds (30 minutes)
    });

    const devices = {}

    browser.on('available', function (reg) {

        if (!reg.token) {
            console.log(reg.id, 'hides its token');
            return;
        }

        miio.device(reg).then(function (device) {

            // Show device info.
            console.log('Device ID: ', colors.yellow(device.id));
            console.log('Model: ', colors.yellow(device.model));
            console.log('Token: ', colors.yellow(reg.token));
            console.log('IP: ', colors.yellow(reg.address));
            console.log('Port: ', colors.yellow(reg.port));
            console.log('Last seen: ', colors.yellow(reg.lastSeen));
            console.log('--'.grey);

            devices[reg.id] = device;

        }, function (error) {

            throw error;

        }).catch(function (error) {

            console.log(error.message.red);

        });

    });

    browser.on('unavailable', function (reg) {

        const device = devices[reg.id];

        if (!device) return;

        device.destroy();

        delete devices[reg.id];

    });


}

module.exports = DiscoverCommand;

