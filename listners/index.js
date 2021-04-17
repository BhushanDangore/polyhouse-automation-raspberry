const { database } = require("../firebase");
const Drip = require("../controllers/drip");

const rootListner = () => {
    const { userId } = locals;
    database.ref(`users/${userId}/updatedHumidity`).on("value", (_snap) => {
        const snap = _snap?.val();
    });

    database.ref(`users/${userId}/updatedTemprature`).on("value", (_snap) => {
        const snap = _snap?.val();
    });

    database.ref(`users/${userId}/requestedDripStatus`).on("value", (_snap) => {
        const snap = _snap?.val() || {};
        const currStatus = Drip.getDripStatus();
        for (const key in snap) {
            if (snap[key] != currStatus[key]) {
                global.locals.dripInstances[key].changeDripStatus(snap[key]);
            }
        }
    });
};

module.exports = { rootListner };
