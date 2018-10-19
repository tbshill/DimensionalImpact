import { Manager } from './Manager.model';
import { Part } from './Part.model';

export class Machine {
  installationDate?: Date;
  running?: Boolean;
  description?: String;
  // quantity: Number;
  id?: string;
  path?: string;
  manager?: Manager;
  queue?: Part[] = [];

  constructor(private threads: number, public name: string) {}

  addToQueue(part: Part): void {
    this.queue.push(part);
  }

  process(): any {
    const pop_queue = [];
    let applyOn;
    if (this.threads < this.queue.length) {
      applyOn = this.threads;
    } else {
      applyOn = this.queue.length;
    }

    for (let i = 0; i < applyOn; i++) {
      this.queue[i].incrementWork();
      if (this.queue[i].step_finished) {
        this.manager.movePart(this.queue[i]);
        pop_queue.push(i);
      }
    }

    pop_queue.forEach(partIndex => {
      this.queue.splice(partIndex, 1);
    });
  }
  printQueue(): void {
    console.log(`${this.name} Queue Size: ${this.queue.length}`);
  }
}
