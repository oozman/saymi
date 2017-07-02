const program = require('commander');
const colors = require('colors');
const AirPurifierCommand = require('./lib/commands/airpurifier_command');
const DiscoverCommand = require('./lib/commands/discover_command');

/**
 * Set global command settings.
 */
program
    .version('1.0.0')
    .option('--ip <IP>', 'Set device ip address.')
    .option('--token <TOKEN>', 'Set device token.');

/**
 * Device Discovery.
 */
program
    .command('discover')
    .description(colors.yellow('Start device discovery within your network.'))
    .action(function () {

        return new DiscoverCommand();

    });

/**
 * Air Purifier.
 */
program
    .command('airpurifier')
    .description(colors.yellow('This command allows you to control your Mi Air Purifier.'))
    .option('--get_data', 'Get device data, like: ' + 'device info'.bold + ', ' + 'sensor data'.bold + ', ' + 'etc'.bold + '.')
    .option('--set_power <status>', 'Set device power status: ' + 'on'.bold + ' or ' + 'off'.bold)
    .option('--get_modes', 'Get list of supported modes.')
    .option('--set_mode <status>', 'Set device mode. See ' + '--data'.bold + ' to know list of supported modes.')
    .action(function (options) {

        return new AirPurifierCommand(program, options);

    });


program.parse(process.argv);