const debug = require("debug")("firebase");

require("./firebase-config");
const { hardwares } = require("./");

function setHardwareConfig(hardwareId) {
    debug("Creating new hardware config doc");
    return hardwares
        .doc(hardwareId)
        .set({
            isUsed: false,
        })
        .then(() => hardwares.doc(hardwareId).get())
        .then((snap) => snap.data());
}

function getHardwareConfig(hardwareId) {
    return hardwares
        .doc(hardwareId)
        .get()
        .then((snap) => snap.data());
}

module.exports = {
    setHardwareConfig,
    getHardwareConfig,
};
