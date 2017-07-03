/**
 * Air Purifier Command class.
 */
class AirPurifierCommand {

    /**
     * The constructor.
     *
     * @param program
     * @param options
     */
    constructor(program, options) {

        this.program = program;
        this.options = options;

        let Response = require('../response');
        this.response = new Response();

        let AirPurifier = require('../airpurifier');
        this.airpurifier = new AirPurifier(this.program.ip, this.program.token);

        this.run();

    }

    /**
     * Run command based on given options.
     */
    run() {

        if (this.options.get_data) this.getData()

        else if (this.options.set_power) this.setPower();

        else if (this.options.get_modes) this.getModes();

        else if (this.options.set_mode) this.setMode();


    }

    /**
     * Get device data.
     */
    getData() {

        this.airpurifier.getData().then(data => {

            console.log(this.response.success('OK', data));

        }, error => {

            console.log(this.response.error(error.message));

        });

    }

    /**
     * Set device power.
     */
    setPower() {

        this.airpurifier.setPower(this.options.set_power).then(data => {

            console.log(this.response.success('OK', data));

        }, error => {

            console.log(this.response.error(error.message));

        });

    }

    /**
     * Get device modes.
     */
    getModes() {

        this.airpurifier.getModes().then(data => {

            console.log(this.response.success('OK', data));

        }, error => {

            console.log(this.response.error(error.message));

        });

    }

    /**
     * Set device mode.
     */
    setMode() {

        this.airpurifier.setMode(this.options.set_mode).then(data => {

            console.log(this.response.success('OK', data));

        }, error => {

            console.log(this.response.error(error.message));

        });

    }
}

module.exports = AirPurifierCommand;