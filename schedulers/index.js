const debug = require("debug")("schedule");
const { getTemperature } = require("../controllers/temprature");
const { getHumidiy } = require("../controllers/humidity");
const { getDrips } = require("../controllers/drip");
const { database } = require("../firebase");

const previousValues = {};

module.exports = {
    updateBasicParameters: () => {
        const { userId } = locals;
        const temperature = getTemperature();
        const humidity = getHumidiy();
        const drip = getDrips();

        const updatedValues = {};

        if (previousValues.temperature !== temperature) {
            updatedValues.temperature = temperature;
        }
        if (previousValues.humidity !== humidity) {
            updatedValues.humidity = humidity;
        }
        updatedValues.drip = drip;

        database
            .ref(`users/${userId}/`)
            .update(updatedValues)
            .catch((err) => {
                debug("Unable to update temprature and humidity", err);
            });
    },
};
