require("dotenv").config();
const debug = require("debug")("app");

const { initConfiguration } = require("./config/init");
const { setHardwareConfig, getHardwareConfig } = require("./firebase/init");
const { updateBasicParameters } = require("./schedulers");
const { rootListner } = require("./listners");

async function boot() {
    const { hardwareId } = await initConfiguration();
    if (!hardwareId) {
        debug("Cannot boot app, Hardware ID not found");
        process.exit(1);
    }

    let hardwareConfig = await getHardwareConfig(hardwareId);
    if (!hardwareConfig) {
        hardwareConfig = await setHardwareConfig(hardwareId);
        if (!hardwareConfig) {
            debug("Cannot store hardware config");
            return process.exit(1);
        }
    }
    if (!hardwareConfig.isUsed) {
        debug("Connect using mobile app and then restart the system");
        return process.exit(1);
    }
    if (!hardwareConfig.userId) {
        debug("Malformed hardwareConfig object");
        return process.exit(1);
    }

    global.hardwareConfig = hardwareConfig;
    const DB_UPDATE_INTERVAL = process.env.DB_UPDATE_INTERVAL || 15000;

    rootListner();
    updateBasicParameters();
    setInterval(updateBasicParameters, DB_UPDATE_INTERVAL);

    debug("Boot end");
    return;
}

boot();
