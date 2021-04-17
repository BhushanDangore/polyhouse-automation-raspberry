class Drip {
    static #drips = {};

    constructor() {
        const newIndex = Object.keys(Drip.#drips).length + 1;
        Drip.#drips["_" + newIndex] = {
            dripNumber: newIndex,
            startTime: "",
            status: false,
            waterLevel: 60,
        };
        this.dripNumber = newIndex;
        this.key = ["_" + newIndex];
    }

    static getDrips() {
        return Drip.#drips;
    }

    static getDripStatus() {
        const status = {};
        for (const key in Drip.#drips) {
            status[key] = Drip.#drips[key].status;
        }
        return status;
    }

    getStatus() {
        return Drip.#drips["_" + this.dripNumber].status;
    }

    changeDripStatus(newStatus, _key) {
        const key = _key || "_" + this.dripNumber;

        Drip.#drips[key].status = newStatus;
        Drip.#drips[key].startTime = newStatus ? new Date().toISOString() : "";
    }
}

module.exports = Drip;
