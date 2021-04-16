const drips = [
    {
        dripNumber: 1,
        startTime: "",
        status: false,
        waterLevel: 70,
    },
    {
        dripNumber: 2,
        startTime: "",
        status: false,
        waterLevel: 70,
    },
    {
        dripNumber: 3,
        startTime: "",
        status: false,
        waterLevel: 70,
    },
    {
        dripNumber: 4,
        startTime: "",
        status: false,
        waterLevel: 70,
    },
];

const getDripStatus = () => {
    return drips;
};

const changeDripStatus = (dripNumber, newStatus) => {
    const idx = drips.findIndex((drp) => dripNumber == "_" + drp.dripNumber);

    drips[idx].status = newStatus;
    drips[idx].startTime = newStatus ? new Date().toISOString() : "";
};

const getCurrentDripStatus = () => {
    return getDripStatus().reduce(
        (acc, drip) => ({ ...acc, ["_" + drip.dripNumber]: drip.status }),
        {}
    );
};

module.exports = { getDripStatus, changeDripStatus, getCurrentDripStatus };
