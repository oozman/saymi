const _ = require('lodash');
const miio = require('miio');
const q = require('q');

function AirPurifier(ip, token) {

    this.name = 'Air Purifier';
    this.ip = _.trim(ip);
    this.token = _.trim(token);
    this.currentDevice = null;

}

/**
 * Disconnect device.
 */
AirPurifier.prototype.disconnect = function () {

    if (this.currentDevice) {

        this.currentDevice.destroy();

    }

}

/**
 * Get data.
 *
 * @returns {*|promise}
 */
AirPurifier.prototype.getData = function () {

    let deferred = q.defer();

    let self = this;

    q.delay(100).then(function () {

        try {

            miio.device({address: self.ip, token: self.token}).then(function (device) {

                self.setCurrentDevice(device);

                let data = {};
                data.power_status = device.power ? 'on' : 'off';
                data.temperature = device.temperature;
                data.mode = device.mode;
                data.temperature = device.temperature;
                data.humidity = device.humidity;
                data.air_quality = device.aqi;

                // Attach other device info.
                data._info = self.prepareInfo(device);

                // Stop monitoring device.
                self.disconnect();

                deferred.resolve(data);

            }, function (error) {

                throw new Error('Unable to get device data. Error: ' + error.message);

            }).catch(function (err) {

                self.disconnect();

                deferred.reject(err);

            });

        } catch (err) {

            deferred.reject(err);

        }

    });

    return deferred.promise;

}

/**
 * Set device power.
 *
 * @param action
 * @returns {*|promise}
 */
AirPurifier.prototype.setPower = function (action) {

    let deferred = q.defer();

    let status = _.isEqual(action, 'on') ? true : false;

    let self = this;

    q.delay(100).then(function () {

        try {

            miio.device({address: self.ip, token: self.token})
                .then(function (device) {

                    self.setCurrentDevice(device);

                    // Set status: on, off
                    let data = {}

                    device.setPower(status).then(function () {

                        // Convert boolean to human readable value.
                        data.status = status ? 'on' : 'off';

                        // Stop monitoring device.
                        self.disconnect();

                        deferred.resolve(data);

                    }, function (error) {

                        throw error;

                    }).catch(function (error) {

                        self.disconnect();

                        deferred.reject(error);

                    })

                }, function (error) {

                    throw new Error('Unable to set device power status. Error: ' + error.message);

                })
                .catch(function (err) {

                    self.disconnect();

                    deferred.reject(err);

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
AirPurifier.prototype.setMode = function (mode) {

    let deferred = q.defer();

    let self = this;

    q.delay(100).then(function () {

        try {

            miio.device({address: self.ip, token: self.token})
                .then(function (device) {

                    self.setCurrentDevice(device);

                    // Set status: on, off
                    let data = {}

                    device.setMode(mode).then(function () {

                        data = {'mode': mode}

                        self.disconnect();

                        deferred.resolve(data);

                    }, function (error) {

                        throw error;

                    }).catch(function (error) {

                        self.disconnect();

                        deferred.reject(error);

                    })

                }, function (error) {

                    throw new Error('Unable to set device mode. Error: ' + error.message);

                })
                .catch(function (err) {

                    self.disconnect();

                    deferred.reject(err);

                });

        } catch (err) {

            deferred.reject(err);

        }

    });

    return deferred.promise;

}

/**
 * Get supported modes.
 *
 * @param mode
 * @returns {*|promise}
 */
AirPurifier.prototype.getModes = function () {

    let deferred = q.defer();

    let self = this;

    q.delay(100).then(function () {

        try {

            miio.device({address: self.ip, token: self.token})
                .then(function (device) {

                    self.setCurrentDevice(device);

                    self.disconnect();

                    deferred.resolve(device.modes);

                }, function (error) {

                    throw new Error('Unable to set device mode. Error: ' + error.message);

                })
                .catch(function (err) {

                    self.disconnect();

                    deferred.reject(err);

                });

        } catch (err) {

            deferred.reject(err);

        }

    });

    return deferred.promise;

}

/**
 * Set current device.
 *
 * @param device
 */
AirPurifier.prototype.setCurrentDevice = function (device) {

    this.currentDevice = device;

}

/**
 * Prepare device info.
 *
 * @param device
 * @returns {{}}
 */
AirPurifier.prototype.prepareInfo = function (device) {

    let data = {}

    data.buzzer = device.buzzer;
    data.led = device.led;
    data.led_brightness = device.ledBrightness;
    data.favorite_level = device.favoriteLevel;

    return data;

}

module.exports = AirPurifier;