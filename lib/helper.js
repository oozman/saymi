const packageJson = require('../package.json');

function Helper() {
}

/**
 * Get current version.
 */
Helper.prototype.getVersion = function () {

    return packageJson.version;

}

module.exports = new Helper();