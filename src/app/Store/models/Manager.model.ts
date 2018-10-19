import { Machine } from './machine.model';
import { Part } from './Part.model';

export class Manager {
  machines: Map<string, Machine> = new Map();

  movePart(part: Part): void {
    part.step_finished = false;
    part.working_duration = 0;

    try {
      const p = part.pop();
      part.step_finished_duration = p.duration;
      this.machines.get(p.machine_name).addToQueue(part);
    } catch (error) {
      console.log('Part Finished');
    }
  }

  addMachine(machine: Machine): void {
    machine.manager = this;
    this.machines.set(machine.name, machine);
  }

  addPart(part: Part): void {
    this.movePart(part);
  }

  isDone(): boolean {
    for (const machine_name in this.machines.entries()) {
      if (this.machines.get(machine_name).queue.length > 0) {
        return false;
      }
    }
    return true;
  }

  process(): void {
    this.machines.forEach(machine => {
      machine.process();
      machine.printQueue();
    });
  }
}
