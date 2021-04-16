const { database } = require("../firebase");
const {
    changeDripStatus,
    getCurrentDripStatus,
} = require("../controllers/drip");

const rootListner = () => {
    const userId = hardwareConfig.userId;
    database.ref(`users/${userId}/updatedHumidity`).on("value", (_snap) => {
        const snap = _snap?.val();
    });

    database.ref(`users/${userId}/updatedTemprature`).on("value", (_snap) => {
        const snap = _snap?.val();
    });

    database.ref(`users/${userId}/requestedDripStatus`).on("value", (_snap) => {
        const snap = _snap?.val() || {};
        const currStatus = getCurrentDripStatus();
        for (const key in snap) {
            if (snap[key] != currStatus[key]) {
                changeDripStatus(key, snap[key]);
            }
        }
    });
};

module.exports = { rootListner };
