const debug = require("debug")("schedule");
const { getTemperature } = require("../controllers/temprature");
const { getHumidiy } = require("../controllers/humidity");
const { getDripStatus } = require("../controllers/drip");
const { database } = require("../firebase");

module.exports = {
    updateBasicParameters: () => {
        const temperature = getTemperature();
        const humidity = getHumidiy();
        const drip = getDripStatus();

        database
            .ref(`users/${hardwareConfig.userId}/`)
            .update({
                temperature,
                humidity,
                drip,
            })
            .catch((err) => {
                debug("Unable to update temprature and humidity", err);
            });
    },
};
