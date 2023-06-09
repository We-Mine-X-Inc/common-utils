import { Agenda } from "@hokify/agenda";

const schedulers: Agenda[] = [];

export const agendaSchedulerManager = {
  create: (options: Object): Agenda => {
    const scheduler = new Agenda(options);
    schedulers.push(scheduler);
    return scheduler;
  },
  closeAll: async () => {
    for (const scheduler of schedulers) {
      await scheduler.stop();
    }
  },
};
