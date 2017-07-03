/**
 * Discover Command class.
 */
class DiscoverCommand {

    /**
     * The constructor.
     */
    constructor() {

        let Response = require('../response');
        this.response = new Response();

        this.color = require('colors');
        this.miio = require('miio');

        console.log(this.color.green('Starting device discovery...') + ' ' + this.color.grey('Press CTRL + C after you take note of your devices'));

        this.discover();

    }

    /**
     * Discover devices.
     */
    discover() {

        const browser = this.miio.browse({
            cacheTime: 300 // 5 minutes. Default is 1800 seconds (30 minutes)
        });

        const devices = {}

        browser.on('available', reg => {

            if (!reg.token) {

                console.log(reg.id, 'hides its token');
                console.log('Reg ID: ' + this.color.red('${reg.id} (hides its token)'));

                return;

            }

            this.miio.device(reg).then(device => {

                // Show device info.
                console.log('Device ID: ', this.color.yellow(device.id));
                console.log('Model: ', this.color.yellow(device.model));
                console.log('Token: ', this.color.yellow(reg.token));
                console.log('IP: ', this.color.yellow(reg.address));
                console.log('Port: ', this.color.yellow(reg.port));
                console.log('Last seen: ', this.color.yellow(reg.lastSeen));
                console.log(this.color.grey('---'));

                devices[reg.id] = device;

            }, error => {

                throw error;

            }).catch(error => {

                console.log(error.message.red);

            });

        });

        browser.on('unavailable', reg => {

            const device = devices[reg.id];

            if (!device) return;

            device.destroy();

            delete devices[reg.id];

        });


    }

}

module.exports = DiscoverCommand;

