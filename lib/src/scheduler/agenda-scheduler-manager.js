"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendaSchedulerManager = void 0;
const tslib_1 = require("tslib");
const agenda_1 = require("@hokify/agenda");
const schedulers = [];
exports.agendaSchedulerManager = {
    create: (options) => {
        const scheduler = new agenda_1.Agenda(options);
        schedulers.push(scheduler);
        return scheduler;
    },
    closeAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        for (const scheduler of schedulers) {
            yield scheduler.stop();
        }
    }),
};
//# sourceMappingURL=agenda-scheduler-manager.js.map