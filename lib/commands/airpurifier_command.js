const AirPurifier = require('../airpurifier');
const Response = require('../response');

/**
 * Process Air Purifier command.
 *
 * @constructor
 */
function AirPurifierCommand(program, options) {

    this.program = program;
    this.options = options;
    this.airpurifier = new AirPurifier(this.program.ip, this.program.token);
    this.response = new Response();

    if (this.options.get_data) {

        this.getData();

    } else if (this.options.set_power) {

        this.setPower();

    } else if (this.options.get_modes) {

        this.getModes();

    } else if (this.options.set_mode) {

        this.setMode();

    }
}

/**
 * Get device data.
 *
 * @param deviceInstance
 */
AirPurifierCommand.prototype.getData = function () {

    let self = this;

    self.airpurifier.getData().then(function (data) {

        console.log(self.response.success('OK', data));

    }, function (error) {

        console.log(self.response.error(error.message));

    });

}

/**
 * Set device power.
 */
AirPurifierCommand.prototype.setPower = function () {

    let self = this;

    self.airpurifier.setPower(self.options.set_power).then(function (data) {

        console.log(self.response.success('OK', data));

    }, function (error) {

        console.log(self.response.error(error.message));

    });

}

/**
 * Set device mode.
 */
AirPurifierCommand.prototype.setMode = function () {

    let self = this;

    self.airpurifier.setMode(self.options.set_mode).then(function (data) {

        console.log(self.response.success('OK', data));

    }, function (error) {

        console.log(self.response.error(error.message));

    });

}

/**
 * Get list of supported modes.
 */
AirPurifierCommand.prototype.getModes = function () {

    let self = this;

    self.airpurifier.getModes().then(function (data) {

        console.log(self.response.success('OK', data));

    }, function (error) {

        console.log(self.response.error(error.message));

    });

}

module.exports = AirPurifierCommand;

