/**
 * Helper class.
 */
class Helper {

    /**
     * The constructor.
     */
    constructor() {

        this.packageJson = require('../package.json');

    }

    /**
     * Get package version.
     *
     * @returns {string}
     */
    getVersion() {

        return this.packageJson.version;

    }

}

module.exports = new Helper();