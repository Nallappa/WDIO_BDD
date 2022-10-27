var path = require('path');
var fs = require('fs-extra');
var log4js = require('log4js');
const settings = require('../settingsConfig.json')


function makeLogger(path) {
    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file(path), 'logs');
    return log4js.getLogger('logs');
}

var logger = makeLogger(settings.LogPath + '.log');

var utils = function () {

    function print(msg) {
        logger.info(msg)
    }

    function printError(msg, e) {
        logger.info(msg)
    }

    return {
        print: print,
        printError: printError
    }
};
module.exports = utils();