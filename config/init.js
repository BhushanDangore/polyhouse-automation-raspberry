const debug = require("debug")("config");
const jsonfile = require("jsonfile");
const path = require("path");

const filePath = path.join(__dirname, "hardware-config.json");

const uniqueNumber = () => {
    return (new Date().getTime() / 1000000).toFixed();
};

function getConfig() {
    return jsonfile.readFile(filePath);
}

function generateConfig() {
    const jsonData = {
        hardwareId: uniqueNumber(),
    };
    return jsonfile.writeFile(filePath, jsonData);
}

let retryCount = 0;

function initConfiguration() {
    return getConfig()
        .then((config) => {
            return config;
        })
        .catch((err) => {
            debug(err.message);
            // If any error occures then keep restarting the app.
            if (retryCount <= 3)
                return generateConfig().then(initConfiguration);
            return err;
        });
}

module.exports = {
    initConfiguration,
};
