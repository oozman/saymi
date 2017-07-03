/**
 * Mi Air Purifier class.
 */
class AirPurifier {

    /**
     * The constructor.
     *
     * @param ip
     * @param token
     */
    constructor(ip, token) {

        this._ = require('lodash');
        this.miio = require('miio');
        this.q = require('q');

        this.name = 'Air Purifier';
        this.ip = this._.trim(ip);
        this.token = this._.trim(token);
        this.currentDevice = null;


    }

    /**
     * Disconnect device.
     */
    disconnect() {

        if (this.currentDevice) this.currentDevice.destroy();

    }

    /**
     * Set current device instance.
     *
     * @param device
     */
    setCurrentDevice(device) {

        this.currentDevice = device;

    }

    /**
     * Prepare device info.
     *
     * @param device
     * @returns {{}}
     */
    prepareInfo(device) {

        let data = {};

        let {buzzer, led, ledBrightness, favoriteLevel} = device;

        data.buzzer = buzzer;
        data.led = led;
        data.led_brightness = ledBrightness;
        data.favorite_level = favoriteLevel;

        return data;

    }

    /**
     * Get device data.
     *
     * @returns {*|promise}
     */
    getData() {

        let deferred = this.q.defer();

        this.q.delay(100).then(() => {

            try {

                this.miio.device({address: this.ip, token: this.token}).then(device => {

                    this.setCurrentDevice(device);

                    let data = {};
                    let {power, temperature, mode, humidity, aqi} = device;

                    data.power_status = power ? 'on' : 'off';
                    data.mode = mode;
                    data.temperature = temperature;
                    data.humidity = humidity;
                    data.air_quality = aqi;

                    // Attach other device info.
                    data._info = this.prepareInfo(device);

                    // Stop monitoring device.
                    this.disconnect();

                    deferred.resolve(data);

                }, error => {

                    throw new Error('Unable to get device data. Error: ' + error.message);

                }).catch(error => {

                    this.disconnect();

                    deferred.reject(error);

                });

            } catch (error) {

                deferred.reject(error);

            }

        });

        return deferred.promise;

    }

    /**
     * Set device power status. Either, on or off.
     *
     * @param action
     * @returns {*|promise}
     */
    setPower(action) {

        let deferred = this.q.defer();

        let status = this._.isEqual(action, 'on') ? true : false;

        this.q.delay(100).then(() => {

            try {

                this.miio.device({address: this.ip, token: this.token})
                    .then(device => {

                        this.setCurrentDevice(device);

                        // Set status: on, off
                        let data = {}

                        device.setPower(status).then(() => {

                            // Convert boolean to human readable value.
                            data.status = status ? 'on' : 'off';

                            // Stop monitoring device.
                            this.disconnect();

                            deferred.resolve(data);

                        }, error => {

                            throw error;

                        }).catch(error => {

                            this.disconnect();

                            deferred.reject(error);

                        })

                    }, error => {

                        throw new Error('Unable to set device power status. Error: ' + error.message);

                    })
                    .catch(error => {

                        this.disconnect();

                        deferred.reject(error);

                    });

            } catch (err) {

                deferred.reject(err);

            }

        });

        return deferred.promise;

    }

    /**
     * Set device mode.
     *
     * @param mode
     * @returns {*|promise}
     */
    setMode(mode) {

        let deferred = this.q.defer();

        this.q.delay(100).then(() => {

            try {

                this.miio.device({address: this.ip, token: this.token})
                    .then(device => {

                        this.setCurrentDevice(device);

                        device.setMode(mode).then(() => {

                            let data = {'mode': mode}

                            this.disconnect();

                            deferred.resolve(data);

                        }, error => {

                            throw error;

                        }).catch(error => {

                            this.disconnect();

                            deferred.reject(error);

                        })

                    }, error => {

                        throw new Error('Unable to set device mode. Error: ' + error.message);

                    })
                    .catch(error => {

                        this.disconnect();

                        deferred.reject(error);

                    });

            } catch (err) {

                deferred.reject(err);

            }

        });

        return deferred.promise;

    }

    /**
     * Get modes.
     *
     * @returns {*|promise}
     */
    getModes() {

        let deferred = this.q.defer();

        this.q.delay(100).then(() => {

            try {

                this.miio.device({address: this.ip, token: this.token})
                    .then(device => {

                        this.setCurrentDevice(device);

                        this.disconnect();

                        deferred.resolve(device.modes);

                    }, error => {

                        throw new Error('Unable to set device mode. Error: ' + error.message);

                    })
                    .catch(error => {

                        this.disconnect();

                        deferred.reject(error);

                    });

            } catch (err) {

                deferred.reject(err);

            }

        });

        return deferred.promise;

    }
}

module.exports = AirPurifier;